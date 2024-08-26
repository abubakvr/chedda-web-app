import { NonceProvider } from "@/contexts/NonceContext";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IToast, ToastContainer, ToastItem } from "../GlobalToast";

jest.mock("../../../../utils/copyToClipboard", () => ({
  copyToClipboard: jest.fn(),
}));

describe("ToastContainer", () => {
  const mockToasts: IToast[] = [
    {
      id: 1,
      message: "Success message",
      copyText: "0x123456789",
      txHash: "0x123456789",
      txPrefix: "https://etherscan.io/tx",
      type: "success",
    },
    {
      id: 2,
      message: "Error message",
      copyText: "0x987654321",
      type: "error",
    },
    {
      id: 3,
      message: "Fetch error message",
      type: "fetchError",
    },
  ];

  beforeEach(() => {
    (copyToClipboard as jest.Mock).mockResolvedValue("0x12345");
  });

  test("renders toast items correctly", async () => {
    const mockRemoveToast = jest.fn();
    render(
      <NonceProvider nonce="0x90">
        <ToastContainer toasts={mockToasts} removeToast={mockRemoveToast} />
      </NonceProvider>
    );

    const toastTitles = screen.getAllByTestId("toast-title");
    await waitFor(() => {
      expect(toastTitles).toHaveLength(mockToasts.length);
    });

    toastTitles.forEach((title, index) => {
      expect(title).toHaveTextContent(
        mockToasts[index].type === "success"
          ? "Transaction Successful"
          : mockToasts[index].type === "error"
            ? "Transaction Failed"
            : "Fetch Error"
      );
    });

    const toastMessages = screen.getAllByTestId("toast-message");
    await waitFor(() => {
      expect(toastMessages).toHaveLength(mockToasts.length);
    });

    toastMessages.forEach(async (message, index) => {
      await waitFor(() => {});
      expect(message).toHaveTextContent(mockToasts[index].message);
    });

    const addressCopyTooltips = screen.getAllByTestId("address-copy-tooltip");
    await waitFor(() => {
      expect(addressCopyTooltips).toHaveLength(
        mockToasts.filter((toast) => toast.type === "error").length
      );
    });

    addressCopyTooltips.forEach(async (tooltip, index) => {
      await waitFor(() => {
        expect(tooltip).toHaveTextContent("Copy");
        fireEvent.click(tooltip);
        expect(tooltip).toHaveTextContent("Copy");
      });
    });

    const buyCheddaLinks = screen.getAllByTestId("buy-chedda-link");

    await waitFor(() => {
      expect(buyCheddaLinks).toHaveLength(
        mockToasts.filter((toast) => toast.type === "fetchError").length
      );
    });

    const transactionLinks = screen.getAllByTestId("toast-link");

    await waitFor(() => {
      expect(transactionLinks).toHaveLength(
        mockToasts.filter((toast) => toast.txHash).length
      );
    });
  });

  test("removes toast after duration", async () => {
    const mockRemoveToast = jest.fn();
    render(
      <NonceProvider nonce="0x90">
        <ToastContainer
          toasts={mockToasts}
          duration={1000}
          removeToast={mockRemoveToast}
        />
      </NonceProvider>
    );

    await waitFor(
      () => {
        expect(mockRemoveToast).toHaveBeenCalledTimes(mockToasts.length);
      },
      { timeout: 2000 }
    );
  });
});

describe("ToastItem", () => {
  test("renders toast item correctly", async () => {
    const mockToast: IToast = {
      id: 1,
      message: "Success message",
      copyText: "0x123456789",
      txHash: "0x123456789",
      txPrefix: "https://etherscan.io/tx",
      type: "success",
    };
    const mockRemoveToast = jest.fn();
    render(
      <NonceProvider nonce="0x90">
        <ToastItem
          toast={mockToast}
          duration={1000}
          removeToast={mockRemoveToast}
        />
      </NonceProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("toast-title")).toHaveTextContent(
        "Transaction Successful"
      );
      expect(screen.getByTestId("toast-message")).toHaveTextContent(
        mockToast.message
      );
      expect(screen.getByTestId("toast-link")).toBeInTheDocument();
      expect(screen.getByTestId("slider")).toBeInTheDocument();
    });
  });
});
