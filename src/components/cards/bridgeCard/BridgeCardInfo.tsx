export interface BridgeCardInfoProps {
  amountToreceive: string;
  gasFee: string;
  transferTime: string;
  destination: string;
}

export const BridgeCardInfo = ({
  amountToreceive,
  gasFee,
  transferTime,
  destination,
}: BridgeCardInfoProps) => {
  return (
    <div data-testid="bridge-card-info">
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm pb-4 md:pb-[18px] lg:pb-5">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="receive-label"
        >
          You will receive on {destination}
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="receive-value"
        >
          {amountToreceive}
        </div>
      </div>
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm pb-4 md:pb-[18px] lg:pb-5">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="gas-fee-label"
        >
          Gas on destination
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="gas-fee-value"
        >
          {gasFee}
        </div>
      </div>
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="transfer-time-label"
        >
          Estimated transfer time
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="transfer-time-value"
        >
          {transferTime}
        </div>
      </div>
    </div>
  );
};
