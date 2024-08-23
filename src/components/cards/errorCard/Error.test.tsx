import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorCard } from "./ErrorCard";

describe("ErrorCard component", () => {
  it("should display the error message", () => {
    const message = "An error occurred";
    render(<ErrorCard>{message}</ErrorCard>);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should have correct styles for the button", () => {
    render(<ErrorCard> Error</ErrorCard>);

    const button = screen.getByTestId("refresh-button");
    expect(button).toHaveClass(
      "card-gradient-text underline text-[8px] md:text-xs lg:text-sm font-bold hover:opacity-90"
    );
  });
});
