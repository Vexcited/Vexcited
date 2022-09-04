import type { Component, ParentComponent } from "solid-js";

import { Show, createSignal, Suspense } from "solid-js";

import { setOpenedWindows, openedWindows } from "@/stores/desktop";
import { keyboard } from "@/stores/keyboard";

import { IoClose } from "solid-icons/io";
import { HiSolidPlus, HiSolidMinus } from "solid-icons/hi";

const MacOSMaximize: Component<{ color: string }> = (props) => (
  <svg color={props.color} viewBox="0 0 26 26" fill="none" height="50%" width="50%" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 26L26 26L26 7L8 26Z" fill="currentColor"/>
    <path d="M18 -7.86805e-07L5.24537e-07 -1.90735e-06L-3.0598e-07 19L18 -7.86805e-07Z" fill="currentColor"/>
  </svg>
);

const MacOSMinimize: Component<{ color: string }> = (props) => (
  <svg color={props.color} viewBox="0 0 36 38" fill="none" height="75%" width="75%" xmlns="http://www.w3.org/2000/svg">
    <path d="M36 19L18 19V38L36 19Z" fill="currentColor"/>
    <path d="M0 19L18 19V0L0 19Z" fill="currentColor"/>
  </svg>
);

const WindowControlButton: ParentComponent<{ color: string, action: () => unknown, showChildren: boolean }> = (props) => {
  return (
    <button
      onClick={() => props.action()}
      class="cursor-default flex justify-center items-center h-3 w-3 rounded-full"
      style={{ "background-color": props.color }}
    >
      <Show when={props.showChildren}>
        {props.children}
      </Show>
    </button>
  );
};

const Window: Component<{ index: number }> = (props) => {
  const [controlButtonsHovered, setControlButtonsHovered] = createSignal(false);
  const current_window = () => openedWindows[props.index];

  const onWindowClose = () => {
    setOpenedWindows(openedWindows.filter((_, index) => index !== props.index));
  };

  const updateWindowPosition = (position: { x: number, y: number }) => {
    setOpenedWindows(props.index, "position", prev => ({
      x: prev.x + position.x,
      y: prev.y + position.y
    }));
  };
  
  const windowHolderMouseMove = (e: MouseEvent) => {
    updateWindowPosition({ x: e.movementX, y: e.movementY });
  };

  const windowHolderMouseUp = () => {
    window.removeEventListener("mousemove", windowHolderMouseMove);
    window.removeEventListener("mouseup", windowHolderMouseUp);
  };

  const windowHolderMouseDown = () => {
    window.addEventListener("mousemove", windowHolderMouseMove);
    window.addEventListener("mouseup", windowHolderMouseUp);
  };

  return <Show when={current_window()}>
    {(window) => (
      <div
        class="fixed shadow-xl shadow-grey-dark rounded-xl flex flex-col"
        style={{
          width: "250px",
          height: "300px",
          top: !(window.isMaximized) ? window.position.y + "px" : 0 + "px",
          left: !(window.isMaximized) ? window.position.x + "px" : 0 + "px"
        }}
      >
        <div
          onMouseDown={windowHolderMouseDown}
          class="px-4.5 h-11 rounded-t-xl select-none bg-grey-dark w-full flex border border-b-0 border-grey-light"
        >
          <div
            onMouseEnter={() => setControlButtonsHovered(true)}
            onMouseLeave={() => setControlButtonsHovered(false)}
            class="flex items-center gap-2"
          >
            <WindowControlButton
              action={onWindowClose}
              color="#FC685D"
              showChildren={controlButtonsHovered()}
            >
              <IoClose color="#981810" size="100%" />
            </WindowControlButton>

            <WindowControlButton
              action={() => setOpenedWindows(props.index, "isMinimized", true)}
              color="#FDBF45"
              showChildren={controlButtonsHovered()}
            >
              <HiSolidMinus color="#9D5F1A" size="95%" />
            </WindowControlButton>

            <WindowControlButton
              action={() => setOpenedWindows(props.index, "isMinimized", !window.isMaximized)}
              color="#3EC54C"
              showChildren={controlButtonsHovered()}
            >
              <Show
                when={window.isMaximized}
                fallback={
                  <MacOSMaximize color="#10610F" />
                }
              >
                <Show
                  when={!keyboard.alt}
                  fallback={
                    <HiSolidPlus color="#10610F" size="100%" />
                  }
                >
                  <MacOSMinimize color="#10610F" />
                </Show>
              </Show>
            </WindowControlButton>
          </div>

        </div>

        <div class="h-full border border-t-0 border-grey-light rounded-b-xl bg-grey-light bg-opacity-20 backdrop-filter backdrop-blur w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <window.component />
          </Suspense>
        </div>
      </div>
    )}
  </Show>; 
};

export default Window;
