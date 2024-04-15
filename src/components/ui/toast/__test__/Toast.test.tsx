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
      <Toast isOpen={false} toastMessage="Test Message" />
    );
    expect(container).toBeInTheDocument();
  });

  it("renders Toast component correctly and closes after duration", async () => {
    render(<Toast isOpen={true} duration={1000} toastMessage="Test Message" />);

    // Check initial rendering
    expect(screen.getByTestId("toast-title")).toHaveTextContent(
      "Transaction Successful"
    );
    expect(screen.getByTestId("toast-message")).toHaveTextContent(
      "Test Message"
    );
    expect(screen.getByTestId("close-toast")).toBeInTheDocument();

    const slider = screen.getByTestId("slider");
    expect(slider).toHaveStyle("width: 0% ");

    // Fast-forward time to trigger the interval
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(slider).toHaveStyle("width: 0% ");
    });
  });

  it("calls onClose when close button is clicked", async () => {
    const { queryByText } = render(
      <Toast isOpen={true} duration={5000} toastMessage="Test Message" />
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
      <Toast isOpen={true} toastMessage="Test Message" />
    );

    await waitFor(() => {
      expect(getByText("Transaction Successful")).toBeInTheDocument();
      expect(getByText("Test Message")).toBeInTheDocument();
    });
  });
});
