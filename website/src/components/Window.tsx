import type { Component, ParentComponent } from "solid-js";
import type { OpenedWindow } from "@/stores/desktop";

import { Show, createSignal } from "solid-js";

import { setOpenedWindows, openedWindows } from "@/stores/desktop";

import { IoClose, } from "solid-icons/io";
import { HiSolidPlus, HiSolidMinus } from "solid-icons/hi";

const [controlButtonsHovered, setControlButtonsHovered] = createSignal(false);
const WindowControlButton: ParentComponent<{ color: string }> = (props) => {
  return (
    <button class="cursor-default flex justify-center items-center h-3 w-3 rounded-full" style={`background-color: ${props.color}`}>
      <Show when={controlButtonsHovered()}>
        {props.children}
      </Show>
    </button>
  );
};

const Window: Component<OpenedWindow & { index: number }> = (props) => {
  const updateWindowPosition = (position: { x: number, y: number }) => {
    const previous_window = openedWindows[props.index];
    const windows = [...openedWindows];
    windows[props.index] = {
      ...previous_window,
      position: {
        x: previous_window.position.x + position.x,
        y: previous_window.position.y + position.y
      }
    };

    setOpenedWindows([...windows]);
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

  return (
    <div
      class="fixed border border-grey-light shadow-xl shadow-grey-dark rounded-md flex flex-col"
      style={{
        width: "250px",
        height: "120px",
        top: !(props.isMaximized) ? props.position.y + "px" : 0 + "px",
        left: !(props.isMaximized) ? props.position.x + "px" : 0 + "px"
      }}
    >
      <div
        onMouseDown={windowHolderMouseDown}
        class="px-2.5 h-10 rounded-t bg-grey-dark w-full flex"
      >
        <div
          onMouseEnter={() => setControlButtonsHovered(true)}
          onMouseLeave={() => setControlButtonsHovered(false)}
          class="flex items-center gap-1.5"
        >
          <WindowControlButton color="#FC685D">
            <IoClose color="#981810" size="100%" />
          </WindowControlButton>

          <WindowControlButton color="#FDBF45">
            <HiSolidMinus color="#9D5F1A" size="95%" />
          </WindowControlButton>

          <WindowControlButton color="#3EC54C">
            <HiSolidPlus color="#10610F" size="100%" />
          </WindowControlButton>
        </div>

      </div>

      <div class="h-full rounded-b bg-grey-light bg-opacity-20 backdrop-filter backdrop-blur w-full">

      </div>
      
    </div>
  );
};

export default Window;
