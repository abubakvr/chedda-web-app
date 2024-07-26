import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileNav } from "../MobileNav";
import { menuItems, moreMenuItems } from "@/utils/constants";

// Mock next/router for usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/markets"),
}));

describe("MobileNav", () => {
  const setNavOpenMock = jest.fn();

  beforeEach(() => {
    setNavOpenMock.mockClear();
  });

  it("renders correctly when nav is open", () => {
    render(<MobileNav navOpen={true} setNavOpen={setNavOpenMock} />);

    // Check if the nav component is rendered
    const nav = screen.getByTestId("mobile-nav");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveStyle("transform: translateX(0px)");

    // Check if the close button is present
    expect(screen.getByTestId("close-button")).toBeInTheDocument();

    // Check if menu items are rendered
    menuItems.forEach((item, index) => {
      expect(screen.getByTestId(`menu-item-${index}`)).toHaveTextContent(
        item.name
      );
    });

    // Check if more menu items are rendered
    moreMenuItems.forEach((item, index) => {
      expect(screen.getByTestId(`more-menu-item-${index}`)).toBeInTheDocument();
    });
  });

  it("renders correctly when nav is closed", () => {
    render(<MobileNav navOpen={false} setNavOpen={setNavOpenMock} />);

    // Check if the nav component is rendered and moved off-screen
    const nav = screen.getByTestId("mobile-nav");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveStyle("transform: translateX(100%)");
  });

  it("calls setNavOpen with false when close button is clicked", () => {
    render(<MobileNav navOpen={true} setNavOpen={setNavOpenMock} />);

    // Click the close button
    fireEvent.click(screen.getByTestId("close-button"));

    // Check if setNavOpen is called with false
    expect(setNavOpenMock).toHaveBeenCalledWith(false);
  });

  it("calls setNavOpen with false when a menu item is clicked", () => {
    render(<MobileNav navOpen={true} setNavOpen={setNavOpenMock} />);

    // Click the first menu item
    fireEvent.click(screen.getByTestId("menu-link-0"));

    // Check if setNavOpen is called with false
    expect(setNavOpenMock).toHaveBeenCalledWith(false);
  });

  it("displays the PacmanLogo for the active path", () => {
    render(<MobileNav navOpen={true} setNavOpen={setNavOpenMock} />);

    // Check if the PacmanLogo is displayed for the active menu item
    expect(screen.getByTestId("pacman-logo-1")).toBeInTheDocument();
  });

  it("renders external links in the more menu", () => {
    render(<MobileNav navOpen={true} setNavOpen={setNavOpenMock} />);

    // Check if each more menu item has a link with the correct href
    moreMenuItems.forEach((item, index) => {
      const moreMenuLink = screen.getByTestId(`more-menu-link-${index}`);
      expect(moreMenuLink).toBeInTheDocument();
      expect(moreMenuLink).toHaveAttribute("href", item.url);
    });
  });
});
