import { ToastContainer } from "@/components/ui";
import React, { createContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "fetchError";

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  copyText?: string;
  txHash?: string;
  txPrefix?: string;
}

interface Toast extends ToastOptions {
  id: number;
  type: ToastType; // Overriding to make it required
}

type AddToastType = ({
  message,
  type,
  duration,
  copyText,
  txHash,
  txPrefix,
}: ToastOptions) => void;

export interface ToastContextType {
  addToast: AddToastType;
}

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback(
    (id: number) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    },
    [setToasts]
  );

  const addToast = useCallback(
    ({
      message,
      type = "success",
      duration = 10000,
      copyText,
      txHash,
      txPrefix,
    }: ToastOptions) => {
      const id = Date.now();

      if (type === "fetchError") {
        setToasts([{ id, message, type, copyText, txHash, txPrefix }]);
      } else {
        setToasts((prevToasts) => [
          ...prevToasts,
          { id, message, type, copyText, txHash, txPrefix },
        ]);
      }

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
