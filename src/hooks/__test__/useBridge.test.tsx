import { renderHook, act } from "@testing-library/react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { Chedda } from "chedda-sdk";
import { useBridge } from "@/hooks/useBridge";
import { useSigner, useToast } from "@/hooks";

// Mock dependencies
jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

jest.mock("../../hooks/useSigner", () => ({
  useSigner: jest.fn(),
}));

jest.mock("../../hooks/useToast", () => ({
  useToast: jest.fn(),
}));

jest.mock("chedda-sdk", () => ({
  Chedda: jest.fn(),
}));

jest.mock("@layerzerolabs/lz-v2-utilities", () => ({
  Options: {
    newOptions: jest.fn(() => ({
      addExecutorLzReceiveOption: jest.fn().mockReturnThis(),
      toHex: jest.fn().mockReturnThis(),
      toString: jest.fn().mockReturnThis(),
    })),
  },
}));

describe("useBridge", () => {
  const approveMock = jest.fn();
  const balanceOfMock = jest.fn();
  const allowanceMock = jest.fn();
  const quoteSendMock = jest.fn().mockResolvedValue([[BigInt(100)]]);
  const mockSend = jest.fn().mockResolvedValue("TransactionResult");

  const mockSigner = {
    getAddress: jest.fn().mockResolvedValue("0x123"),
  };

  const mockToast = {
    addToast: jest.fn(),
  };

  const mockChedda = {
    genericOFT: jest.fn(() => ({
      approve: approveMock,
      quoteSend: quoteSendMock,
      send: mockSend,
    })),
    erc20token: jest.fn(() => ({
      balanceOf: balanceOfMock,
      allowance: allowanceMock,
    })),
    priceOracle: jest.fn(() => ({
      decimals: jest.fn().mockResolvedValue(18),
      readPrice: jest.fn().mockResolvedValue(ethers.parseUnits("1", 18)),
    })),
  };

  const selectedChain = {
    name: "Test Chain",
    jsonRpcUrl: "https://test-rpc-url.com",
    priceFeed: "0xPriceFeedAddress",
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    (useWeb3React as jest.Mock).mockReturnValue({
      account: "0x0000000000000000000000000000000000000001",
    });
    (useSigner as jest.Mock).mockReturnValue({ signer: mockSigner });
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (Chedda as jest.Mock).mockImplementation(() => mockChedda);
  });

  it("should create a Chedda instance when selectedChain is provided", () => {
    const { result } = renderHook(() => useBridge(selectedChain));

    expect(result.current).toBeDefined();
    expect(Chedda).toHaveBeenCalledWith(selectedChain.jsonRpcUrl);
  });

  it("should not create a Chedda instance when selectedChain is null", () => {
    const { result } = renderHook(() => useBridge(null));

    expect(result.current).toBeDefined();
    expect(Chedda).not.toHaveBeenCalledWith(selectedChain.jsonRpcUrl);
  });

  it("should call approveAsset and execute transaction", async () => {
    const { result } = renderHook(() => useBridge(selectedChain));

    await act(async () => {
      await result.current.approveAsset("0xToken", "0xOFT", BigInt(100));
    });

    expect(approveMock).toHaveBeenCalledWith("0xOFT", BigInt(100));
  });

  it("should return correct send parameters", async () => {
    const { result } = renderHook(() => useBridge(selectedChain));

    const sendParam = result.current.getSendParam(1, BigInt(1000));

    expect(sendParam).toBeDefined();
    expect(sendParam?.[1]).toBe(
      ethers.zeroPadValue("0x0000000000000000000000000000000000000001", 32)
    ); // Check if the address is padded correctly
  });

  it("should execute sendOFT correctly", async () => {
    // Mock hook dependencies
    const mockChain = { jsonRpcUrl: "https://mock-rpc-url" };

    const { result } = renderHook(() => useBridge(mockChain as any));

    await act(async () => {
      const response = await result.current.sendOFT(
        "0xTokenAddress",
        1,
        BigInt(1000),
        "0xRefundAddress"
      );
      expect(response).toBe("TransactionResult");
    });

    // Check if mocks were called correctly
    expect(quoteSendMock).toHaveBeenCalled();
    expect(mockSend).toHaveBeenCalled();
  });

  it("should call quoteSend and return result", async () => {
    const { result } = renderHook(() => useBridge(selectedChain));

    quoteSendMock.mockResolvedValueOnce("0xResult");

    let response;
    await act(async () => {
      response = await result.current.quoteSend("0xToken", 1, BigInt(100));
    });

    expect(quoteSendMock).toHaveBeenCalled();
    expect(response).toEqual(["0xResult"]);
  });

  it("should handle errors in quoteSend", async () => {
    const { result } = renderHook(() => useBridge(selectedChain));

    const quoteSendMock = mockChedda.genericOFT().quoteSend;
    quoteSendMock.mockRejectedValueOnce(new Error("Test Error"));

    let response;
    await act(async () => {
      response = await result.current.quoteSend("0xToken", 1, BigInt(100));
    });

    expect(response).toEqual([]);
    expect(mockToast.addToast).toHaveBeenCalledWith({
      message: "An error occured,",
      type: "fetchError",
    });
  });

  it("should get token price", async () => {
    const { result } = renderHook(() => useBridge(selectedChain));

    let response;
    await act(async () => {
      response = await result.current.getTokenPrice("0xToken");
    });

    expect(response).toBe(1); // 1 token with 18 decimals parsed as float
  });

  it("should get token balance", async () => {
    balanceOfMock.mockResolvedValueOnce(BigInt(1000));

    const { result } = renderHook(() => useBridge(selectedChain));

    let response;
    await act(async () => {
      response = await result.current.getTokenBalance("0xToken");
    });

    expect(balanceOfMock).toHaveBeenCalledWith(
      "0x0000000000000000000000000000000000000001"
    );
    expect(response).toBe(BigInt(1000));
  });

  it("should get token allowance", async () => {
    allowanceMock.mockResolvedValueOnce(BigInt(500));

    const { result } = renderHook(() => useBridge(selectedChain));

    let response;
    await act(async () => {
      response = await result.current.getTokenAllowance("0xToken", "0xOFT");
    });

    expect(allowanceMock).toHaveBeenCalledWith(
      "0x0000000000000000000000000000000000000001",
      "0xOFT"
    );
    expect(response).toBe(BigInt(500));
  });

  it("should get ETH price", async () => {
    const { result } = renderHook(() => useBridge(selectedChain));

    let response;
    await act(async () => {
      response = await result.current.getEthPrice();
    });

    expect(response).toBe(1); // Assuming the mock price is 1 ETH
  });
});
