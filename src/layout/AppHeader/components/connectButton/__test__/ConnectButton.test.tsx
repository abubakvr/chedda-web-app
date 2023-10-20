import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ConnectButton } from "../ConnectButton";

describe("ConnectButton Component", () => {
  it("opens the modal when the button is clicked", () => {
    render(<ConnectButton />);

    const buttonElement = screen.getByTestId("connect-button");
    fireEvent.click(buttonElement);

    waitFor(() => {
      const modalElement = screen.getByTestId("connect-modal");
      expect(modalElement).toBeInTheDocument();
    });
  });
});
