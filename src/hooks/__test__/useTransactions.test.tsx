import { renderHook, act } from "@testing-library/react";
import { useTransaction } from "../useTransactions";
import { useWeb3React } from "@web3-react/core";
import { useParams } from "next/navigation";
import { useSigner, useToast } from "@/hooks";
import { useCheddaSdk } from "@/hooks/useCheddaSdk";
import { JsonRpcSigner } from "ethers";
import { WalletConnect } from "@web3-react/walletconnect-v2";

// Mock the hooks and utilities
jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 4,
    isActivating: false,
  })),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("../../hooks", () => ({
  useSigner: jest.fn(),
  useToast: jest.fn(),
}));

jest.mock("../../hooks/useCheddaSdk", () => ({
  ...jest.requireActual("../../hooks/useCheddaSdk"), // Use the actual implementation of the hooks module
  useCheddaSdk: jest.fn().mockReturnValue({
    erc20token: jest.fn().mockReturnValue({
      approve: jest.fn().mockResolvedValue("approve-success"),
    }),
    lendingPool: jest.fn().mockReturnValue({
      supply: jest.fn().mockResolvedValue("deposit-success"),
      withdraw: jest.fn().mockResolvedValue("withdraw-success"),
      removeCollateral: jest.fn().mockResolvedValue("remove-success"),
      addCollateral: jest.fn().mockResolvedValue("collateral-success"),
      take: jest.fn().mockResolvedValue("borrow-success"),
      putAmount: jest.fn().mockResolvedValue("repay-success"),
      approve: jest.fn().mockResolvedValue("lp-approve-success"),
      stakePool: jest.fn().mockResolvedValue("0xStakingPool"),
      gauge: jest.fn().mockResolvedValue("0xGauge"),
    }),
    cheddaToken: jest.fn().mockReturnValue({
      approve: jest.fn().mockResolvedValue("chedda-approve-success"),
      balanceOf: jest.fn().mockResolvedValue(BigInt(1000)),
    }),
    accountActor: jest.fn().mockReturnValue({
      claimAllRewards: jest.fn().mockResolvedValue("claim-all-success"),
    }),
    stakingPool: jest.fn().mockReturnValue({
      stake: jest.fn().mockResolvedValue("stake-success"),
      unStake: jest.fn().mockResolvedValue("unstake-success"),
      claim: jest.fn().mockResolvedValue("claim-success"),
    }),
    cheddaLockingGauge: jest.fn().mockReturnValue({
      createLock: jest.fn().mockResolvedValue("lock-success"),
      withdraw: jest.fn().mockResolvedValue("withdraw-success"),
      extendLock: jest.fn().mockResolvedValue("remove-success"),
      claim: jest.fn().mockResolvedValue("collateral-success"),
      addToLock: jest.fn().mockResolvedValue("collateral-success"),
    }),
  }),
}));

jest.mock("../../utils/helpers", () => ({
  getErrorMessageFromCode: jest.fn(() => "Mocked error message"),
}));

jest.mock("ethers");
jest.mock("@web3-react/walletconnect-v2");

