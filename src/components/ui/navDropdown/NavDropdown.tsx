import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import ArrowDownIcon from "@/assets/icon/arrow-down.svg";

interface Link {
  label: string;
  url: string;
  icon: StaticImageData;
}

interface DropdownMenuProps {
  menuItems: Link[];
}

export const NavDropdown: React.FC<DropdownMenuProps> = ({ menuItems }) => {
  const [openMoreMenu, setOpenMoreMenu] = useState(false);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.closest(".more-container")) {
        setOpenMoreMenu(false);
      }
    };
    document.addEventListener("click", onDocumentClick);
    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <div className="relative" data-testid="nav-dropdown">
      <button
        className="more-container"
        onClick={() => setOpenMoreMenu(!openMoreMenu)}
      >
        <span className="flex items-center gap-x-1.5 hover:opacity-80">
          More
          <Image
            src={ArrowDownIcon}
            className="w-2 h-2 self-center"
            alt="Arrow down"
          />
        </span>
      </button>
      <ul
        className={`more-dropdown p-2 transition-all absolute mt-1 w-28 left-0 bg-[#201D47] menu-ng text-white rounded-sm shadow-lg z-10 font-bold ${openMoreMenu ? "visible" : "hidden"}`}
        data-testid="dropdown-menu"
      >
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="w-full py-1 px-2 relative flex items-center rounded-sm  hover:bg-[#4c37a740]"
          >
            <a
              href={item.url}
              className="hover:opacity-80 flex gap-x-2 w-full items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <Image
                  src={item.icon}
                  className="w-4 h-4"
                  alt={item.label}
                  width={16}
                />
              </div>
              <div>{item.label}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
