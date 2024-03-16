export interface TabInfoProps {
  allowance: string;
  exchangeRate: string;
  myStake: string;
}

export const TabInfo = ({ allowance, exchangeRate, myStake }: TabInfoProps) => {
  return (
    <div data-testid="stake-tab-info">
      <div className="flex justify-between text-sm pb-5">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="allowance-label"
        >
          Allowance
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="allowance-value"
        >
          {allowance}
        </div>
      </div>
      <div className="flex justify-between text-sm pb-5">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="exchange-rate-label"
        >
          Exchange Rate
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="exchange-rate-value"
        >
          {exchangeRate}
        </div>
      </div>
      <div className="flex justify-between text-sm pb-5">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="my-stake-label"
        >
          My Stake
        </div>
        <div
          className="flex items-center font-bold"
          data-testid="my-stake-value"
        >
          {myStake}
        </div>
      </div>
    </div>
  );
};
