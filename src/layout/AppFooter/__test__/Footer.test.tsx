import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test("renders footer links correctly", () => {
    const footerLinks = [
      { title: "Platform", links: ["Home"] },
      { title: "Legal", links: ["Disclaimer & terms"] },
      { title: "Documentation", links: ["More about Chedda"] },
      { title: "Brandkit", links: ["Logo & brand assets"] },
      { title: "Github", links: ["Source Codes"] },
      { title: "Contact Us", links: ["Send us an email"] },
    ];

    footerLinks.forEach((linkGroup) => {
      expect(screen.getByText(linkGroup.title)).toBeInTheDocument();
      linkGroup.links.forEach((link) => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });
  });

  test("footer links have correct href attributes", () => {
    expect(screen.getByText("Home").closest("a")).toHaveAttribute(
      "href",
      "https://chedda.finance"
    );
    expect(screen.getByText("Disclaimer & terms").closest("a")).toHaveAttribute(
      "href",
      "https://chedda.finance/terms"
    );
    expect(screen.getByText("More about Chedda").closest("a")).toHaveAttribute(
      "href",
      "https://docs.chedda.finance"
    );
    expect(
      screen.getByText("Logo & brand assets").closest("a")
    ).toHaveAttribute("href", "#");
    expect(screen.getByText("Source Codes").closest("a")).toHaveAttribute(
      "href",
      "https://github.com/chedda-tech"
    );
    expect(screen.getByText("Send us an email").closest("a")).toHaveAttribute(
      "href",
      "mailto:hello@chedda.finance"
    );
  });

  test("renders icon links with correct attributes", () => {
    const iconLinks = [
      { ariaLabel: "X", href: "https://x.com/chedda_finance" },
      { ariaLabel: "Discord", href: "https://discord.gg/4ZMWVez73A" },
      { ariaLabel: "Telegram", href: "https://t.me/chedda_fi" },
      { ariaLabel: "Medium", href: "https://medium.com/chedda-finance" },
    ];

    iconLinks.forEach((icon) => {
      const iconElement = screen.getByLabelText(icon.ariaLabel);
      expect(iconElement).toBeInTheDocument();
      expect(iconElement.closest("a")).toHaveAttribute("href", icon.href);
    });
  });

  test("renders app logo correctly", () => {
    const logo = screen.getByTestId("app-logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("alt", "App Logo");
    expect(logo).toHaveAttribute("width", "30");
  });

  test("displays copyright text", () => {
    const copyrightText = screen.getByText(
      "© CHEDDA 2024. All rights reserved - V1.0"
    );
    expect(copyrightText).toBeInTheDocument();
  });
});
