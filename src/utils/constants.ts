import { chainIds } from "@/data/chainIds";
import { MenuItem, networkListInterface } from "./types";
import Arbitrum_Logo from "@/assets/logos/arbitrum-logo.png";

export const menuItems: MenuItem[] = [
  {
    name: "Lend",
    path: "/lend",
    icon: "briefcase",
  },
  {
    name: "Borrow",
    path: "/borrow",
    icon: "cash",
  },
  {
    name: "Grotto",
    path: "/grotto",
    icon: "storefront",
  },
  {
    name: "Vote",
    path: "/vote",
    icon: "checkbox",
  },
];

export const defaultNetwork: networkListInterface = {
  label: "Arbitrum ",
  key: chainIds.arbitrumtest,
  icon: Arbitrum_Logo,
};
