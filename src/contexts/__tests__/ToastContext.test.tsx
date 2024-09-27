import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  ToastProvider,
  ToastContextType,
  ToastContext,
} from "@/contexts/ToastContext";
import { useToast } from "@/hooks/useToast";

// Mock ToastContainer
jest.mock("../../components/ui", () => ({
  ToastContainer: jest.fn(() => <div data-testid="toast-container"></div>),
}));

jest.mock("@next/third-parties/google");

// Test Component to use the ToastContext
const TestComponent: React.FC = () => {
  const { addToast } = useToast();

  return (
    <div>
      <button
        onClick={() => addToast({ message: "Success Toast", type: "success" })}
        data-testid="add-toast-button"
      >
        Add Toast
      </button>
    </div>
  );
};

describe("ToastProvider", () => {
  it("renders children", () => {
    render(
      <ToastProvider>
        <div data-testid="child">Test Child</div>
      </ToastProvider>
    );

    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
  });

  it("provides addToast function", () => {
    let contextValue: ToastContextType | undefined;

    const TestConsumer: React.FC = () => {
      contextValue = React.useContext(ToastContext);
      return null;
    };

    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    expect(contextValue).toBeDefined();
    expect(contextValue!.addToast).toBeInstanceOf(Function);
  });

  it("adds a toast when addToast is called", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const addToastButton = screen.getByTestId("add-toast-button");

    act(() => {
      fireEvent.click(addToastButton);
    });

    const toastContainer = screen.getByTestId("toast-container");
    expect(toastContainer).toBeInTheDocument();
  });
});
