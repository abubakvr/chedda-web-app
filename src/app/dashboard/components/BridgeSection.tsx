import Link from "next/link";
import bridgeLines from "@/assets/svg/bridge-section-lines.svg";
import bridgeVector from "@/assets/images/bridge-vector.png";
import arrowForward from "@/assets/icon/arrow-forward.svg";
import gradientArrowForward from "@/assets/icon/gradient-arrow-forward.svg";
import { BRIDGE_DOC_URL } from "@/utils/constants";
import Image from "next/image";

export const BridgeSection = () => {
  return (
    <div
      className="pool-card text-white rounded-lg shadow-lg flex justify-center items-center relative h-44 md:h-48 xl:h-56"
      data-testid="bridge-assets"
    >
      <div
        className="absolute left-0 flex h-full"
        data-testid="bridge-lines-left"
      >
        <Image style={{ color: "" }} src={bridgeLines} alt="networks" />
      </div>
      <div className="flex justify-center items-center relative w-full md:w-4/5 lg:w-3/5">
        <div
          className="absolute top-[50] bottom-[50] px-4 lg:px-8 md:py-6 lg:py-12 flex flex-col items-center"
          data-testid="bridge-content"
        >
          <h2
            className="text-sm md:text-lg lg:text-xl xl:text-2xl font-bold mb-2 lg:mb-4 text-center"
            data-testid="bridge-title"
          >
            Bridge assets from other networks to use on CHEDDA
          </h2>
          <div
            className="list-disc list-inside text-sm text-[#FFFFFF70] mb-4 lg:mb-6"
            data-testid="bridge-description"
          >
            <div className="flex text-[8px] md:text-[10px] text-xs xl:text-sm space-x-3 text-center leading-3">
              Bridged assets can be supplied or as collateral in CHEDDA lending
              pools and
              <br className="hidden sm:flex" /> can be bridged back at any time.
            </div>
          </div>
          <div className="flex space-x-4" data-testid="bridge-links">
            <Link
              href={"/bridge"}
              className="modal-button text-white rounded-md lg:rounded-lg px-3 lg:py-2 lg:px-4 text-[8px] lg:text-sm font-bold hover:opacity-80 h-7 lg:h-9 flex items-center gap-x-1.5"
              data-testid="go-to-bridge"
            >
              <span>Go to Bridge</span>
              <Image
                style={{ color: "" }}
                src={arrowForward}
                alt="arrow forward"
              />
            </Link>
            <a
              href={BRIDGE_DOC_URL}
              target="_blank"
              className="secondary-button button-gradient-text flex gap-x-1.5 items-center text-white h-7 lg:h-9 rounded-lg px-3 lg:py-2 lg:px-4 text-center text-[8px] lg:text-sm font-bold hover:opacity-80"
              data-testid="learn-more"
            >
              <span>Learn more</span>
              <Image
                style={{ color: "" }}
                src={gradientArrowForward}
                alt="gradient arrow"
              />
            </a>
          </div>
        </div>
        <div
          className="flex items-center justify-center"
          data-testid="bridge-vector"
        >
          <Image
            style={{ color: "" }}
            src={bridgeVector}
            alt="bridge vector"
            className="h-44 md:h-4 xl:h-56"
          />
        </div>
      </div>
      <div
        className="absolute right-0 flex  h-full"
        data-testid="bridge-lines-right"
      >
        <Image
          style={{ color: "" }}
          src={bridgeLines}
          alt="networks"
          className="transform scale-x-[-1]"
        />
      </div>
    </div>
  );
};
