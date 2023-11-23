import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ProfileMenu } from "../ProfileMenu"; // Adjust the import path as needed
import { mockLocalStorage } from "@/utils/Mocks/MockLocalStorage";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { connectorIdKey } from "@/utils/constants";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("../../../../..//utils/copyToClipboard", () => ({
  copyToClipboard: jest.fn(),
}));

describe("ProfileMenu", () => {
  it("should open the profile menu when the button is clicked", () => {
    render(
      <MockAppProviders>
        <ProfileMenu account="0x12345" />
      </MockAppProviders>
    );
    const profileMenu = screen.getByTestId("profile-menu-container");
    const profileMenuButton = screen.getByTestId("profile-menu-button");

    waitFor(() => {
      expect(profileMenu).toBeVisible();
    });

    fireEvent.click(profileMenuButton);
    const profileMenuDropdown = screen.getByTestId("profile-menu-dropdown");

    waitFor(() => {
      expect(profileMenuDropdown).toBeVisible();
    });
  });

  it("should copy the address to the clipboard when the 'Copy' button is clicked", async () => {
    render(
      <MockAppProviders>
        <ProfileMenu account="0x12345" />
      </MockAppProviders>
    );

    const profileMenuButton = screen.getByTestId("profile-menu-button");

    fireEvent.click(profileMenuButton);

    const copyButton = screen.getByTestId("copy-address-button");
    (copyToClipboard as jest.Mock).mockResolvedValue("0x12345");

    fireEvent.click(copyButton);

    waitFor(() => {
      const copyLabel = screen.getByTestId("address-copy-tooltip");
      expect(copyLabel).toHaveTextContent("Copied");
      expect(copyToClipboard).toHaveBeenCalledWith("0x12345");
    });
  });

  it("should disconnect the wallet when the 'Disconnect' button is clicked", () => {
    render(
      <MockAppProviders>
        <ProfileMenu account="0x12345" />
      </MockAppProviders>
    );

    const profileMenuButton = screen.getByTestId("profile-menu-button");

    fireEvent.click(profileMenuButton);

    const disconnectButton = screen.getByTestId("disconnect-button");

    const localStorageMock = {
      removeItem: jest.fn(),
    };
    global.localStorage = mockLocalStorage;

    const connector = {
      deactivate: jest.fn(),
      resetState: jest.fn(),
      close: jest.fn(),
    };

    fireEvent.click(disconnectButton);

    waitFor(() => {
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(connectorIdKey);
      expect(connector.deactivate).toHaveBeenCalled();
      expect(connector.resetState).toHaveBeenCalled();
      expect(connector.close).toHaveBeenCalled();
    });
  });
});
