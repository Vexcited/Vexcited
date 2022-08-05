import type { IconTypes } from "solid-icons";
import type { Component } from "solid-js";

import { lazy } from "solid-js";
import { createStore } from "solid-js/store";
import { AiFillMessage } from "solid-icons/ai";

export interface DesktopItem {
  /** Identifier, like an executable name. */
  id: string;
  name: string;
  icon: IconTypes;
  start_action: () => unknown;
}

export interface OpenedWindow {
  desktopItemId: string;
  component: Component;
  
  isMaximized: boolean;
  isMinimized: boolean;
  
  position: {
    x: number,
    y: number
  };
}

export const createNewWindow = (desktopItemId: string, component: Component): OpenedWindow => ({
  desktopItemId,
  component,

  isMaximized: false,
  isMinimized: false,
  
  position: {
    x: 0,
    y: 0
  }
});

export const defaultDesktopItems: DesktopItem[] = [
  {
    id: "contact",
    name: "Contact",
    icon: AiFillMessage,
    start_action: () => {
      setOpenedWindows(
        draft => [...draft, createNewWindow("contact", lazy(() => import("@/windows/Contact")))]
      );
    }
  }
];

export const [desktopItems, setDesktopItems] = createStore<DesktopItem[]>(defaultDesktopItems);
export const [openedWindows, setOpenedWindows] = createStore<OpenedWindow[]>([]);
