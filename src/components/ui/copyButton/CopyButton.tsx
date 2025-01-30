import React from "react";
import Image from "next/image";
import CopyIcon from "@/assets/icon/copy-icon-white.svg";

interface CopyButtonProps {
  onClick: () => void;
  copyLabel: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick, copyLabel }) => {
  return (
    <button
      className="relative address-container hover:opacity-70"
      data-testid="copy-text-button"
      onClick={onClick}
    >
      <Image style={{ color: "" }} src={CopyIcon} width={21} alt="Copy" />
      <div className="tooltip" data-testid="address-copy-tooltip">
        {copyLabel}
      </div>
    </button>
  );
};

export default CopyButton;
