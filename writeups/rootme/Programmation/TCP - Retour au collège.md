# TCP : Retour au collège

> Pour commencer cette épreuve utilisant le protocole TCP, vous devez vous connecter à un programme sur une socket réseau.
>
> - Vous devez calculer la racine carrée du nombre n°1 et multiplier le résultat obtenu par le nombre n°2.
> - Vous devez ensuite arrondir à deux chiffres après la virgule le résultat obtenu.
> - Vous avez 2 secondes pour envoyer la bonne réponse à partir du moment où le programme vous envoie le calcul.

```typescript
import { remote } from "pwntools";

const socket = await remote("challenge01.root-me.org", 52002);

const str = (b: Uint8Array): string => new TextDecoder().decode(b);
const b = (s: string): Uint8Array => new TextEncoder().encode(s);

await socket.recvuntil(b("Calculate the square root of "));
const n1 = parseInt(str(await socket.recvuntil(b(" "))));
await socket.recvuntil(b("and multiply by "));
const n2 = parseInt(str(await socket.recvuntil(b(" "))));
await socket.recvn(2);

socket.write(b((Math.sqrt(n1) * n2).toFixed(2) + "\n"));
const out = str(await socket.recvall()).trim();
console.log(out);
```
