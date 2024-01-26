import * as redux from "react-redux";
import { renderHook, act } from "@testing-library/react";
import { useWeb3React } from "@web3-react/core";
import { useCheddaSdk, useEnvironment } from "@/hooks";
import { useParams } from "next/navigation";
import { useFetcher } from "../useFetcher";

jest.mock("ethers");
jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");
  return {
    ...originalModule,
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock("../../hooks", () => ({
  useEnvironment: jest.fn(),
  useCheddaSdk: jest.fn(),
}));

jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

describe("useFetcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data and updates state", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const useSelectorSpy = jest.spyOn(redux, "useSelector");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(false);

    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: "mockEnv",
    });
    (useCheddaSdk as jest.Mock).mockReturnValue({
      chedda: "mockChedda",
      signer: "mockSigner",
    });
    (useWeb3React as jest.Mock).mockReturnValue({ account: "mockAccount" });
    (useParams as jest.Mock).mockReturnValue({ poolId: "mockPoolId" });

    const getDataMock = jest.fn().mockResolvedValue("mockData");

    const { result } = renderHook(() => useFetcher(getDataMock, "mockAsset"));

    // Expect the initial state to be false (not undefined)
    expect(result.current.isLoading).toBe(false);

    await act(() => result.current.fetchData());

    // Expect that the function passed is called
    expect(mockDispatchFn).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});
