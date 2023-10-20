import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { NetworkMenu } from "../NetworkMenu";
import { Web3ReactProvider } from "@web3-react/core";
import connectors from "@/connectors";

describe("NetworkMenu", () => {
  it("should open the network menu when the button is clicked", () => {
    <Web3ReactProvider connectors={connectors}>
      <NetworkMenu />
    </Web3ReactProvider>;

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
      <Web3ReactProvider connectors={connectors}>
        <NetworkMenu />
      </Web3ReactProvider>
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
