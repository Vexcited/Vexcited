import type { Component } from "solid-js";
import { For, Show } from "solid-js";

const PROJECTS: {
  name: string;
  type: "app" | "library";
  description: string;
  github_repo: string;
  website_url?: string;
  demo_url?: string;
}[] = [
  {
    name: "lpadder.",
    type: "app",
    description: "Offline application that allows you to play Launchpad covers from anywhere, directly from your web browser.",
    github_repo: "Vexcited/lpadder",
    website_url: "https://www.lpadder.ml/"
  },
  {
    name: "Pornote",
    type: "app",
    description: "Unofficial web client for Pronote by Index-Education with improved features.",
    github_repo: "Vexcited/pornote",
    website_url: "https://www.pornote.ml/"
  },
  {
    name: "Vexcited",
    type: "app",
    description: "The website you're currently browsing.",
    github_repo: "Vexcited/Vexcited",
    website_url: "https://www.vexcited.com/"
  },
  {
    name: "solid-hcaptcha",
    type: "library",
    description: "hCaptcha Component Library for Solid.",
    github_repo: "Vexcited/solid-hcaptcha",
    demo_url: "https://vexcited.github.io/solid-hcaptcha"
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
  },
  {
    name: "express-multidomain-static",
    type: "app",
    description: "Host static content for multiple domains in a specific folder.",
    github_repo: "Vexcited/express-multidomain-static"
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
              </div>

            </div>
          )}
        </For>
      </section>
    </div>
  );
};

export default PortfolioWindow;
