import type { Component } from "solid-js";
import { Index, For } from "solid-js";

import { BiRegularLeftArrow } from "solid-icons/bi";
import { TbSquare } from "solid-icons/tb";

import DesktopItem from "@/components/DesktopItem";
import Window from "@/components/Window";

import { desktopItems, openedWindows, setOpenedWindows } from "@/stores/desktop";

import VexcitedLogo from "@/assets/logo.svg";

const Desktop: Component = () => {
  return (
    <div class="h-screen w-screen bg-grey">

      {/** Desktop Icons */}
      <div class="flex flex-wrap p-6 gap-4">
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
      <div class="flex p-3 fixed bottom-0 justify-center items-center gap-14 w-full h-14 bg-grey-light">
        <div class="md:hidden">
          <TbSquare size={28} />
        </div>
        <div
          onClick={() => {
            // If any window is currently active, make them inactive.
            setOpenedWindows(window => window.active, "active", false);
          }}  
        >
          <img height={32} width={32} alt="vexcited's logo" src={VexcitedLogo} />
        </div>
        <div
          class="md:hidden"
          onClick={() => {
            // If any window is currently active, close it.
            setOpenedWindows(prev => prev.filter(window => !window.active));
          }}
        >
          <BiRegularLeftArrow size={26} />
        </div>
      </div>

    </div>
  );
};

export default Desktop;

