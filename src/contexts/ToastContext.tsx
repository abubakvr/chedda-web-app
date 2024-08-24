import { ToastContainer } from "@/components/ui";
import React, { createContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "fetchError";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  copyText?: string;
  txHash?: string;
  txPrefix?: string;
}

type AddToastType = ({
  message,
  type,
  duration,
  copyText,
  txHash,
  txPrefix,
}: {
  message: string;
  type?: ToastType;
  duration?: number;
  copyText?: string;
  txHash?: string;
  txPrefix?: string;
}) => void;

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
    }: {
      message: string;
      type?: ToastType;
      duration?: number;
      copyText?: string;
    }) => {
      const id = Date.now();

      if (type === "fetchError") {
        setToasts([{ id, message, type, copyText }]);
      } else {
        setToasts((prevToasts) => [
          ...prevToasts,
          { id, message, type, copyText },
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
