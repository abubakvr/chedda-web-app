import React from "react";
import { renderHook } from "@testing-library/react";
import { ToastProvider } from "@/contexts/ToastContext";
import { useToast } from "@/hooks/useToast";

// Mock ToastContainer for simplicity
jest.mock("../../components/ui", () => ({
  ToastContainer: () => <div data-testid="toast-container"></div>,
}));

describe("useToast", () => {
  it("provides addToast function when used within ToastProvider", () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    expect(typeof result.current.addToast).toBe("function");
  });
});
