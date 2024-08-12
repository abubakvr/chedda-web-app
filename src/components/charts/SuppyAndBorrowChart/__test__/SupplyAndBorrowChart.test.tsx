import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { SuppyAndBorrowChart } from "../SupplyAndBorrowChart";
import { usePoolState } from "@/hooks"; // Import the actual hook implementation
import { mockPoolStateEvents } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("recharts");
jest.mock("../../../../hooks", () => ({
  usePoolState: jest.fn(),
}));

describe("SuppyAndBorrowChart", () => {
  const mockPoolId = "mockPoolId";
  const mockDecimals = 18;

  beforeEach(() => {
    jest.clearAllMocks();

    (usePoolState as jest.Mock).mockReturnValue({
      isLoading: false,
      poolStateEvents: mockPoolStateEvents,
    });
  });

  it("renders without crashing", async () => {
    render(
      <div style={{ width: "500px", height: "300px" }}>
        <SuppyAndBorrowChart
          data={undefined}
          isLoading={false}
          decimals={mockDecimals}
        />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByTestId("supply-borrow-chart")).toBeInTheDocument();
      expect(screen.getByText("Total Supply and Borrow")).toBeInTheDocument();
      expect(screen.queryByTestId("loading-container")).not.toBeInTheDocument();
    });
  });

  it("renders loading state", async () => {
    (usePoolState as jest.Mock).mockReturnValue({
      isLoading: true,
      poolStateEvents: [],
    });

    render(
      <div style={{ width: "500px", height: "300px" }}>
        <SuppyAndBorrowChart
          data={undefined}
          isLoading={true}
          decimals={mockDecimals}
        />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading-container")).toBeInTheDocument();
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      expect(
        screen.queryByTestId("supply-borrow-chart")
      ).not.toBeInTheDocument();
    });
  });
});
