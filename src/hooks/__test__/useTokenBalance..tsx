import { renderHook, act } from "@testing-library/react";
import { useWeb3React } from "@web3-react/core";
import { useTokenBalance } from "@/hooks";
import { useEnvironment } from "@/hooks";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";

const mockBalanceCall = jest.fn();

jest.mock("ethers", () => {
  const originalEth = jest.requireActual("ethers");

  return {
    ...originalEth,
    Contract: jest.fn().mockImplementation(() => ({
      balanceOf: mockBalanceCall,
    })),
    BigNumber: {
      from: jest.fn(),
    },
  };
});

jest.mock("../../utils/helpers", () => ({
  utilizationsArray: ["1", "2", "3", "4"],
}));

jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

const mockUseEnvironment = useEnvironment as jest.MockedFunction<
  typeof useEnvironment
>;

describe("useTokenBalance", () => {
  it("fetches token balance correctly", async () => {
    mockUseEnvironment.mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
    const mockAccount = "0x123456789abcdef";
    const mockProvider = {};
    (useWeb3React as jest.Mock).mockReturnValue({
      account: mockAccount,
      provider: mockProvider,
    });

    const { result } = renderHook(() => useTokenBalance("0xtokenAddress"));

    // Manually trigger the effect hook
    act(() => {
      result.current.fetchData();
    });

    // Access the result and assert expectations
    expect(mockBalanceCall).toHaveBeenCalled();
  });

  it("handles error when Ethereum provider or account is not available", async () => {
    mockUseEnvironment.mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
    (useWeb3React as jest.Mock).mockReturnValue({
      account: null,
      provider: null,
    });

    const { result } = renderHook(() => useTokenBalance("0xtokenAddress"));

    // Manually trigger the effect hook
    act(() => {
      result.current.fetchData();
    });

    expect(result.current.data).toBeUndefined();
  });
});
