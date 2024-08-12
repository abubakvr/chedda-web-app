import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { InterestRatesChart } from "../InterestRatesChart";
import { useRatesProjector } from "@/hooks";
import { mockInterestRates } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("recharts");
jest.mock("../../../../hooks", () => ({
  useRatesProjector: jest.fn(),
}));

describe("InterestRatesChart", () => {
  const mockPoolId = "mockPoolId";

  beforeEach(() => {
    jest.clearAllMocks();

    (useRatesProjector as jest.Mock).mockReturnValue({
      isLoading: false,
      interestRates: mockInterestRates,
    });
  });

  it("renders without crashing", async () => {
    render(
      <div style={{ width: "500px", height: "300px" }}>
        <InterestRatesChart poolId={mockPoolId} />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByTestId("interest-rates-chart")).toBeInTheDocument();
      expect(screen.getByText("Interest Rate Model")).toBeInTheDocument();
      expect(screen.queryByTestId("loading-container")).not.toBeInTheDocument();
    });
  });

  it("renders loading state", async () => {
    (useRatesProjector as jest.Mock).mockReturnValue({
      isLoading: true,
      poolStateEvents: [],
    });

    render(
      <div style={{ width: "500px", height: "300px" }}>
        <InterestRatesChart poolId={mockPoolId} />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading-container")).toBeInTheDocument();
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      expect(
        screen.queryByTestId("interest-rates-chart")
      ).not.toBeInTheDocument();
    });
  });
});
