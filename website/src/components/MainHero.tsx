import type { Component } from "solid-js";

const MainHero: Component = () => {
  return (
    <section
      class="
        flex justify-center flex-col
        h-screen gap-6 px-6 sm:px-24
        bg-separator-mainHero
        bg-no-repeat bg-bottom
      "
    >
      <div>
        <p class="font-mono">
          👋 Bienvenue, je m&apos;appelle
        </p>
        <h1 class="text-4xl font-bold">
          Mikkel RINGAUD
        </h1>
        <span class="text-sm text-opacity-80">
          et j&apos;adore le <strong>développement web</strong>.
        </span>
      </div>

      <p class="text-white text-opacity-60 sm:w-96">
        Je suis étudiant et développeur web full-stack.
        Développeur de l&apos;application web {" "}
        <a
          class="text-blue text-opacity-60 hover:text-opacity-100 focus:text-opacity-100 transition-colors"
          href="https://github.com/Vexcited/lpadder"
          target="_blank"
        >
          lpadder
        </a> et membre du duo {" "}
        <a
          class="text-blue text-opacity-60 hover:text-opacity-100 focus:text-opacity-100 transition-colors"
          href="https://github.com/MilesCodeIt"
          target="_blank"
        >
          MilesCode
        </a>.
      </p>

      <div>
        <a
          href="https://instagram.com/vexcitedoff"
          target="_blank"
          class="px-5 py-3 text-blue hover:bg-blue focus:bg-blue inline-block hover:bg-opacity-20 focus:bg-opacity-20 bg-transparent border-blue border-2 rounded transition-colors"
          rel="noreferrer"
        >
          Mes mini-cours Instagram
        </a>
      </div>
    </section>
  );
};

export default MainHero;
