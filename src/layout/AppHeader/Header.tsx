import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CheddaLogo from "@/assets/logos/app-logo.svg";
import CheddaMiniLogo from "@/assets/logos/chedda-logo.svg";
import { ConnectButton } from "./components/ConnectButton";
import { NetworkMenu } from "./components/NetworkMenu";
import { ProfileMenu } from "./components/ProfileMenu";
import { menuItems } from "@/utils/constants";
import { useWeb3React } from "@web3-react/core";

export const HeaderComponent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { account } = useWeb3React();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`h-20 bg-black border-b border-gray-800 flex items-center ${
          isScrolled ? " w-full fixed mb-20" : ""
        }`}
      >
        <div className="flex flex-row justify-between w-11/12 xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto items-center">
          <div>
            <Image
              src={CheddaLogo}
              width={30}
              className="w-40 md:hidden lg:flex"
              alt="App Logo"
            />
            <Image
              src={CheddaMiniLogo}
              className="w-16 flex lg:hidden"
              width={70}
              height={20}
              alt="Chedda Logo"
            />
          </div>
          <div className="flex flex-row text-white space-x-10 mt-2 text-sm sm:text-lg font-semibold">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="relative hover:opacity-80"
              >
                <div>{item.name}</div>
                <div className="hidden pacman-loader">
                  {/* Include your Pacman Loader component */}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-row gap-2 text-white">
            <NetworkMenu />
            {account ? <ProfileMenu address={account} /> : <ConnectButton />}
          </div>
        </div>
      </div>
    </>
  );
};
