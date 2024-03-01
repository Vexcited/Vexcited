import type { Component } from "solid-js";
import { For, Show } from "solid-js";

const PROJECTS: {
  name: string;
  type: "app" | "library" | "plugin";
  description: string;
  github_repo: string;
  website_url?: string;
  demo_url?: string;
  docs_url?: string;
}[] = [
  {
    name: "fortigate-web-sslvpn",
    type: "library",
    description: "Make requests through FortiGate SSL VPN using their web mode.",
    github_repo: "Vexcited/fortigate-web-sslvpn",
    website_url: "https://edt.vexcited.com/"
  },
  {
    name: "Signatures-IUT-Limoges",
    type: "app",
    description: "An app and a library to fetch the grades of students studying at the BUT Informatique of the IUT of Limoges.",
    github_repo: "Vexcited/Signatures-IUT-Limoges",
    website_url: "https://signatures.vexcited.com/"
  },
  {
    name: "EDT-IUT-Info-Limoges",
    type: "app",
    description: "An app and a library to fetch the timetable of students studying at the BUT Informatique of the IUT of Limoges.",
    github_repo: "Vexcited/EDT-IUT-Info-Limoges",
    website_url: "https://edt.vexcited.com/"
  },
  {
    name: "better-spotify-genres",
    type: "plugin",
    description: "See what genres you are listening to on Spotify. Made to be used with Spicetify.",
    github_repo: "Vexcited/better-spotify-genres"
  },
  {
    name: "SolidCord",
    type: "app",
    description: "A work in progress fast and open-source handcrafted web client for Discord that is made with performance in mind. Uses Tauri and SolidJS.",
    github_repo: "Vexcited/SolidCord"
  },
  {
    name: "frr",
    type: "app",
    description: "An interpreter for French pseudocode, made for fun.",
    github_repo: "Vexcited/frr"
  },
  {
    name: "libpcap-ffi",
    type: "library",
    description: "Node.js bindings for `wpcap.dll` using koffi.",
    github_repo: "Vexcited/libpcap"
  },
  {
    name: "Papillon",
    type: "app",
    description: "School app for French students. My role in this project is to implement the Pronote service using my Pawnote library.",
    github_repo: "PapillonApp/Renard",
    website_url: "https://getpapillon.xyz/"
  },
  {
    name: "lpadder.",
    type: "app",
    description: "Offline application that allows you to play Launchpad covers from anywhere, directly from your web browser.",
    github_repo: "Vexcited/lpadder",
    website_url: "https://lpadder.vercel.app/"
  },
  {
    name: "Pawnote",
    type: "library",
    description: "Unofficial wrapper for the internal API of Pronote (Index-Education).",
    github_repo: "LiterateInk/Pawnote",
    docs_url: "https://pawnote.js.org/"
  },
  {
    name: "Vexcited",
    type: "app",
    description: "The website you're currently browsing.",
    github_repo: "Vexcited/Vexcited",
    website_url: "https://www.vexcited.com/"
  },
  {
    name: "blblinary",
    type: "app",
    description: "Use `b` and `l` instead of `0` and `1` in binary.",
    github_repo: "Vexcited/blblinary",
    website_url: "https://vexcited.github.io/blblinary"
  },
  {
    name: "tcp-websocket",
    type: "library",
    description: "A TypeScript WebSocket client-only class made with TCP streams.",
    github_repo: "Vexcited/tcp-websocket"
  },
  {
    name: "solid-hcaptcha",
    type: "library",
    description: "hCaptcha Component Library for Solid.",
    github_repo: "Vexcited/solid-hcaptcha",
    demo_url: "https://vexcited.github.io/solid-hcaptcha"
  },
  {
    name: "solid-boring-avatars",
    type: "library",
    description: "Tiny SolidJS library that generates custom, SVG-based avatars from any username and color palette, port of boring-avatars for Solid.",
    github_repo: "Vexcited/solid-boring-avatars",
    demo_url: "https://vexcited.github.io/solid-boring-avatars"
  },
  {
    name: "Takuzu",
    type: "app",
    description: "French JS implementation of the puzzle game Takuzu, or Binairo, made for 'Les Trophées NSI' of 2023.",
    github_repo: "Vexcited/Takuzu",
    demo_url: "https://stackblitz.com/github/Vexcited/takuzu?embed=1&hideExplorer=1&theme=dark&view=preview&startScript=start&title=Takuzu"
  },
  {
    name: "Drive",
    type: "app",
    description: "Collaborated with 2 people to build a Google Drive alternative fully integrated with Supabase, made for the Supabase Launch Week 8 Hackathon.",
    github_repo: "catto-labs/drive",
    website_url: "https://drive.cattolabs.com/"
  },
  {
    name: "Pokaimon",
    type: "app",
    description: "Collaborated with 2 people to build a Genshin Impact themed collectible game with mechanics similar to Pokémon, made for the Supabase Launch Week 5 Hackathon.",
    github_repo: "catto-labs/pokaimon",
    website_url: "https://pokaimon.cattolabs.com/"
  },
  {
    name: "discord-alexa-skill",
    type: "app",
    description: "My submission for Summer 2021 Replit Hackathon where I built a Discord Alexa skill.",
    github_repo: "Vexcited/discord-alexa-skill"
  },
  {
    name: "@vexcited/dynamic-dns",
    type: "library",
    description: "NPM package with integrated CLI to dynamically update your DNS for Cloudflare, Namecheap, Netlify, Vercel, and more.",
    github_repo: "Vexcited/dynamic-dns"
  }
];

const PortfolioWindow: Component = () => {

  return (
    <div>
      <nav class="bg-grey-dark py-8 px-2 text-center">
        <h1 class="text-xl font-bold">Portfolio</h1>
        <p>Find all my projects !</p>
      </nav>

      <section class="p-4 overflow-auto flex flex-wrap justify-center gap-8">
        <For each={PROJECTS}>
          {(project) => (
            <div class="flex flex-col justify-between gap-8 p-4 group rounded-md bg-grey-dark bg-opacity-40 border border-grey-dark border-opacity-60 hover:border-blue hover:bg-opacity-60 transition-colors max-w-sm w-full">
              <div >
                <h3 class="text-lg">{project.name}</h3>
                <p class="text-sm opacity-60 group-hover:opacity-80 transition-opacity">{project.description}</p>
              </div>

              <div class="flex items-center gap-2">
                <a class="w-full text-center px-3 py-1 bg-blue-dark hover:opacity-80 transition-opacity rounded-md" href={`https://github.com/${project.github_repo}`} target="_blank">GitHub</a>
                <Show when={project.demo_url}>
                  <a class="w-full text-center px-3 py-1 bg-grey-light bg-opacity-60 hover:bg-opacity-100 transition-colors rounded-md" href={project.demo_url} target="_blank">Demo</a>
                </Show>
                <Show when={project.website_url}>
                  <a class="w-full text-center px-3 py-1 bg-grey-light bg-opacity-60 hover:bg-opacity-100 transition-colors rounded-md" href={project.website_url} target="_blank">Website</a>
                </Show>
                <Show when={project.docs_url}>
                  <a class="w-full text-center px-3 py-1 bg-grey-light bg-opacity-60 hover:bg-opacity-100 transition-colors rounded-md" href={project.docs_url} target="_blank">Documentation</a>
                </Show>
              </div>

            </div>
          )}
        </For>
      </section>
    </div>
  );
};

export default PortfolioWindow;
