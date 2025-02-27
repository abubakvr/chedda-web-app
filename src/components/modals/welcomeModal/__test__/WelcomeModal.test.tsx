import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { WelcomeModal } from "../WelcomeModal";
import { WalletConnect } from "@web3-react/walletconnect-v2";

// Mock useLocalStorageGet hook
jest.mock("../../../../hooks", () => ({
  useLocalStorageGet: jest.fn(),
  useSwitchChain: jest.fn(),
}));

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 1,
    isActivating: false,
  })),
}));

jest.mock("@next/third-parties/google");
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/markets"),
}));

// Mock localStorage
const mockSetItem = jest.fn();

beforeAll(() => {
  // Mock localStorage.setItem
  Object.defineProperty(window, "localStorage", {
    value: {
      setItem: mockSetItem,
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

describe("WelcomeModal Component", () => {
  beforeEach(() => {
    // Clear previous calls before each test
    mockSetItem.mockClear();
    jest
      .requireMock("../../../../hooks")
      .useLocalStorageGet.mockReturnValue(null); // Default to no prior user acceptance
  });

  test("renders the modal correctly when userAcceptance is not set", () => {
    render(<WelcomeModal />);

    // Modal should be visible
    expect(screen.getByTestId("welcomeModal")).toHaveClass(
      "opacity-100 visible"
    );

    // Check for modal content
    expect(screen.getByText(/Welcome to CHEDDA/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /I have read, understood, and agree to the terms and conditions/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/I confirm that the funds/i)).toBeInTheDocument();
    expect(
      screen.getByText(/I acknowledge that there is a risk/i)
    ).toBeInTheDocument();

    // The "Accept" button should be initially disabled
    expect(screen.getByRole("button", { name: /accept/i })).toBeDisabled();
  });

  test("does not render the modal if userAcceptance is set to 'accepted'", () => {
    // Simulate user acceptance being stored
    jest
      .requireMock("../../../../hooks")
      .useLocalStorageGet.mockReturnValue("accepted");

    render(<WelcomeModal />);

    // Modal should not be visible
    expect(screen.getByTestId("welcomeModal")).toHaveClass(
      "opacity-0 invisible"
    );
  });

  test("enables 'Accept' button when all checkboxes are checked", () => {
    render(<WelcomeModal />);

    // Checkboxes should be initially unchecked
    expect(screen.getByTestId("terms-checkbox")).not.toBeChecked();
    expect(screen.getByTestId("funds-checkbox")).not.toBeChecked();
    expect(screen.getByTestId("risk-checkbox")).not.toBeChecked();

    // Simulate checking all the checkboxes
    fireEvent.click(screen.getByTestId("terms-checkbox"));
    fireEvent.click(screen.getByTestId("funds-checkbox"));
    fireEvent.click(screen.getByTestId("risk-checkbox"));

    // The "Accept" button should now be enabled
    expect(screen.getByRole("button", { name: /accept/i })).toBeEnabled();
  });

  test("closes modal and saves 'accepted' to localStorage when 'Accept' is clicked", () => {
    render(<WelcomeModal />);

    // Simulate checking all the checkboxes
    fireEvent.click(screen.getByTestId("terms-checkbox"));
    fireEvent.click(screen.getByTestId("funds-checkbox"));
    fireEvent.click(screen.getByTestId("risk-checkbox"));

    // Click the "Accept" button
    fireEvent.click(screen.getByRole("button", { name: /accept/i }));

    // Check if localStorage.setItem was called with the correct value
    expect(mockSetItem).toHaveBeenCalledWith("userAcceptance", "accepted");

    // Modal should now be invisible
    expect(screen.getByTestId("welcomeModal")).toHaveClass(
      "opacity-0 invisible"
    );
  });
});
