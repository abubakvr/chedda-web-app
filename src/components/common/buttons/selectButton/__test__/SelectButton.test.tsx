import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SelectButton } from "../SelectButton"; // Adjust the import path as needed

describe("SelectButton", () => {
  it("renders the button with label and image", () => {
    const label = "Connect Wallet";
    const imageSrc = "/path/to/wallet-image.png";

    render(
      <SelectButton
        label={label}
        image={imageSrc}
        onClick={() => {}}
        loading={false}
      />
    );

    const button = screen.getByTestId("select-button");

    const labelElement = screen.getByTestId("button-label");
    const imageElement = screen.getByTestId("button-image");

    expect(button).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClickMock = jest.fn();
    const label = "Connect Wallet";
    const imageSrc = "/path/to/wallet-image.png";

    render(
      <SelectButton
        label={label}
        image={imageSrc}
        onClick={onClickMock}
        loading={false}
      />
    );

    const button = screen.getByTestId("select-button");
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
