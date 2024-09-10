import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { NavDropdown } from "../NavDropdown";
import { StaticImageData } from "next/image";

describe("NavDropdown component", () => {
  const menuItems = [
    {
      label: "Docs",
      url: "https://example.com/docs",
      icon: {} as StaticImageData,
    },
    {
      label: "Discord",
      url: "https://discord.com",
      icon: {} as StaticImageData,
    },
    {
      label: "Twitter",
      url: "https://twitter.com",
      icon: {} as StaticImageData,
    },
  ];

  test("renders More button", () => {
    const { getByTestId } = render(<NavDropdown menuItems={menuItems} />);
    const moreButton =
      getByTestId("nav-dropdown").querySelector(".more-container");
    expect(moreButton).toBeInTheDocument();
  });

  test("clicking More button toggles dropdown menu", () => {
    const { getByTestId } = render(<NavDropdown menuItems={menuItems} />);
    const moreButton =
      getByTestId("nav-dropdown").querySelector(".more-container");
    const dropdownMenu = getByTestId("dropdown-menu");

    expect(dropdownMenu).toHaveClass("invisible");

    fireEvent.click(moreButton!);

    expect(dropdownMenu).toHaveClass("visible");
  });

  test("clicking outside dropdown menu closes it", () => {
    const { getByTestId } = render(<NavDropdown menuItems={menuItems} />);
    const moreButton =
      getByTestId("nav-dropdown").querySelector(".more-container");
    const dropdownMenu = getByTestId("dropdown-menu");

    fireEvent.click(moreButton!);
    expect(dropdownMenu).toHaveClass("visible");

    fireEvent.click(moreButton!); // Click outside the dropdown menu
    expect(dropdownMenu).toHaveClass("invisible");
  });
});
