import type { Component } from "solid-js";
import type { OpenedWindow } from "@/stores/desktop";

import { createEffect, onCleanup } from "solid-js";

import { setOpenedWindows, openedWindows } from "@/stores/desktop";

const Window: Component<OpenedWindow & { index: number }> = (props) => {
  let window_holder_ref: HTMLDivElement | undefined;

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

  const windowHolderMouseDown = (e: MouseEvent) => {
    window.addEventListener("mousemove", windowHolderMouseMove);
    window.addEventListener("mouseup", windowHolderMouseUp);
  };

  createEffect(() => {
    if (!window_holder_ref) return;
    window_holder_ref.addEventListener("mousedown", windowHolderMouseDown);
    
    onCleanup(() => {
      if (!window_holder_ref) return;
      window_holder_ref.removeEventListener("mousedown", windowHolderMouseDown);
    });
  });

  return (
    <div
      class="fixed border border-white-dark rounded-md"
      style={{
        width: "250px",
        height: "120px",
        top: !(props.isMaximized) ? props.position.y + "px" : 0 + "px",
        left: !(props.isMaximized) ? props.position.x + "px" : 0 + "px"
      }}
    >
      <div ref={window_holder_ref} class="h-8 rounded-t bg-white-dark w-full">

      </div>

      <div class="h-full rounded-b bg-grey-light bg-opacity-20 backdrop-filter backdrop-blur w-full">

      </div>
      
    </div>
  );
};

export default Window;
