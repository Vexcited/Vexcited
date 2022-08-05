import type { Component } from "solid-js";

import { Index, For } from "solid-js";

import DesktopItem from "@/components/DesktopItem";
import Window from "@/components/Window";

import { desktopItems, openedWindows } from "@/stores/desktop";

import VexcitedLogo from "@/assets/logo.svg";

const Desktop: Component = () => {
  return (
    <div class="h-screen w-screen bg-grey">

      {/** Desktop Icons */}
      <div class="flex p-6">
        <For each={desktopItems}>
          {item => (
            <DesktopItem {...item} />
          )}
        </For>
      </div>

      {/** Desktop Windows */}
      <Index each={openedWindows}>
        {(_, window_index) => (
          <Window index={window_index} />
        )}
      </Index>

      {/** Taskbar */}
      <div class="flex p-3 fixed bottom-0 w-full h-16 bg-grey-light">
        <div class="h-full w-auto aspect-square">
          <img alt="vexcited's logo" src={VexcitedLogo} />
        </div>
      </div>

    </div>
  );
};

export default Desktop;

