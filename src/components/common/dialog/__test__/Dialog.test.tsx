import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Dialog } from "../Dialog";

describe("Dialog component", () => {
  test("renders with correct props and handles button clicks", () => {
    const onCloseMock = jest.fn();
    const buttonActionMock = jest.fn();

    render(
      <Dialog
        isOpen={true}
        title="Test Title"
        message="Test Message"
        actionTitle="Test Action"
        onClose={onCloseMock}
        buttonAction={buttonActionMock}
      />
    );

    expect(screen.getByTestId("dialog-title")).toHaveTextContent("Test Title");
    expect(screen.getByText("Test Message")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    fireEvent.click(screen.getByText("Test Action"));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(buttonActionMock).toHaveBeenCalledTimes(1);
  });

  test("renders correctly when not open", () => {
    render(
      <Dialog
        isOpen={false}
        title="Test Title"
        message="Test Message"
        actionTitle="Test Action"
        onClose={() => {}}
        buttonAction={() => {}}
      />
    );

    expect(screen.getByTestId("dialog-container")).toHaveClass("hidden");
  });
});
