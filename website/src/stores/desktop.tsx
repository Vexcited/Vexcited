import type { IconTypes } from "solid-icons";
import type { Component } from "solid-js";

import { lazy } from "solid-js";
import { createStore } from "solid-js/store";

import { IoMail } from "solid-icons/io";
import { HiSolidFolder } from "solid-icons/hi";

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
  active: boolean;
  
  position: {
    x: number,
    y: number,

    height: number,
    width: number
  };
}

export const createNewWindow = (desktopItemId: string, component: Component): OpenedWindow => ({
  desktopItemId,
  component,

  isMaximized: false,
  active: true,
  
  position: {
    x: 0,
    y: 0,
    height: 250,
    width: 500
  }
});

export const defaultDesktopItems: DesktopItem[] = [
  {
    id: "contact",
    name: "Contact",
    icon: IoMail,
    start_action: () => {
      setOpenedWindows(
        draft => [...draft, createNewWindow("contact", lazy(() => import("@/windows/Contact")))]
      );
    }
  },
  {
    id: "portfolio",
    name: "Portfolio",
    icon: HiSolidFolder,
    start_action: () => {
      setOpenedWindows(
        draft => [...draft, createNewWindow("portfolio", lazy(() => import("@/windows/Portfolio")))]
      );
    }
  }
];

export const [desktopItems, setDesktopItems] = createStore<DesktopItem[]>(defaultDesktopItems);
export const [openedWindows, setOpenedWindows] = createStore<OpenedWindow[]>([]);
