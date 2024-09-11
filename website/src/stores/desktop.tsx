import type { IconTypes } from "solid-icons";
import type { Component } from "solid-js";

import { createSignal, lazy } from "solid-js";
import { createStore } from "solid-js/store";

import { HiSolidFolder } from "solid-icons/hi";
import { FaSolidFilePdf, FaSolidLink } from "solid-icons/fa";

import { screen } from "@/stores/remote";

export interface Application {
  /** Identifier, like an executable name. */
  id: string;
  name: string;
  icon: IconTypes;
  component: Component;
}

export interface DesktopItem extends Application {
  start_action: () => void;
}

export interface OpenedWindow {
  app: Application;

  isMaximized: boolean;
  isMinimized: boolean;

  position: {
    x: number,
    y: number,

    height: number,
    width: number
  };
}

export const createNewWindowObject = (app: Application): OpenedWindow => {
  // Note: Taskbar takes 56px at the bottom of the screen.
  const TASKBAR_HEIGHT = 56;

  // We take 200px of padding.
  const height = (screen.height - TASKBAR_HEIGHT) - 200;
  const width = screen.width - 200;

  return {
    app,

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

export const openNewWindow = (app: Application) => {
  setOpenedWindows((draft) => [...draft, createNewWindowObject(app)]);
  setCurrentActiveWindow(openedWindows.length - 1);
};

export const applications: Application[] = [
  {
    id: "links",
    name: "Links",
    icon: FaSolidLink,
    component: lazy(() => import("@/windows/Links"))
  },
  {
    id: "portfolio",
    name: "Portfolio",
    icon: HiSolidFolder,
    component: lazy(() => import("@/windows/Portfolio"))
  },
  {
    id: "cv",
    name: "CV",
    icon: FaSolidFilePdf,
    component: lazy(() => import("@/windows/CV"))
  }
];

export const desktopItems: DesktopItem[] = applications.map((app) => ({
  ...app,
  start_action: () => openNewWindow(app)
}));

export const [openedWindows, setOpenedWindows] = createStore<OpenedWindow[]>([]);
export const [currentActiveWindow, setCurrentActiveWindow] = createSignal<number | null>(null);
