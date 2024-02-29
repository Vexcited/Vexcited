import type { IconTypes } from "solid-icons";
import type { Component } from "solid-js";

import { Dynamic } from "solid-js/web";

import { FaBrandsDiscord, FaBrandsInstagram, FaBrandsTwitter, FaBrandsGithub, FaBrandsLinkedin } from "solid-icons/fa";
import { SiGmail } from "solid-icons/si";

const ContactCard: Component<{
  icon: IconTypes;
  social_name: string;
  value: string;

  href?: string;
  action?: () => void;
}> = (props) => (
  <Dynamic component={props.href ? "a" : "button"}
    href={props.href} onClick={() => props.action ? props.action() : void 0}
    target={props.href ? "_blank" : undefined}
    class="group border border-grey-dark hover:border-blue rounded-md w-full px-4 py-2 flex gap-2 items-center bg-grey-dark bg-opacity-40 hover:bg-opacity-80 transition-colors"
    title={props.social_name}
  >
    <props.icon />
    <span class="text-white-dark group-hover:text-blue transition-colors">{props.value}</span>
  </Dynamic>
);

const ContactWindow: Component = () => {
  return (
    <div class="p-4">
      <div class="text-center pt-4 pb-8">
        <h2 class="text-lg">Mikkel RINGAUD</h2>
        <p class="text-sm text-white-dark text-opacity-80">
          Here is a list of my socials where you can find me !
        </p>
      </div>

      <div class="flex flex-col items-center gap-2 max-w-xs mx-auto">
        <ContactCard
          icon={FaBrandsInstagram}
          social_name="Instagram"
          value="vexcitedoff"
          href="https://instagram.com/vexcitedoff"
        />
        <ContactCard
          icon={FaBrandsTwitter}
          social_name="X"
          value="vexcitedoff"
          href="https://x.com/vexcitedoff"
        />
        <ContactCard
          icon={FaBrandsGithub}
          social_name="GitHub"
          value="Vexcited"
          href="https://github.com/Vexcited"
        />
        <ContactCard
          icon={FaBrandsLinkedin}
          social_name="LinkedIn"
          value="Vexcited"
          href="https://linkedin.com/in/Vexcited"
        />
        <ContactCard
          icon={FaBrandsDiscord}
          social_name="Discord"
          value="vexcited"
          action={() => navigator.clipboard.writeText("vexcited")}
        />
        <ContactCard
          icon={SiGmail}
          social_name="E-Mail"
          value="mikkel@milescode.dev"
          href="mailto:mikkel@milescode.dev"
        />
      </div>

    </div>
  );
};

export default ContactWindow;
