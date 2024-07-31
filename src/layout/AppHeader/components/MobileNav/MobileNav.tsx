import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { menuItems, moreMenuItems } from "@/utils/constants";
import { PacmanLogo } from "@/components/ui";
import { usePathname } from "next/navigation";
import LinkOut from "@/assets/icon/link-out-grey.svg";
import Link from "next/link";

export const MobileNav = ({
  navOpen,
  setNavOpen,
}: {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  return (
    <nav
      className={`fixed inset-0 bg-gray-900 text-white bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20 flex justify-end transition-all`}
      style={{
        transform: navOpen ? "translateX(0px)" : "translateX(100%)",
      }}
      data-testid="mobile-nav"
    >
      <div className={`bg-black w-4/5 h-screen p-8 mobile-nav`}>
        <button
          onClick={() => setNavOpen(false)}
          className="hover:opacity-80"
          data-testid="close-button"
        >
          <span
            className="text-4xl cursor-pointer font-light text-white relative"
            data-testid="close-icon"
          >
            &times;
          </span>
        </button>
        <div className="mt-16 text-2xl text-[#FFFFFF80] font-bold">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="relative hover:opacity-80 mt-8"
              onClick={() => setNavOpen(false)}
              data-testid={`menu-link-${index}`}
            >
              <div className="mb-8">
                <div
                  className={`${pathname.startsWith(item.path) && "text-white"}`}
                  data-testid={`menu-item-${index}`}
                >
                  {item.name}
                </div>
                {pathname.startsWith(item.path) ? (
                  <div
                    className="mt-1 flex justify-start"
                    data-testid={`pacman-logo-${index}`}
                  >
                    <PacmanLogo />
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full border-b border-[#201D47] my-8" />
        <div className="gap-y-8">
          {moreMenuItems.map((item, index) => (
            <li
              key={index}
              className="w-full py-1 px-2 relative flex items-center rounded-sm hover:bg-[#4c37a740] pb-4"
              data-testid={`more-menu-item-${index}`}
            >
              <a
                href={item.url}
                className="hover:opacity-80 flex w-full items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`more-menu-link-${index}`}
              >
                <div className="flex gap-x-4 w-full items-center">
                  <Image
                    src={item.icon}
                    className="w-5 h-5 md:w-4 md:h-4"
                    alt={item.label}
                    width={16}
                    data-testid={`more-menu-icon-${index}`}
                  />
                  <div
                    className="text-2xl font-bold"
                    data-testid={`more-menu-label-${index}`}
                  >
                    {item.label}
                  </div>
                </div>
                <Image
                  src={LinkOut}
                  className="w-[18px] h-[18px]"
                  alt={item.label}
                  width={16}
                  data-testid={`link-out-icon-${index}`}
                />
              </a>
            </li>
          ))}
        </div>
      </div>
    </nav>
  );
};
