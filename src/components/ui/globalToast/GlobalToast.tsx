import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import CopyIcon from "@/assets/icon/copy-icon-line.svg";
import { currentEnvironment } from "@/data/environments";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useNonce } from "@/hooks/useNonce";

export interface IToast {
  id: number;
  message: string;
  copyText?: string;
  txHash?: string;
  txPrefix?: string;
  type: "success" | "error" | "info" | "fetchError";
}

interface ToastContainerProps {
  toasts: IToast[];
  duration?: number;
  removeToast: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  duration = 10000,
  removeToast,
}) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-4 z-50">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          duration={duration}
          removeToast={removeToast}
        />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: IToast;
  duration: number;
  removeToast: (id: number) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  duration,
  removeToast,
}) => {
  const { nonce } = useNonce();

  const [sliderWidth, setSliderWidth] = useState(100);
  const [copyLabel, setCopyLabel] = useState("Copy");

  const refreshPage = () => {
    window.location.reload();
  };

  const startSlider = useCallback(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(duration - elapsed, 0);
      const percentComplete = (remaining / duration) * 100;

      setSliderWidth(percentComplete);

      if (remaining === 0) {
        clearInterval(interval);
        removeToast(toast.id);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration, toast.id, removeToast]);

  useEffect(() => {
    startSlider();
  }, [startSlider]);

  const copyAddress = useCallback((copyText: string) => {
    copyToClipboard(JSON.stringify(copyText))
      .then(() => {
        setCopyLabel("Copied");
        setTimeout(() => {
          setCopyLabel("Copy");
        }, 1500);
      })
      .catch((error) => {
        console.log("Error copying text", error);
      });
  }, []);

  return (
    <div className="animate-slide-up z-30">
      <div className="flex items-center justify-center">
        <div
          className={`${
            toast.type === "success" ? "success-toast" : "error-toast"
          } rounded-lg shadow-lg w-auto`}
        >
          <div className="p-4 md:p-5 lg:p-6 md:pb-2 lg:pb-3 pb-2 min-w-[210px] md:min-w-[270px] max-w-[290px] md:max-w-[350px]">
            <button
              className="absolute top-1 right-2 text-xl cursor-pointer text-[#CCD2E3]"
              onClick={() => removeToast(toast.id)}
              data-testid="close-toast"
            >
              &times;
            </button>
            <div
              className="text-xs md:text-sm lg:text-lg font-bold text-white"
              data-testid="toast-title"
            >
              {toast.type === "success"
                ? "Transaction Successful"
                : toast.type === "error"
                  ? "Transaction Failed"
                  : toast.type === "fetchError" && "Fetch Error"}
            </div>
            <div
              className="w-fit text-[10px] md:text-xs lg:text-sm text-[#ffffff70] flex items-start mt-2 gap-x-1"
              data-testid="toast-message"
            >
              {toast.message}
              {toast.type === "error" ? (
                <button
                  className="hover:opacity-70 relative address-container mt-0.5"
                  onClick={() => copyAddress(toast.copyText ?? "")}
                >
                  <Image
                    style={{ color: "" }}
                    src={CopyIcon}
                    alt="copy error message"
                    className="h-3 w-3 lg:h-4 lg:w-4"
                  />
                  <div className="tooltip" data-testid="address-copy-tooltip">
                    {copyLabel}
                  </div>
                </button>
              ) : (
                toast.type === "fetchError" && (
                  <button
                    onClick={() => refreshPage()}
                    className="w-max relative text-error underline text-[8px] md:text-xs lg:text-sm font-bold hover:opacity-90"
                    data-testid="buy-chedda-link"
                  >
                    refresh page.
                  </button>
                )
              )}
            </div>
            {toast.txHash && (
              <a
                href={`${toast.txPrefix ? toast.txPrefix : currentEnvironment?.txUrlPrefix}/${toast.txHash}`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] md:text-xs text-[#ffffff] flex justify-end items-center gap-x-1 mt-1 md:mt-2 opacity-50 hover:opacity-90"
                data-testid="toast-link"
              >
                <span>Review tx details</span>
                <Image
                  style={{ color: "" }}
                  src={LinkOut}
                  alt="link out"
                  className="h-3 w-3"
                />
              </a>
            )}
          </div>
          <div
            className={`h-[5px] transition-all duration-100 linear rounded-b-[16px] ${
              sliderWidth !== 0 && "rounded-br-none"
            } ${toast.type === "success" ? "bg-success" : "bg-error"}`}
            style={{ width: `${sliderWidth}%` }}
            nonce={nonce}
            data-testid="slider"
          ></div>
        </div>
      </div>
    </div>
  );
};
