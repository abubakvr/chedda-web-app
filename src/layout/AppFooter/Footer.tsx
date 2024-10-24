import React from "react";
import Image from "next/image";
import MediumLogo from "@/assets/logos/medium-logo.png";
import DiscordLogo from "@/assets/logos/discord-logo.png";
import TelegramLogo from "@/assets/logos/telegram-logo.png";
import XLogo from "@/assets/logos/x-logo.png";
import CheddaLogo from "@/assets/logos/app-logo.svg";

const footerLinks = [
  {
    title: "Platform",
    links: [
      {
        label: "Home",
        href: "https://chedda.finance",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Disclaimer & terms",
        href: "https://chedda.finance/terms",
      },
    ],
  },
  {
    title: "Documentation",
    links: [
      {
        label: "More about Chedda",
        href: "https://docs.chedda.finance",
      },
    ],
  },
  {
    title: "Brandkit",
    links: [
      {
        label: "Logo & brand assets",
        href: "#",
      },
    ],
  },
  {
    title: "Github",
    links: [
      {
        label: "Source Codes",
        href: "https://github.com/chedda-tech",
      },
    ],
  },
  {
    title: "Contact Us",
    links: [
      {
        label: "Send us an email",
        href: "mailto:hello@chedda.finance",
      },
    ],
  },
];

const iconLinks = [
  {
    href: "https://x.com/chedda_finance",
    ariaLabel: "X",
    src: XLogo,
    alt: "X icon",
  },
  {
    href: "https://discord.gg/4ZMWVez73A",
    ariaLabel: "Discord",
    src: DiscordLogo,
    alt: "Discord icon",
  },
  {
    href: "https://t.me/chedda_fi",
    ariaLabel: "Telegram",
    src: TelegramLogo,
    alt: "Telegram icon",
  },
  {
    href: "https://medium.com/chedda-finance",
    ariaLabel: "Medium",
    src: MediumLogo,
    alt: "Medium icon",
  },
];

export const Footer = () => {
  return (
    <footer className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-[1600px] mx-auto mt-4 md:mt-16 pb-10">
      <div className="footer-card text-gray-300 py-10">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 gap-y-10 pl-5 sm:pl-10 md:pl-10 lg:pl-20 xl:pl-32 relative">
            {footerLinks.map((linkGroup) => (
              <div className="col-span-1" key={linkGroup.title}>
                <h3 className="font-bold text-lg md:text-xl">
                  {linkGroup.title}
                </h3>
                <ul>
                  {linkGroup.links.map((link) => (
                    <li className="mt-2" key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        className="text-sm md:text-lg text-mist hover:underline hover:opacity-85"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="w-11/12 mx-auto flex items-center justift-center md:justify-between mt-12">
            <div className="border-b border-frost w-full hidden md:flex" />
            <div className="w-full md:w-max flex flex-col justify-center items-center">
              <div className="w-max mx-auto px-10 flex gap-x-4 items-center relative">
                {iconLinks.map((iconLink) => (
                  <a
                    href={iconLink.href}
                    aria-label={iconLink.ariaLabel}
                    key={iconLink.ariaLabel}
                    target="_blank"
                    className="hover:opacity-80"
                  >
                    <Image
                      style={{ color: "" }}
                      src={iconLink.src}
                      alt={iconLink.alt}
                      className="h-8  w-8 md:h-9 md:w-9"
                      width={32}
                      height={32}
                    />
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-frost w-full hidden md:flex" />
          </div>
          <Image
            style={{ color: "" }}
            src={CheddaLogo}
            width={30}
            className="w-28 xl:w-32 mt-8"
            alt="App Logo"
            data-testid="app-logo"
            priority={true}
          />
          <div className="text-gray-500 text-xs mt-4">
            <span>© CHEDDA 2024. All rights reserved - V1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
