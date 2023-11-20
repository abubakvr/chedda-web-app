import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { NetworkMenu } from "../NetworkMenu";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

describe("NetworkMenu", () => {
  it("should open the network menu when the button is clicked", () => {
    <MockAppProviders>
      <NetworkMenu />
    </MockAppProviders>;

    waitFor(() => {
      const networkButton = screen.getByTestId("network-menu-button");
      const networkMenu = screen.getByTestId("network-menu");

      expect(networkMenu).not.toBeVisible();

      fireEvent.click(networkButton);
      expect(networkMenu).toBeVisible();
    });
  });

  it("should switch to the selected network when a network is clicked", () => {
    render(
      <MockAppProviders>
        <NetworkMenu />
      </MockAppProviders>
    );

    waitFor(() => {
      const networkButton = screen.getByTestId("network-menu-button");
      fireEvent.click(networkButton);
    });

    waitFor(() => {
      const networkItem = screen.getByText("Goerli");
      fireEvent.click(networkItem);
    });
  });
});
