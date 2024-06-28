import Image from "next/image";
import Link from "next/link";
import bridgeLines from "@/assets/svg/bridge-section-lines.svg";
import bridgeVector from "@/assets/images/bridge-vector.png";
import arrowForward from "@/assets/icon/arrow-forward.svg";
import gradientArrowForward from "@/assets/icon/gradient-arrow-forward.svg";
import { BRIDGE_DOC_URL } from "@/utils/constants";

export const BridgeSection = () => {
  return (
    <div
      className="pool-card text-white rounded-lg shadow-lg flex justify-center items-center relative"
      data-testid="bridge-assets"
    >
      <div
        className="absolute left-0 flex h-full"
        data-testid="bridge-lines-left"
      >
        <Image src={bridgeLines} alt="networks" />
      </div>
      <div className="flex justify-center relative w-3/5">
        <div
          className="absolute px-8 py-12 flex flex-col items-center"
          data-testid="bridge-content"
        >
          <h2 className="text-2xl font-bold mb-4" data-testid="bridge-title">
            Bridge assets from other networks to use on CHEDDA
          </h2>
          <div
            className="list-disc list-inside text-sm text-[#FFFFFF50] mb-6"
            data-testid="bridge-description"
          >
            <div className="flex text-sm space-x-3 text-center">
              Bridged assets can be supplied or as collateral in CHEDDA lending
              pools and
              <br /> can be bridged back at any time.
            </div>
          </div>
          <div className="flex space-x-4" data-testid="bridge-links">
            <Link
              href={"/bridge"}
              className="modal-button text-white rounded-lg py-2 px-4 text-sm font-bold hover:opacity-80 flex items-center gap-x-1.5"
              data-testid="go-to-bridge"
            >
              <span>Go to Bridge</span>
              <Image src={arrowForward} alt="arrow forward" />
            </Link>
            <a
              href={BRIDGE_DOC_URL}
              target="_blank"
              className="secondary-button button-gradient-text flex gap-x-1.5 items-center text-white rounded-lg py-2 px-4 text-center text-sm font-bold hover:opacity-80"
              data-testid="learn-more"
            >
              <span>Learn more</span>
              <Image src={gradientArrowForward} alt="gradient arrow" />
            </a>
          </div>
        </div>
        <div
          className="flex items-center justify-center"
          data-testid="bridge-vector"
        >
          <Image src={bridgeVector} alt="bridge vector" />
        </div>
      </div>
      <div
        className="absolute right-0 flex  h-full"
        data-testid="bridge-lines-right"
      >
        <Image
          src={bridgeLines}
          alt="networks"
          className="transform scale-x-[-1]"
        />
      </div>
    </div>
  );
};
