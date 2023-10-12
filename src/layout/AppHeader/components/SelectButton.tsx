import { FC } from "react";
import Image from "next/image";

interface ConnectButtonProps {
  label: string;
  image: any;
  onClick: () => void;
  loading: boolean;
}

const SelectButton: FC<ConnectButtonProps> = ({ label, image, onClick }) => {
  return (
    <button
      className="w-full flex items-center justify-between cursor-pointer p-4 mb-3 rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
      key={label}
      onClick={onClick}
    >
      <div className="font-semibold text-xl pl-5">{label}</div>
      <Image src={image} width={32} height={32} alt="web3-wallet" />
    </button>
  );
};

export default SelectButton;
