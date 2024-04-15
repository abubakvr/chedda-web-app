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
<<<<<<< HEAD
        <span className="flex items-center gap-x-1.5 hover:opacity-80">
=======
        <span className="flex items-center gap-x-1.5">
>>>>>>> c4dda3a (feat: implement more dropdown)
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
<<<<<<< HEAD
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
=======
            className="w-full py-1 px-2 relative flex gap-x-2 items-center rounded-sm  hover:bg-[#4c37a740]"
          >
            <div>
              <Image
                src={item.icon}
                className="w-4 h-4 self-center"
                alt={item.label}
                width={16}
              />
            </div>
            <a
              href={item.url}
              className="relative hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
>>>>>>> c4dda3a (feat: implement more dropdown)
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