describe("useTransaction", () => {
  const mockApprove = jest.fn().mockResolvedValue("approve-success");
  const mockSupply = jest.fn().mockResolvedValue("deposit-success");
  const mockAddCollateral = jest.fn().mockResolvedValue("collateral-success");
  const mockWithdraw = jest.fn().mockResolvedValue("withdraw-success");
  const mockRemoveCollateral = jest.fn().mockResolvedValue("remove-success");
  const mockTake = jest.fn().mockResolvedValue("borrow-success");
  const mockPutAmount = jest.fn().mockResolvedValue("repay-success");
  const mockLpApprove = jest.fn().mockResolvedValue("lp-approve-success");
  const mockStakePool = jest.fn().mockResolvedValue("0xStakingPool");
  const mockStake = jest.fn().mockResolvedValue("stake-success");
  const mockCreateLock = jest.fn().mockResolvedValue("lock-success");
  const mockExtendLock = jest.fn().mockResolvedValue("relock-success");
  const mockAddToLock = jest.fn().mockResolvedValue("lock-more-success");
  const mockUnStake = jest.fn().mockResolvedValue("unstake-success");
  const mockClaim = jest.fn().mockResolvedValue("claim-success");
  const mockGauge = jest.fn().mockResolvedValue("0xGauge");
  const mockApproveChedda = jest
    .fn()
    .mockResolvedValue("chedda-approve-success");
  const mockBalanceOf = jest.fn().mockResolvedValue(BigInt(1000));
  const mockClaimAllRewards = jest.fn().mockResolvedValue("claim-all-success");

  const mockAccount = "0x123";
  const mockSigner = {} as JsonRpcSigner;
  const mockAddToast = jest.fn();
  const mockChedda = {
    erc20token: jest.fn().mockReturnValue({
      approve: mockApprove,
    }),
    lendingPool: jest.fn().mockReturnValue({
      supply: mockSupply,
      withdraw: mockWithdraw,
      removeCollateral: mockRemoveCollateral,
      addCollateral: mockAddCollateral,
      take: mockTake,
      putAmount: mockPutAmount,
      approve: mockLpApprove,
      stakePool: mockStakePool,
      gauge: mockGauge,
    }),
    cheddaToken: jest.fn().mockReturnValue({
      approve: mockApproveChedda,
      balanceOf: mockBalanceOf,
    }),
    accountActor: jest.fn().mockReturnValue({
      claimAllRewards: mockClaimAllRewards,
    }),
    stakingPool: jest.fn().mockReturnValue({
      stake: mockStake,
      unStake: mockUnStake,
      claim: mockClaim,
    }),
    cheddaLockingGauge: jest.fn().mockReturnValue({
      createLock: mockCreateLock,
      withdraw: mockWithdraw,
      extendLock: mockExtendLock,
      claim: mockClaim,
      addToLock: mockAddToLock,
    }),
  };
  const mockParams = { poolId: "0xAsset" };

  beforeEach(() => {
    (useWeb3React as jest.Mock).mockReturnValue({ account: mockAccount });
    (useCheddaSdk as jest.Mock).mockReturnValue({ chedda: mockChedda });
    (useParams as jest.Mock).mockReturnValue(mockParams);
    (useSigner as jest.Mock).mockReturnValue({ signer: mockSigner });
    (useToast as jest.Mock).mockReturnValue({ addToast: mockAddToast });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct state", () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    expect(result.current.lendingPool).toBeDefined();
    expect(mockChedda.lendingPool).toHaveBeenCalledWith(
      mockParams.poolId,
      mockSigner
    );
  });

  it("should execute approveAsset transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.approveAsset(BigInt(100));
      expect(response).toBe("approve-success");
      expect(mockApprove).toHaveBeenCalledWith("0xAsset", BigInt(100));
    });
  });

  it("should execute depositAsset transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.depositAsset(BigInt(100), true);
      expect(response).toBe("deposit-success");
      expect(mockSupply).toHaveBeenCalledWith(BigInt(100), mockAccount, true);
    });
  });

  it("should execute withdrawAsset transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.withdrawAsset(BigInt(100));
      expect(response).toBe("withdraw-success");

      expect(mockWithdraw).toHaveBeenCalledWith(
        BigInt(100),
        mockAccount,
        mockAccount
      );
    });
  });

  it("should execute depositCollateral transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.depositCollateral(BigInt(100));
      expect(response).toBe("collateral-success");
      expect(mockAddCollateral).toHaveBeenCalledWith("0xAsset", BigInt(100));
    });
  });

  it("should execute withdrawCollateral transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.withdrawCollateral(BigInt(100));
      expect(response).toBe("remove-success");
      expect(mockRemoveCollateral).toHaveBeenCalledWith("0xAsset", BigInt(100));
    });
  });

  it("should execute borrowAsset transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.borrowAsset(BigInt(100));
      expect(response).toBe("borrow-success");
      expect(mockTake).toHaveBeenCalledWith(BigInt(100));
    });
  });

  it("should execute repayAsset transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.repayAsset(BigInt(100));
      expect(response).toBe("repay-success");
      expect(mockPutAmount).toHaveBeenCalledWith(BigInt(100));
    });
  });

  it("should execute approveLpToken transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.approveLpToken(BigInt(100));
      expect(response).toBe("lp-approve-success");
      expect(mockLpApprove).toHaveBeenCalledWith("0xStakingPool", BigInt(100));
    });
  });

  it("should execute stakeLpToken transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.stakeLpToken(BigInt(100));
      expect(response).toBe("stake-success");
      expect(mockStake).toHaveBeenCalledWith(BigInt(100));
    });
  });

  it("should execute unStakeLpToken transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.unStakeLpToken(BigInt(100));
      expect(response).toBe("unstake-success");
      expect(mockUnStake).toHaveBeenCalledWith(BigInt(100));
    });
  });

  it("should execute claimStakeRewards transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.claimStakeRewards();
      expect(response).toBe("claim-success");
      expect(mockClaim).toHaveBeenCalled();
    });
  });

  it("should execute approveCheddaToken transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.approveCheddaToken(BigInt(100));
      expect(response).toBe("chedda-approve-success");
      expect(mockGauge).toHaveBeenCalled();
      expect(mockApproveChedda).toHaveBeenCalledWith("0xGauge", BigInt(100));
    });
  });

  it("should execute lockCheddaToken transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.lockCheddaToken(BigInt(100), 100);
      expect(response).toBe("lock-success");
      expect(mockGauge).toHaveBeenCalled();
      expect(mockCreateLock).toHaveBeenCalledWith(BigInt(100), 100);
    });
  });

  it("should execute withdrawCheddaToken transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.withdrawCheddaToken();
      expect(response).toBe("withdraw-success");

      expect(mockGauge).toHaveBeenCalled();
      expect(mockWithdraw).toHaveBeenCalled();
    });
  });

  it("should execute relockCheddaToken transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.relockCheddaToken(100);
      expect(response).toBe("relock-success");
      expect(mockGauge).toHaveBeenCalled();
      expect(mockExtendLock).toHaveBeenCalledWith(100);
    });
  });

  it("should execute claimLockRewards transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.claimLockRewards();
      expect(response).toBe("claim-success");

      expect(mockGauge).toHaveBeenCalled();
      expect(mockClaim).toHaveBeenCalled();
    });
  });

  it("should execute lockMoreCheddaToken transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.lockMoreCheddaToken(BigInt(100));
      expect(response).toBe("lock-more-success");

      expect(mockGauge).toHaveBeenCalled();
      expect(mockAddToLock).toHaveBeenCalledWith(BigInt(100));
    });
  });

  it("should execute getTokenBalance", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const balance = await result.current.getTokenBalance("0xTokenAddress");
      expect(balance).toBe(BigInt(1000));
      expect(mockBalanceOf).toHaveBeenCalledWith(mockAccount);
    });
  });

  it("should execute claimAllRewards transaction", async () => {
    const { result } = renderHook(() => useTransaction("0xAsset"));

    await act(async () => {
      const response = await result.current.claimAllRewards();
      expect(response).toBe("claim-all-success");
      expect(mockClaimAllRewards).toHaveBeenCalledWith(mockAccount);
    });
  });
});
