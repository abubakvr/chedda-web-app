import { ISummaryStats } from "@/utils/types";

interface SummaryCardProps {
  stats: ISummaryStats[] | undefined;
  isLoading: boolean;
}

export const SummaryCard = ({ stats, isLoading }: SummaryCardProps) => {
  if (isLoading) {
    return (
      <div
        data-testid="loading-element"
        className="w-max flex-grow summary-card rounded-lg text-white p-4 sm:p-6 xl:p-8 flex flex-col justify-center"
      >
        <div className="flex flex-col gap-y-1">
          <div
            data-testid="summary-title"
            className="text-white opacity-50 font-open-sans text-xs font-semibold leading-6 tracking-wide"
          >
            <div className="flex flex-col justify-center text-sm md:col-span-1 animate-pulse">
              <div className="flex flex-col">
                <div className="h-6 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-24"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-sm md:col-span-1 animate-pulse">
              <div className="flex flex-col">
                <div className="h-6 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="summary-card-container"
      className="w-full flex flex-row flex-wrap gap-4"
    >
      {stats?.map((item, index) => (
        <div
          key={index}
          data-testid="summary-card"
          className="w-max flex-grow summary-card rounded-lg text-white p-4 sm:p-6 xl:p-8 flex flex-col justify-center"
        >
          <div className="flex flex-col gap-y-1">
            <div
              data-testid="summary-title"
              className="text-white opacity-50 font-open-sans text-xs font-semibold leading-6 tracking-wide"
            >
              {item.title}
            </div>
            {!isLoading && item.value && (
              <div
                data-testid="summary-value"
                className={`${
                  index >= 4 && "card-gradient-text font-bold"
                } text-white font-open-sans text-2xl font-bold leading-7 tracking-wide`}
              >
                {item.value}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
