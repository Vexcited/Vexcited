import type { Component } from "solid-js";

import { For } from "solid-js";

import DesktopItem from "@/components/DesktopItem";

import { desktopItems } from "@/stores/desktop";

import VexcitedLogo from "@/assets/logo.svg";

const Desktop: Component = () => {

  return (
    <div class="h-screen w-screen bg-grey">

      {/** Desktop Icons */}
      <div class="flex p-6">
        <For each={desktopItems}>
          {item => (
            <DesktopItem
              {...item}
            />
          )}
        </For>
      </div>
    
    
      {/** Taskbar */}
      <div class="flex p-3 fixed bottom-0 w-full h-16 bg-grey-light">

        <div class="h-full w-auto aspect-square">
          <img alt="Launcher logo" src={VexcitedLogo} />
        </div>

      </div>

    </div>
  );
};

export default Desktop;

