import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import { useEnvironment } from "@/hooks";

interface ToastProps {
  isOpen: boolean;
  txHash?: string;
  duration?: number;
  toastMessage: string;
}

export const Toast: React.FC<ToastProps> = ({
  duration = 10000,
  isOpen,
  txHash,
  toastMessage,
}) => {
  const [toasts, setToasts] = useState([] as any[]);
  const { currentEnvironment } = useEnvironment();

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
            toast.isOpen ? "block" : "hidden"
          } overflow-y-auto z-30`}
        >
          <div className="flex items-center justify-center">
            <div className="tx-toast rounded-lg shadow-lg w-auto">
              <div className="p-6 pb-4">
                <button
                  className="absolute top-1 right-2 text-xl cursor-pointer text-[#CCD2E3]"
                  onClick={() => removeToast(toast.id)}
                  data-testid="close-toast"
                >
                  &times;
                </button>
                <div className="text-lg font-bold" data-testid="toast-title">
                  Transaction Successful
                </div>
                <div>
                  <div
                    className="text-sm text-[#ffffff50]"
                    data-testid="toast-message"
                  >
                    {toastMessage}
                  </div>
                  {txHash && (
                    <a
                      href={`${currentEnvironment?.txUrlPrefix}/${txHash}`}
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
                } bg-green-600`}
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
