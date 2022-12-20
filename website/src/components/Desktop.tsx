import type { Component } from "solid-js";
import { Index, For, Show, batch } from "solid-js";

import { BiRegularLeftArrow } from "solid-icons/bi";
import { TbSquare } from "solid-icons/tb";

import VexcitedLogo from "@/assets/logo.svg";

import DesktopItem from "@/components/DesktopItem";
import Window from "@/components/Window";

import { screen } from "@/stores/remote";

import {
  currentActiveWindow,
  desktopItems, openedWindows,
  
  setCurrentActiveWindow, setOpenedWindows
} from "@/stores/desktop";

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
      <div class="z-50 flex p-3 fixed bottom-0 justify-center md:justify-start items-center gap-14 md:gap-8 w-full h-14 bg-grey-light">
        <div class="md:hidden">
          <TbSquare size={28} />
        </div>
        <div
          onClick={() => {
            // Only on mobile view
            if (screen.width < 768) {
              batch(() => {
                // If any window is currently in foreground, put them in background.
                setOpenedWindows(window => !window.isMinimized, { isMinimized: true });
                setCurrentActiveWindow(null);
              });
            }
          }}  
        >
          <img height={32} width={32} alt="vexcited's logo" src={VexcitedLogo} />
        </div>
        <div
          class="md:hidden"
          onClick={() => {
            if (currentActiveWindow() !== null) {
              // Close current active window.
              setOpenedWindows(prev => prev.filter((_, index) => index !== currentActiveWindow()));
            } 
          }}
        >
          <BiRegularLeftArrow size={26} />
        </div>

        <Show when={screen.width >= 768}>
          <div class="flex gap-2">
            <For each={openedWindows}>
              {(window, index) => (
                <button
                  class="p-2 rounded-lg border bg-grey"
                  classList={{
                    "bg-opacity-100 border-blue": index() === currentActiveWindow(),
                    "bg-opacity-40 border-transparent": index() !== currentActiveWindow()
                  }}
                  onClick={() => batch(() => {
                    setCurrentActiveWindow(index());
                    setOpenedWindows(index(), { isMinimized: false });
                  })}
                >
                  <window.app.icon size={24} />
                </button>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Desktop;

