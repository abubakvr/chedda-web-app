import { render, screen, waitFor } from "@testing-library/react";
import { HeaderComponent } from "../Header";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { usePathname } from "next/navigation";
import { useCheddaBalance } from "@/hooks";
import { BigNumber } from "ethers";

jest.mock("../../../hooks");
jest.mock("next/navigation");
describe("HeaderComponent", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockImplementation(() => "/home");
    (useCheddaBalance as jest.Mock).mockReturnValue({
      data: BigNumber.from("1000"),
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
    jest.mock("@web3-react/core", () => {
      return {
        useWeb3React: () => ({
          account: null,
        }),
      };
    });
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
});
