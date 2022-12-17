import type { Component } from "solid-js";
import type { DesktopItem as DesktopItemType } from "@/stores/desktop";

const DesktopItem: Component<DesktopItemType> = (props) => {
  return (
    <div
      class="cursor-pointer rounded-md select-none hover:bg-grey-dark hover:bg-opacity-20 hover:border-grey-dark border border-transparent py-2 px-4 transition flex flex-col gap-2 items-center"
      onClick={() => props.start_action()}
    >
      <props.icon size={48} />
      <span>{props.name}</span>
    </div>
  );
};

export default DesktopItem;
