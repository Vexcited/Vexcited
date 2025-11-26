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
