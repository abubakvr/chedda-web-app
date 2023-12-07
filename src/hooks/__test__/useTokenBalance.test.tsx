import { renderHook, act } from "@testing-library/react";
import { useWeb3React } from "@web3-react/core";
import { useTokenBalance } from "../useTokenBalance";

jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

const mockBalanceCall = jest.fn();

jest.mock("ethers", () => ({
  Contract: jest.fn().mockImplementation(() => ({
    balanceOf: mockBalanceCall,
  })),
}));

describe("useTokenBalance", () => {
  it("fetches token balance correctly", async () => {
    const mockAccount = "0x123456789abcdef";
    const mockProvider = {};
    (useWeb3React as jest.Mock).mockReturnValue({
      account: mockAccount,
      provider: mockProvider,
    });

    const { result } = renderHook(() => useTokenBalance());

    // Manually trigger the effect hook
    act(() => {
      result.current.fetchTokenBalance("0xtokenAddress");
    });

    // Access the result and assert expectations
    expect(mockBalanceCall).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  it("handles error when Ethereum provider or account is not available", async () => {
    (useWeb3React as jest.Mock).mockReturnValue({
      account: null,
      provider: null,
    });

    const { result } = renderHook(() => useTokenBalance());

    // Manually trigger the effect hook
    act(() => {
      result.current.fetchTokenBalance("0xtokenAddress");
    });

    // Wait for the state to be updated
    // Access the result and assert expectations
    expect(result.current.tokenBalance).toBeUndefined();
    expect(result.current.error).toEqual(
      new Error("Ethereum provider or account not available")
    );
  });
});
