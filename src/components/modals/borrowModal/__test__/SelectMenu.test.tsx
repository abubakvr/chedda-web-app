import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SelectMenu } from "../SelectMenu";
import { StaticImageData } from "next/image";

describe("SelectMenu Component", () => {
  const mockSetSelectedCollateral = jest.fn();

  const mockCollaterals = [
    {
      name: "Token3",
      symbol: "T3",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
    },
    {
      name: "Token2",
      symbol: "T2",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
    },
  ];

  const mockProps = {
    setSelectedCollateral: mockSetSelectedCollateral,
    selectedCollateral: {
      name: "Token2",
      symbol: "T2",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
    },
    collaterals: mockCollaterals,
  };

  it("renders SelectMenu component", () => {
    render(<SelectMenu {...mockProps} />);

    const selectMenuContainer = screen.getByTestId("select-menu-container");
    expect(selectMenuContainer).toBeInTheDocument();
  });

  it("opens and closes the select menu", () => {
    render(<SelectMenu {...mockProps} />);

    const selectMenuButton = screen.getByRole("button");
    const selectMenu = screen.getByTestId("select-menu");

    expect(selectMenu).toHaveClass("hidden");

    // Open select menu
    fireEvent.click(selectMenuButton);
    expect(selectMenu).not.toHaveClass("hidden");

    // Close select menu
    fireEvent.click(document.body); // Click outside
    expect(selectMenu).toHaveClass("hidden");
  });

  it("handles collateral selection", () => {
    render(<SelectMenu {...mockProps} />);

    const selectMenuButton = screen.getByTestId("select-menu-button");
    fireEvent.click(selectMenuButton); // Open select menu

    const collateral = screen.getByTestId("collateral-item-T2");
    fireEvent.click(collateral);

    expect(screen.getByTestId("select-button-text")).toHaveTextContent("T2");
    expect(mockSetSelectedCollateral).toHaveBeenCalledWith(mockCollaterals[1]);
  });
});
