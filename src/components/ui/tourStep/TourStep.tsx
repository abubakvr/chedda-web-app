import Image from "next/image";
import React from "react";
import infoIcon from "@/assets/icon/info-icon-orange.svg";
import closeIcon from "@/assets/icon/close-icon-white.svg";

interface TourStepProps {
  closeModal: () => void;
  position: "top" | "bottom" | "left" | "right";
}

const TourStep: React.FC<TourStepProps> = ({ closeModal, position }) => {
  return (
    <div
      className={`relative p-4 bg-[#232357] text-white rounded-lg shadow-lg w-60`}
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Image src={infoIcon} alt="info icon" />
          <p className="font-semibold text-lg">Referral Guide</p>
        </div>
        <button onClick={() => closeModal()}>
          <Image src={closeIcon} alt="close icon" className="w-3 h-3" />
        </button>
      </div>
      <p className="mt-3 text-sm">
        Click your Profile to Copy your referral Link.
      </p>

      {/* Arrow */}
      <div
        className={`absolute w-0 h-0 border-transparent border-solid`}
        style={{
          ...(position === "top" && {
            bottom: "100%",
            left: "80%",
            transform: "translateX(-50%)",
            borderWidth: "10px",
            borderBottomColor: "#232357", // Gray-800 color
          }),
          ...(position === "bottom" && {
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            borderWidth: "10px",
            borderTopColor: "#232357",
          }),
          ...(position === "left" && {
            right: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            borderWidth: "10px",
            borderRightColor: "#232357",
          }),
          ...(position === "right" && {
            left: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            borderWidth: "10px",
            borderLeftColor: "#232357",
          }),
        }}
      />
    </div>
  );
};

export default TourStep;
