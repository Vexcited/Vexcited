import type { IconTypes } from "solid-icons";
import type { Component } from "solid-js";

import { Dynamic } from "solid-js/web";

import { FaBrandsDiscord, FaBrandsInstagram, FaBrandsTwitter, FaBrandsGithub } from "solid-icons/fa";
import { SiGmail } from "solid-icons/si";

const ContactCard: Component<{
  color: string;
  icon: IconTypes;
  social_name: string;
  value: string;

  href?: string;
  action?: () => void;
}> = (props) => (
  <Dynamic component={props.href ? "a" : "button"}
    href={props.href} onClick={() => props.action ? props.action() : void 0}
    target={props.href ? "_blank" : undefined}
    class="border rounded-md w-full px-4 py-2 flex gap-2 items-center bg-grey-dark bg-opacity-40 hover:bg-opacity-80 transition-colors"
    style={{ "border-color": props.color }}
    title={props.social_name}
  >
    <props.icon />
    <span>{props.value}</span>
  </Dynamic>
);

const ContactWindow: Component = () => {

  return (
    <div class="p-4">
      <div class="text-center pt-4 pb-8">
        <h2 class="text-lg">Mikkel RINGAUD / Vexcited</h2>
        <p class="text-sm text-white-dark text-opacity-80">Here is a list of my socials where you can find and/or contact me!</p>
      </div>

      <div class="flex flex-col items-center gap-2 max-w-xs mx-auto">
        <ContactCard
          color="#D08770"
          icon={FaBrandsInstagram}
          social_name="Instagram"
          value="vexcitedoff"
          href="https://instagram.com/vexcitedoff"
        />
        <ContactCard
          color="#5E81AC"
          icon={FaBrandsTwitter}
          social_name="Twitter"
          value="vexcitedoff"
          href="https://twitter.com/vexcitedoff"
        />
        <ContactCard
          color="#fff"
          icon={FaBrandsGithub}
          social_name="GitHub"
          value="Vexcited"
          href="https://github.com/Vexcited"
        />
        <ContactCard
          color="#5865F2"
          icon={FaBrandsDiscord}
          social_name="Discord"
          value="Vexcited#9528"
          action={() => navigator.clipboard.writeText("Vexcited#9528")}
        />
        <ContactCard
          color="#88C0D0"
          icon={SiGmail}
          social_name="E-Mail"
          value="vexitofficial@gmail.com"
          href="mailto:vexitofficial@gmail.com"
        />
      </div>

    </div>
  );
};

export default ContactWindow;
