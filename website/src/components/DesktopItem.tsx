import type { Component } from "solid-js";
import type { DesktopItem as DesktopItemType } from "@/stores/desktop";

const DesktopItem: Component<DesktopItemType> = (props) => {
  return (
    <div
      class="cursor-pointer rounded-sm select-none hover:bg-grey-dark hover:bg-opacity-20 hover:border-grey-dark border border-transparent h-24 p-2 aspect-square flex flex-col gap-2 items-center"
      onClick={() => props.start_action()}
    >
      {props.icon}
      {props.name}
    </div>
  );
};

export default DesktopItem;
