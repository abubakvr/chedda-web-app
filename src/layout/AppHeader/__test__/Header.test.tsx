import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { HeaderComponent } from "../Header";
import { Web3ReactProvider } from "@web3-react/core";
import connectors from "@/connectors";

describe("HeaderComponent", () => {
  it("renders the component", () => {
    render(
      <Web3ReactProvider connectors={connectors}>
        <HeaderComponent />
      </Web3ReactProvider>
    );

    waitFor(() => {
      const headerComponent = screen.getByTestId("header-component");
      expect(headerComponent).toBeInTheDocument();
    });
  });

  it("displays the Chedda logo", () => {
    render(
      <Web3ReactProvider connectors={connectors}>
        <HeaderComponent />
      </Web3ReactProvider>
    );

    waitFor(() => {
      const cheddaLogo = screen.getByTestId("app-logo");
      expect(cheddaLogo).toBeInTheDocument();
    });
  });

  it("displays menu items", () => {
    render(
      <Web3ReactProvider connectors={connectors}>
        <HeaderComponent />
      </Web3ReactProvider>
    );

    waitFor(() => {
      const menuItems = screen.getAllByRole("link");
      expect(menuItems).toHaveLength(4);
    });
  });

  it("displays the NetworkMenu component", () => {
    render(
      <Web3ReactProvider connectors={connectors}>
        <HeaderComponent />
      </Web3ReactProvider>
    );

    const networkMenu = screen.getByTestId("network-menu-container");
    waitFor(() => {
      expect(networkMenu).toBeInTheDocument();
    });
  });

  it("displays the ProfileMenu component", () => {
    jest.mock("@web3-react/core", () => {
      return {
        useWeb3React: () => ({
          account: null,
        }),
      };
    });
    render(
      <Web3ReactProvider connectors={connectors}>
        <HeaderComponent />
      </Web3ReactProvider>
    );

    waitFor(() => {
      const profileMenu = screen.getByTestId("profile-menu");
      expect(profileMenu).toBeInTheDocument();
    });
  });
});
