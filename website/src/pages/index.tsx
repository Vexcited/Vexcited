import ImageHero from "@/components/ImageHero";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createEffect, onCleanup, For, createResource, Show } from "solid-js";
import {
  FaBrandsGithub,
  FaSolidLink,
  FaBrandsLinkedin,
  FaBrandsTwitter,
  FaBrandsYoutube,
  FaBrandsTwitch,
  FaBrandsInstagram,
  FaSolidStar,
} from "solid-icons/fa";
import { BiRegularCodeAlt } from "solid-icons/bi";

gsap.registerPlugin(ScrollTrigger);

type GithubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
};

type GithubEvent = {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: any;
  created_at: string;
};

const cache = <T,>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const { update, data } = JSON.parse(item);
  if (update < Date.now()) return null;

  return data;
};

const fetchRepos = async (): Promise<Array<GithubRepo>> => {
  let userRepos = cache<GithubRepo[]>("cache__repos");

  if (!userRepos) {
    const username = "Vexcited";
    userRepos = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`
    ).then((res) => res.json());

    localStorage.setItem(
      "cache__repos",
      JSON.stringify({
        update: Date.now() + 8 * 60 * 1000,
        data: userRepos,
      })
    );
  }

  return (userRepos as GithubRepo[])
    .filter((repo) => !repo.fork && repo.description && repo.topics.length > 0)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
};

const fetchActivity = async () => {
  let activity = cache<GithubEvent[]>("cache__activity");

  if (!activity) {
    const response = await fetch(
      "https://api.github.com/users/Vexcited/events?per_page=20"
    );
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    activity = data as GithubEvent[];

    localStorage.setItem(
      "cache__activity",
      JSON.stringify({
        update: Date.now() + 8 * 60 * 1000,
        data: activity,
      })
    );
  }

  return activity.filter((event) => event.type !== "WatchEvent");
};

export default function View() {
  const [repos] = createResource(fetchRepos);
  const [activity] = createResource(fetchActivity);

  createEffect(() => {
    const animation = gsap.to("#ImageHeroImg", {
      scale: 1.1,
      opacity: 0.15,
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    onCleanup(() => {
      animation.kill();
    });
  });

  const SOCIAL_LINKS = [
    {
      icon: FaBrandsGithub,
      url: "https://github.com/Vexcited",
      label: "GitHub",
    },
    {
      icon: FaBrandsLinkedin,
      url: "https://linkedin.com/in/vexcited",
      label: "LinkedIn",
    },
    {
      icon: FaBrandsTwitter,
      url: "https://x.com/vexcitedoff",
      label: "X / Twitter",
    },
    {
      icon: FaBrandsYoutube,
      url: "https://youtube.com/@Vexcited",
      label: "YouTube",
    },
    {
      icon: FaBrandsTwitch,
      url: "https://twitch.tv/vexcited",
      label: "Twitch",
    },
    {
      icon: FaBrandsInstagram,
      url: "https://instagram.com/vexcitedoff",
      label: "Instagram",
    },
  ];

  return (
    <div class="relative bg-grey-dark min-h-screen font-sans selection:bg-white/30">
      <ImageHero />

      <div
        class="fixed inset-0 pointer-events-none z-50 opacity-1"
        style={{
          "background-image": `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div class="absolute inset-0 h-screen w-full flex flex-col justify-end p-4 z-40 pointer-events-none">
        <div
          id="IntroSection"
          class="pointer-events-auto relative backdrop-blur-xl rounded-3xl border border-white/10 p-8 bg-white/5 flex flex-col md:flex-row gap-12 md:items-center justify-between"
        >
          <p class="text-xl md:text-2xl text-white font-medium">
            Full Stack Developer. <br />
            <span class="text-white/80 font-light">
              Building tools for the modern web.
            </span>
          </p>

          <div class="flex gap-4 flex-wrap justify-between md:justify-end">
            <For each={SOCIAL_LINKS}>
              {(link) => (
                <a
                  href={link.url}
                  target="_blank"
                  class="p-3 bg-white/20 hover:bg-white/20 border border-white/10 rounded-xl text-white/75 transition-all hover:text-white hover:scale-105 hover:rotate-2 hover:bg-white/40 hover:border-white/50"
                  aria-label={link.label}
                >
                  <link.icon size={24} />
                </a>
              )}
            </For>
          </div>
        </div>
      </div>

      <div class="relative p-4 z-10">
        <div class="">
          <Show
            when={repos()}
            fallback={
              <div class="text-white/50 text-center py-20 animate-pulse">
                Loading repositories...
              </div>
            }
          >
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <For each={repos()}>
                {(repo) => (
                  <div class="group relative bg-black/40 backdrop-blur-xl hover:bg-black/30 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex gap-2 flex-wrap">
                        <For each={repo.topics.slice(0, 3)}>
                          {(topic) => (
                            <span class="text-[10px] uppercase tracking-wider text-white/80 bg-white/10 px-2 py-1 rounded">
                              {topic}
                            </span>
                          )}
                        </For>
                      </div>
                      <div class="flex gap-2 text-white/40">
                        <div class="flex items-center gap-2 text-xs">
                          <FaSolidStar size={16} /> {repo.stargazers_count}
                        </div>
                      </div>
                    </div>

                    <h3 class="text-xl font-medium text-white mb-2 group-hover:text-white transition-colors">
                      {repo.name}
                    </h3>

                    <p class="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                      {repo.description}
                    </p>

                    <div class="flex gap-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        class="flex-1 text-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <FaBrandsGithub /> Code
                      </a>
                      <Show when={repo.homepage}>
                        <a
                          href={repo.homepage}
                          target="_blank"
                          class="flex-1 text-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <FaSolidLink /> Demo
                        </a>
                      </Show>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}
