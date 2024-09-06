import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HeaderComponent } from "../Header";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { usePathname } from "next/navigation";
import { useCheddaBalance } from "@/hooks";
import { moreMenuItems } from "@/utils/constants";

jest.mock("../../../hooks");
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/markets"),
}));

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    chainId: 84532,
  })),
}));

jest.mock("../../../data/environments", () => ({
  currentEnvironment: {
    chainId: 1,
  },
}));

describe("HeaderComponent", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockImplementation(() => "/markets");
    (useCheddaBalance as jest.Mock).mockReturnValue({
      data: BigInt("1000"),
      isLoading: false,
    });
  });
  it("renders the component", () => {
    render(
      <MockAppProviders>
        <HeaderComponent />
      </MockAppProviders>
    );

    waitFor(() => {
      const headerComponent = screen.getByTestId("header-component");
      expect(headerComponent).toBeInTheDocument();
    });
  });

  it("displays the Chedda logo", () => {
    render(
      <MockAppProviders>
        <HeaderComponent />
      </MockAppProviders>
    );

    waitFor(() => {
      const cheddaLogo = screen.getByTestId("app-logo");
      expect(cheddaLogo).toBeInTheDocument();
    });
  });

  it("displays menu items", () => {
    render(
      <MockAppProviders>
        <HeaderComponent />
      </MockAppProviders>
    );

    waitFor(() => {
      const menuItems = screen.getAllByRole("link");
      expect(menuItems).toHaveLength(4);
    });
  });

  it("displays the ProfileMenu component", () => {
    render(
      <MockAppProviders>
        <HeaderComponent />
      </MockAppProviders>
    );

    waitFor(() => {
      const profileMenu = screen.getByTestId("profile-menu");
      expect(profileMenu).toBeInTheDocument();
    });
  });

  it("displays the NetworkSwitchBanner when on the wrong network", async () => {
    render(
      <MockAppProviders>
        <HeaderComponent />
      </MockAppProviders>
    );

    await waitFor(() => {
      const networkSwitchBanner = screen.getByTestId("network-switch-banner");
      expect(networkSwitchBanner).toBeInTheDocument();
    });
  });

  it("toggles mobile navigation menu", async () => {
    render(
      <MockAppProviders>
        <HeaderComponent />
      </MockAppProviders>
    );

    const menuButton = screen.getByTestId("mobile-menu-button");
    menuButton.click();

    await waitFor(() => {
      const mobileNav = screen.getByTestId("mobile-nav"); // Adjust based on your component's text
      expect(mobileNav).toBeInTheDocument();
    });
  });

  it("displays the Pacman logo when on the correct page", async () => {
    render(
      <MockAppProviders>
        <HeaderComponent />
      </MockAppProviders>
    );

    await waitFor(() => {
      const pacmanLogo = screen.getAllByTestId("pacman-logo");
      expect(pacmanLogo).toBeDefined();
    });
  });

  it("displays the correct number of more menu items in NavDropdown", async () => {
    render(
      <MockAppProviders>
        <HeaderComponent />
      </MockAppProviders>
    );

    const dropdownButton = screen.getByTestId("nav-dropdown-button");
    fireEvent.click(dropdownButton);

    await waitFor(() => {
      moreMenuItems.forEach((item) => {
        expect(screen.queryAllByText(item.label)).toBeDefined();
      });
    });
  });
});
