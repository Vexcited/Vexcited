import { batch, Component, onMount, ParentComponent } from "solid-js";

import { Show, createSignal, Suspense } from "solid-js";
import interact from "interactjs";

import { setOpenedWindows, openedWindows, setCurrentActiveWindow, currentActiveWindow } from "@/stores/desktop";
import { screen } from "@/stores/remote";

import { HiSolidMinus } from "solid-icons/hi";
import { IoClose } from "solid-icons/io";
import { Dynamic } from "solid-js/web";

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
  let windowRef: HTMLDivElement | undefined;

  const [preventWindowPosition, setPreventWindowPosition] = createSignal(false);
  const updateWindowPosition = (position: { x: number, y: number }) => {
    if (preventWindowPosition()) return;

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

  onMount(() => {
    interact(windowRef).resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      margin: 12, // Drag border allowed to drag.

      listeners: {
        move: (event) => {
          setOpenedWindows(props.index, "position", prev => ({
            x: prev.x + event.deltaRect.left,
            y: prev.y + event.deltaRect.top,
            height: event.rect.height,
            width: event.rect.width
          }));
        }
      },

      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: "parent"
        }),
        interact.modifiers.restrictSize({
          min: { width: 300, height: 150 }
        })
      ]
    })
      .on("resizestart", () => setPreventWindowPosition(true))
      .on("resizeend", () => setPreventWindowPosition(false));
  });

  return (
    <div
      ref={windowRef}
      class="fixed flex flex-col"
      classList={{
        "bottom-14 top-0 left-0 right-0": screen.width < 768 || current_window().isMaximized,
        "md:(shadow-xl shadow-grey-dark rounded-xl)": !current_window().isMaximized,
        "hidden": current_window().isMinimized,
        "z-40": currentActiveWindow() === props.index
      }}
      style={screen.width >= 768 && !current_window().isMaximized ? {
        width: current_window().position.width + "px",
        height: current_window().position.height + "px",
        top: current_window().position.y + "px",
        left: current_window().position.x + "px"
      } : undefined}
      onMouseDown={() => setCurrentActiveWindow(props.index)}
    >
      <div
        onMouseDown={windowHolderMouseDown}
        class="hidden relative md:flex px-4.5 h-11 select-none bg-grey-dark w-full"
        classList={{
          "md:(rounded-t-xl border border-b-0 border-grey-light)": !current_window().isMaximized
        }}
      >
        <div
          onMouseEnter={() => setControlButtonsHovered(true)}
          onMouseLeave={() => setControlButtonsHovered(false)}
          class="flex items-center gap-2"
        >
          {/** Close button. */}
          <WindowControlButton
            color="#FC685D"
            action={() => batch(() => {
              setOpenedWindows(prev => prev.filter((_, index) => index !== props.index));
              setCurrentActiveWindow(null);
            })}
            showChildren={controlButtonsHovered()}
          >
            <IoClose color="#981810" size="100%" />
          </WindowControlButton>

          {/** Minimize button. */}
          <WindowControlButton
            color="#FDBF45"
            action={() => batch(() => {
              setOpenedWindows(props.index, { isMinimized: true });
              setCurrentActiveWindow(null);
            })}
            showChildren={controlButtonsHovered()}
          >
            <HiSolidMinus color="#9D5F1A" size="95%" />
          </WindowControlButton>

          {/** Maximize button. */}
          <WindowControlButton
            color="#3EC54C"
            action={() => setOpenedWindows(props.index, "isMaximized", prev => !prev)}
            showChildren={controlButtonsHovered()}
          >
            {current_window().isMaximized
              ? <MacOSMinimize color="#10610F" />
              : <MacOSMaximize color="#10610F" />
            }
          </WindowControlButton>
        </div>

        <span class="pointer-events-none absolute right-0 left-0 h-full flex justify-center items-center">{current_window().app.name}</span>
      </div>

      <div class="h-full bg-grey w-full overflow-y-auto"
        classList={{
          "md:(border border-t-0 border-grey-light rounded-b-xl)": !current_window().isMaximized
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Dynamic component={current_window().app.component} />
        </Suspense>
      </div>
    </div>
  ); 
};

export default Window;
