# [Win95 Forever](https://win95-forever.fcsc.fr/) [INTRO] [WEB]

> Welcome in the nineties!

## Finding the flag

Let's connect to the website using `curl`.

```terminal
$ curl https://win95-forever.fcsc.fr/
<!DOCTYPE html>
<html lang="en" dir="ltr">
...
</html>
<!-- FCSC{d31df42c489570dae488fa071326510903ef452dcde00a2dd22447c7d15ae104} -->
```

At the end of the HTML file, we find a comment that contains the flag.
