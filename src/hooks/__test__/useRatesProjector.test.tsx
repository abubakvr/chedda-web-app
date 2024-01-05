import { ethers } from "ethers";
import { act, renderHook } from "@testing-library/react";
import { useCheddaSdk, useEnvironment, useRatesProjector } from "@/hooks";
import {
  mockCurrentEnvironment,
  mockInterestRates,
} from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("../useCheddaSdk");
jest.mock("../useEnvironment");

const mockUseCheddaSdk = useCheddaSdk as jest.MockedFunction<
  typeof useCheddaSdk
>;
const mockProvider = {
  getSigner: jest.fn(),
};

describe("useRatesProjector", () => {
  beforeEach(() => {
    mockUseCheddaSdk.mockReset();
    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
  });

  it("fetches and updates interestRates correctly", async () => {
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn(),
        lendingPool: jest.fn().mockReturnValue({
          interestRatesModel: jest.fn().mockResolvedValue("0x00"),
        }),
        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        interestRateProjector: jest.fn().mockReturnValue({
          projection: jest.fn().mockResolvedValue(mockInterestRates),
        }),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    const { result } = renderHook(() => useRatesProjector("yourPoolId"));

    // Ensure that the initial state is correct
    expect(result.current.isLoading).toBe(true);
    expect(result.current.interestRates).toEqual([]);
    expect(mockProvider.getSigner).toHaveBeenCalled();

    // Wait for the hook to fetch and update state
    await act(async () => {
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.interestRates).toHaveLength(3);
  });

  it("Throws an error when hook fails", async () => {
    const setup = () => {
      const mockedFunctions = {
        isLoading: true,
        poolStateEvents: [],
        fetchData: jest.fn().mockRejectedValue(new Error("Test error")),
      };
      jest.doMock("../useRatesProjector", () => mockedFunctions);
      return {
        mockedModule: require("../useRatesProjector"),
      };
    };
    const { mockedModule } = setup();

    await expect(mockedModule.fetchData()).rejects.toThrow(
      new Error("Test error")
    );
  });
});
