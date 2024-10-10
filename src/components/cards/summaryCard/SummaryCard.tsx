import { ISummaryStats } from "@/utils/types";

interface SummaryCardProps {
  stats: ISummaryStats[] | undefined;
  isLoading: boolean;
}

export const SummaryCard = ({ stats, isLoading }: SummaryCardProps) => {
  if (isLoading) {
    return (
      <div
        className="w-full grid grid-cols-3 lg:grid-cols-6 flex-row flex-wrap gap-4"
        data-testid="loading-element"
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-full flex-grow summary-card rounded-lg text-white p-4 md:p-6 xl:p-8 flex justify-center"
          >
            <div className="flex-grow flex flex-col gap-y-1">
              <div
                data-testid={`summary-title-${index}`}
                className="text-white opacity-50 font-open-sans text-xs font-semibold leading-6 tracking-wide"
              >
                <div className="flex flex-col justify-center text-sm md:col-span-1 animate-pulse">
                  <div className="flex flex-col">
                    <div className="h-3 md:h-4 xl:h-5 bg-gray-400 rounded-md dark:bg-blue-200 opacity-10 w-2/3"></div>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-sm md:col-span-1 animate-pulse mt-2.5">
                  <div className="flex flex-col">
                    <div className="h-5 md:h-6 xl:h-7 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      data-testid="summary-card"
      className="w-full grid grid-cols-3 lg:grid-cols-6 flex-row flex-wrap gap-4"
    >
      {stats?.map((item, index) => (
        <div
          key={index}
          className="summary-card rounded-lg text-white p-4 sm:p-6 lg:p-6 xl:p-8 flex flex-col justify-center"
        >
          <div className="w-full flex flex-col">
            <div
              data-testid="summary-title"
              className="text-white opacity-50 font-open-sans md:text-2xs lg:text-xs font-semibold leading-6 tracking-wide"
            >
              {item.title}
            </div>
            {!isLoading && item.value && (
              <div
                data-testid="summary-value"
                className={`${
                  index >= 4 && "card-gradient-text font-bold"
                }  lg: mt-1 xl:mt-2 text-white font-open-sans md:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide`}
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
