import { renderHook } from "@testing-library/react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useSigner } from "@/hooks/useSigner";

// Mock useWeb3React hook
jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

describe("useSigner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockEthereumProvider = {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  };

  it("should return undefined for provider and signer if window.ethereum is not available", () => {
    // Simulate no Ethereum provider in the window object
    Object.defineProperty(window, "ethereum", {
      value: undefined,
      writable: true,
    });

    (useWeb3React as jest.Mock).mockReturnValue({ account: undefined });

    const { result } = renderHook(() => useSigner());

    expect(result.current.provider).toBeUndefined();
    expect(result.current.signer).toBeUndefined();
  });

  it("should return a provider if window.ethereum is available", () => {
    // Simulate an Ethereum provider in the window object
    Object.defineProperty(window, "ethereum", {
      value: mockEthereumProvider,
      writable: true,
    });

    (useWeb3React as jest.Mock).mockReturnValue({ account: undefined });

    const { result } = renderHook(() => useSigner());

    expect(result.current.provider).toBeInstanceOf(ethers.BrowserProvider);
    expect(result.current.signer).toBeUndefined();
  });

  it("should return a signer if provider and account are available", () => {
    // Simulate an Ethereum provider in the window object
    Object.defineProperty(window, "ethereum", {
      value: mockEthereumProvider,
      writable: true,
    });

    // Mock account returned by useWeb3React
    const mockAccount = "0x0000000000000000000000000000000000000001";
    (useWeb3React as jest.Mock).mockReturnValue({ account: mockAccount });

    const { result } = renderHook(() => useSigner());

    expect(result.current.provider).toBeInstanceOf(ethers.BrowserProvider);
    expect(result.current.signer).toBeInstanceOf(ethers.JsonRpcSigner);
  });

  it("should return undefined for signer if provider is available but account is not", () => {
    // Simulate an Ethereum provider in the window object
    Object.defineProperty(window, "ethereum", {
      value: mockEthereumProvider,
      writable: true,
    });

    (useWeb3React as jest.Mock).mockReturnValue({ account: undefined });

    const { result } = renderHook(() => useSigner());

    expect(result.current.provider).toBeInstanceOf(ethers.BrowserProvider);
    expect(result.current.signer).toBeUndefined();
  });
});
