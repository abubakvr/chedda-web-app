// Button.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button Component", () => {
  it("renders button correctly", () => {
    render(
      <Button
        type="primary"
        onClick={() => {}}
        size="large"
        data-testid="custom-button"
      >
        Click me
      </Button>
    );

    const button = screen.getByTestId("custom-button");

    // Check if button is rendered with correct styles
    expect(button).toHaveClass("primary-button");
    expect(button).toHaveClass("w-full");
    expect(button).toHaveClass("text-center");
    expect(button).toHaveClass("h-[56px]");
    expect(button).toHaveClass("rounded-lg");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("uppercase");
    expect(button).toHaveClass("font-bold");
    expect(button).toHaveClass("text-xl");
    expect(button).toHaveClass("hover:opacity-80");
    expect(button).toHaveClass("flex");
    expect(button).toHaveClass("justify-center");
    expect(button).toHaveClass("gap-x-3");
    expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(
      <Button
        type="primary"
        onClick={onClickMock}
        size="large"
        data-testid="custom-button"
      >
        Click me
      </Button>
    );

    const button = screen.getByTestId("custom-button");

    // Click the button
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick handler when disabled", () => {
    const onClickMock = jest.fn();
    render(
      <Button
        type="primary"
        onClick={onClickMock}
        size="large"
        isLoading
        data-testid="custom-button"
      >
        Click me
      </Button>
    );

    const button = screen.getByTestId("custom-button");

    // Click the button
    fireEvent.click(button);

    // Check if onClick handler is not called when disabled
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
