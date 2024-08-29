import { NonceProvider } from "@/contexts/NonceContext";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { Toast } from "../Toast";

jest.useFakeTimers();
jest.mock("ethers");
jest.mock("../../../../hooks");

describe("Toast Component", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <NonceProvider nonce="0x90">
        <Toast isOpen={false} toastMessage="Test Message" />
      </NonceProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it("renders Toast component correctly and closes after duration", async () => {
    render(
      <NonceProvider nonce="0x90">
        <Toast isOpen={true} duration={1000} toastMessage="Test Message" />
      </NonceProvider>
    );

    // Check initial rendering
    expect(screen.getByTestId("toast-title")).toHaveTextContent(
      "Transaction Successful"
    );
    expect(screen.getByTestId("toast-message")).toHaveTextContent(
      "Test Message"
    );
    expect(screen.getByTestId("close-toast")).toBeInTheDocument();

    const slider = screen.getByTestId("slider");
    expect(slider).toHaveStyle("width: 100% ");

    // Fast-forward time to trigger the interval
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(slider).toHaveStyle("width: 100% ");
    });
  });

  it("calls onClose when close button is clicked", async () => {
    const { queryByText } = render(
      <NonceProvider nonce="0x90">
        <Toast isOpen={true} duration={5000} toastMessage="Test Message" />
      </NonceProvider>
    );

    // Click close button
    act(() => {
      fireEvent.click(screen.getByTestId("close-toast"));
    });

    await waitFor(() => {
      expect(queryByText("Transaction Successful")).not.toBeInTheDocument();
      expect(queryByText("Test Message")).not.toBeInTheDocument();
    });
  });

  it("displays toast when isOpen is true", async () => {
    const { getByText } = render(
      <NonceProvider nonce="0x90">
        <Toast isOpen={true} toastMessage="Test Message" />
      </NonceProvider>
    );

    await waitFor(() => {
      expect(getByText("Transaction Successful")).toBeInTheDocument();
      expect(getByText("Test Message")).toBeInTheDocument();
    });
  });
});
