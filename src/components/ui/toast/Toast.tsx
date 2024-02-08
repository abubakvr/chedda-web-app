import React, { useEffect, useState } from "react";

interface ToastProps {
  isOpen: boolean;
  duration?: number;
  toastMessage: string;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  duration = 10000,
  toastMessage,
}) => {
  const [toasts, setToasts] = useState([] as any[]);

  const addToast = () => {
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
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  useEffect(() => {
    if (isOpen) {
      addToast();
    }
  }, [isOpen, duration, toastMessage]);

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
            <div className="app-modal rounded-lg shadow-lg w-[291px]">
              <div className="p-6">
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
                <div
                  className="text-sm text-[#ffffff50]"
                  data-testid="toast-message"
                >
                  {toastMessage}
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
