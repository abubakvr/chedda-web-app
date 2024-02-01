// Button.tsx

import React, { FC, MouseEvent, ReactNode } from "react";
import { LoadingIcon } from "./LoadingIcon";

interface ButtonProps {
  children: ReactNode;
  type: "primary" | "secondary";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: "small" | "large";
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type,
  className,
  size,
  isLoading,
  disabled,
}) => (
  <button
    data-testid="custom-button"
    className={`${className} ${
      type === "primary"
        ? "primary-button"
        : type === "secondary"
          ? "secondary-button button-gradient-text"
          : ""
    } w-full text-center ${
      size === "large" ? "h-[56px]" : size === "small" ? "h-11" : ""
    } items-center rounded-lg text-white text-opacity-100 ${
      isLoading || disabled
        ? "opacity-50 hover:opacity-50"
        : "hover:opacity-80 "
    } uppercase font-bold text-xl flex justify-center gap-x-3 `}
    onClick={onClick}
    disabled={isLoading || disabled}
  >
    <div data-testid="loading-button-icon" role="status">
      {isLoading && <LoadingIcon />}
    </div>
    {children}
  </button>
);
