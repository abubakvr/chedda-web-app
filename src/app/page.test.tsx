import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "./page"; // Adjust the import path as needed

describe("Home component", () => {
  it("renders the text correctly", () => {
    render(<Home />);
    const textElement = screen.getByText("Hello Chedda");

    // Check if the text is in the document
    expect(textElement).toBeInTheDocument();

    // You can also check for specific CSS classes if needed
    expect(textElement).toHaveClass("text-center text-3xl");
  });
});
