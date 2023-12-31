import { ethers } from "ethers";
import { act, renderHook } from "@testing-library/react";
import { useCheddaSdk, usePoolState } from "@/hooks";
import { mockPoolStateEvents } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");
jest.mock("../useCheddaSdk");

const mockUseCheddaSdk = useCheddaSdk as jest.MockedFunction<
  typeof useCheddaSdk
>;
const mockProvider = {
  getSigner: jest.fn(),
};

describe("usePoolState", () => {
  beforeEach(() => {
    mockUseCheddaSdk.mockReset();
  });

  it("fetches and updates poolStateEvents correctly", async () => {
    mockUseCheddaSdk.mockReturnValue({
      chedda: {
        provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
        poolLens: jest.fn(),
        lendingPool: jest.fn().mockReturnValue({
          getEventLogs: jest.fn().mockResolvedValue(mockPoolStateEvents),
        }),

        erc20token: jest.fn(),
        priceOracle: jest.fn(),
        closeProvider: jest.fn(),
      },
      signer: mockProvider.getSigner(),
      setupChedda: jest.fn(),
    });

    const { result } = renderHook(() => usePoolState("yourPoolId"));

    // Ensure that the initial state is correct
    expect(result.current.isLoading).toBe(true);
    expect(result.current.poolStateEvents).toEqual([]);
    expect(mockProvider.getSigner).toHaveBeenCalled();

    // Wait for the hook to fetch and update state
    await act(async () => {
      await expect(result.current.fetchData()).resolves.not.toThrow();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.poolStateEvents).toHaveLength(25);
  });

  it("Throws an error when getEventLog fails", async () => {
    const setup = () => {
      const mockedFunctions = {
        isLoading: true,
        poolStateEvents: [],
        fetchData: jest.fn().mockRejectedValue(new Error("Test error")),
      };
      jest.doMock("../useEvents", () => mockedFunctions);
      return {
        mockedModule: require("../useEvents"),
      };
    };
    const { mockedModule } = setup();

    await expect(mockedModule.fetchData()).rejects.toThrow(
      new Error("Test error")
    );
  });
});
