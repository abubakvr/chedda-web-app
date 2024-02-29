import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ConnectModal } from "../ConnectModal";

describe("ConnectModal Component", () => {
  it("renders the modal when it's open", () => {
    render(<ConnectModal isModalOpen={true} setIsModalOpen={() => {}} />);

    const modalElement = screen.getByTestId("connect-modal");
    expect(modalElement).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    const setIsModalOpen = jest.fn();
    render(<ConnectModal isModalOpen={true} setIsModalOpen={setIsModalOpen} />);

    const closeButtonElement = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButtonElement);

    expect(setIsModalOpen).toHaveBeenCalledWith(false);

    waitFor(() => {
      const closedModalElement = screen.queryByTestId("connect-modal");
      expect(closedModalElement).not.toBeInTheDocument();
    });
  });

  it("activates the MetaMask connector when the MetaMask button is clicked", async () => {
    render(<ConnectModal isModalOpen={true} setIsModalOpen={() => {}} />);

    const metaMaskButtonElement = screen.getByText("MetaMask");
    fireEvent.click(metaMaskButtonElement);
  });
});
