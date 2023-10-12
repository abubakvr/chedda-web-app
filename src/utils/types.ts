import { StaticImageData } from "next/image";

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export interface networkListInterface {
  label: string;
  key: string;
  icon: StaticImageData;
}
