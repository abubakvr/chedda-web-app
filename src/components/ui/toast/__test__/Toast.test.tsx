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

describe("Toast Component", () => {
  it("renders Toast component correctly and closes after duration", async () => {
    const onCloseMock = jest.fn();

    render(
      <Toast
        isOpen={true}
        onClose={onCloseMock}
        duration={1000}
        toastMessage="Test Message"
      />
    );

    // Check initial rendering
    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "Transaction Successful"
    );
    expect(screen.getByTestId("modal-message")).toHaveTextContent(
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
      expect(onCloseMock).toHaveBeenCalledTimes(1);
      expect(slider).toHaveStyle("width: 0% ");
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onClose when close button is clicked", async () => {
    const onCloseMock = jest.fn();

    render(
      <Toast
        isOpen={true}
        onClose={onCloseMock}
        duration={5000}
        toastMessage="Test Message"
      />
    );

    // Click close button
    act(() => {
      fireEvent.click(screen.getByTestId("close-toast"));
    });

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it("does not call onClose when not open", async () => {
    const onCloseMock = jest.fn();

    render(
      <Toast
        isOpen={false}
        onClose={onCloseMock}
        duration={5000}
        toastMessage="Test Message"
      />
    );

    // Fast-forward time to trigger the interval
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });
});
