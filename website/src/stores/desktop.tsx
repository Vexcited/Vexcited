import type { IconTypes } from "solid-icons";
import type { Component } from "solid-js";

import { createSignal, lazy } from "solid-js";
import { createStore } from "solid-js/store";

import { IoMail } from "solid-icons/io";
import { HiSolidFolder } from "solid-icons/hi";

import { screen } from "@/stores/remote";

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
    y: number,

    height: number,
    width: number
  };
}

export const createNewWindowObject = (desktopItemId: string, component: Component): OpenedWindow => {
  // Note: Taskbar takes 56px at the bottom of the screen. 
  const TASKBAR_HEIGHT = 56;
  
  // We take 200px of padding.
  const height = (screen.height - TASKBAR_HEIGHT) - 200;
  const width = screen.width - 200;

  return {
    desktopItemId,
    component,

    isMaximized: false,
    isMinimized: false,
  
    position: {
      // We try to center the windows when they open for the first time.
      x: screen.width / 2 - width / 2,
      y: (screen.height - TASKBAR_HEIGHT) / 2 - height / 2,

      height, 
      width
    }
  };
};

export const openNewWindow = (desktopItemId: string, component: Component) => {
  setOpenedWindows(draft => [...draft, createNewWindowObject(desktopItemId, component)]);
  setCurrentActiveWindow(openedWindows.length - 1);
};

export const defaultDesktopItems: DesktopItem[] = [
  {
    id: "contact",
    name: "Contact",
    icon: IoMail,
    start_action: () => openNewWindow("contact", lazy(() => import("@/windows/Contact")))
  },
  {
    id: "portfolio",
    name: "Portfolio",
    icon: HiSolidFolder,
    start_action: () => openNewWindow("portfolio", lazy(() => import("@/windows/Portfolio")))
  }
];

export const [desktopItems, setDesktopItems] = createStore<DesktopItem[]>(defaultDesktopItems);
export const [openedWindows, setOpenedWindows] = createStore<OpenedWindow[]>([]);
export const [currentActiveWindow, setCurrentActiveWindow] = createSignal<number | null>(null);
