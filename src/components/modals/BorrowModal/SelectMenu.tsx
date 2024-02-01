import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ArrowDownIcon from "@/assets/icon/arrow-down.svg";
import { IToken } from "@/utils/types";

interface SelectMenuProps {
  setSelectedCollateral: Dispatch<SetStateAction<IToken>>;
  selectedCollateral: IToken;
  collaterals: IToken[];
}

export const SelectMenu = ({
  setSelectedCollateral,
  selectedCollateral,
  collaterals,
}: SelectMenuProps) => {
  const [isOpenSelectMenu, setIsOpenSelectMenu] = useState(false);

  const openSelectMenu = () => {
    setIsOpenSelectMenu(!isOpenSelectMenu);
  };

  const handleCollateralSelect = (collateral: IToken) => {
    setSelectedCollateral(collateral);
    setIsOpenSelectMenu(false);
  };

  const onDocumentClick = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest(".select-menu-container")) {
      setIsOpenSelectMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <div className="relative select-menu-container">
      <button
        onClick={openSelectMenu}
        className="h-8 min-w-24 px-3 rounded text-xs gap-x-1 flex modal-button justify-between items-center hover:opacity-90 font-bold"
      >
        <div>
          <Image
            src={selectedCollateral?.logo}
            className="w-4 h-4 self-center"
            alt="collateral image"
          />
        </div>
        <div className="flex gap-1 mr-2 items-center font-bold">
          {selectedCollateral?.symbol}
        </div>
        <div>
          <Image
            src={ArrowDownIcon}
            className="w-2 h-2 self-center"
            alt="Arrow down"
          />
        </div>
      </button>
      <div
        id="mySelectMenu"
        className={`p-2 transition-all absolute mt-1 w-32 right-0 bg-[#201D47] menu-ng text-white rounded-sm shadow-lg z-10 ${
          isOpenSelectMenu ? "" : "hidden"
        }`}
      >
        <ul className="list-reset text-center font-bold">
          {collaterals?.map((c) => (
            <li
              key={c.symbol}
              className="py-2 px-2 flex items-center gap-x-2 rounded-sm text-sm hover:cursor-pointer hover:bg-[#4c37a740] transition-all last:border-none"
              onClick={() => handleCollateralSelect(c)}
            >
              <div>
                <Image
                  src={c.logo}
                  className="w-4 h-4 self-center"
                  alt="Arrow down"
                />
              </div>
              <div className="">{c.symbol}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
