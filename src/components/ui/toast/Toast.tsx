import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import CopyIcon from "@/assets/icon/copy-icon-line.svg";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { currentEnvironment } from "@/data/environments";

interface ToastProps {
  status?: "success" | "failed";
  isOpen: boolean;
  txHash?: string | null;
  copyText?: string | null;
  duration?: number;
  txPrefix?: string;
  toastMessage: string;
}

export const Toast: React.FC<ToastProps> = ({
  status = "success",
  duration = 10000,
  isOpen,
  txHash,
  toastMessage,
  txPrefix,
  copyText,
}) => {
  const [toasts, setToasts] = useState([] as any[]);
  const [copyLabel, setCopyLabel] = useState("Copy");

  const addToast = useCallback(() => {
    const newToast = {
      id: Date.now(),
      isOpen: true,
      sliderWidth: 0,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    let startTime = Date.now();

    const updateSlider = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(duration - elapsed, 0);
      const percentComplete = 100 - (remaining / duration) * 100;

      setToasts((prevToasts) =>
        prevToasts.map((t) =>
          t.id === newToast.id ? { ...t, sliderWidth: percentComplete } : t
        )
      );
    };

    let timer = setInterval(updateSlider, 50);

    setTimeout(() => {
      removeToast(newToast.id);
      clearInterval(timer);
    }, duration);
  }, [duration]);

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  const copyAddress = () => {
    copyToClipboard(JSON.stringify(copyText) ?? "")
      .then(() => {
        setCopyLabel("Copied");
        setTimeout(() => {
          setCopyLabel("Copy");
        }, 1500);
      })
      .catch((error) => {
        console.log("error copying text", error);
      });
  };

  useEffect(() => {
    if (isOpen) {
      addToast();
    }
  }, [isOpen, duration, toastMessage, addToast]);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`fixed bottom-5 right-5 ${
            toast.isOpen ? "animate-slide-up" : "hidden"
          } z-30`}
        >
          <div className="flex items-center justify-center">
            <div
              className={`${status === "success" ? "success-toast" : "error-toast"} rounded-lg shadow-lg w-auto`}
            >
              <div className="p-6 pb-4 max-w-[350px] min-w-[270px]">
                <button
                  className="absolute top-1 right-2 text-xl cursor-pointer text-[#CCD2E3]"
                  onClick={() => removeToast(toast.id)}
                  data-testid="close-toast"
                >
                  &times;
                </button>
                <div
                  className="text-lg font-bold text-white"
                  data-testid="toast-title"
                >
                  {status === "success"
                    ? "Transaction Successful"
                    : "Transaction Failed"}
                </div>
                <div>
                  <div
                    className="text-sm text-[#ffffff50] flex items-center gap-x-1"
                    data-testid="toast-message"
                  >
                    {status === "success" ? toastMessage : `${toastMessage}`}
                    {status === "failed" && (
                      <div className="w-4 h-4">
                        <button
                          className="hover:opacity-70 relative address-container w-4 h-4"
                          onClick={copyAddress}
                        >
                          <Image
                            src={CopyIcon}
                            alt="copy error message"
                            className="h-4 w-4"
                          />
                          <div
                            className="tooltip"
                            data-testid="address-copy-tooltip"
                          >
                            {copyLabel}
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                  {txHash && (
                    <a
                      href={`${txPrefix ? txPrefix : currentEnvironment?.txUrlPrefix}/${txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#ffffff] flex justify-end items-center gap-x-1 mt-2 opacity-50 hover:opacity-90"
                      data-testid="toast-link"
                    >
                      Review tx details
                      <Image src={LinkOut} alt="link out" className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
              <div
                className={`h-[5px] transition-all rounded-b-[16px] ${
                  toast.sliderWidth !== 100 && "rounded-br-none "
                } ${status === "success" ? "bg-success" : "bg-error"}`}
                style={{ width: `${toast.sliderWidth}%` }}
                data-testid="slider"
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
