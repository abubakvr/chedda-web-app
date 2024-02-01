import React, { useEffect, useState } from "react";

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  duration: number;
  toastMessage: string;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  duration,
  toastMessage,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    let startTime = Date.now();

    const updateSlider = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(duration - elapsed, 0);
      const percentComplete = 100 - (remaining / duration) * 100;

      setSliderWidth(percentComplete);
    };

    let timer = setInterval(updateSlider, 50);

    setTimeout(() => {
      onClose();
      clearInterval(timer);
      setSliderWidth(0);
    }, duration);

    return () => {
      setSliderWidth(0);
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, [duration, isOpen]);

  return (
    <div
      data-testid="toast-container"
      className={`fixed bottom-5 right-5 ${
        isOpen ? "block" : "hidden"
      } overflow-y-auto z-30`}
    >
      <div className="flex items-center justify-center">
        <div className="app-modal rounded-lg shadow-lg w-[291px]">
          <div className="p-6">
            <button
              className="absolute top-1 right-2 text-xl cursor-pointer text-[#CCD2E3]"
              onClick={onClose}
              data-testid="close-toast"
            >
              &times;
            </button>
            <div className="text-lg font-bold" data-testid="modal-title">
              Transaction Successful
            </div>
            <div
              className="text-sm text-[#ffffff50]"
              data-testid="modal-message"
            >
              {toastMessage}
            </div>
          </div>
          <div
            className={`h-[5px] transition-all rounded-b-[16px] ${
              sliderWidth !== 100 && "rounded-br-none "
            } bg-green-600`}
            style={{ width: `${sliderWidth}%` }}
            data-testid="slider"
          ></div>
        </div>
      </div>
    </div>
  );
};
