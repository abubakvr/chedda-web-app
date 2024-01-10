// import {
//   mockAggregateStats,
//   mockCurrentEnvironment,
// } from "@/utils/Mocks/MockTestData";
// import { act, renderHook } from "@testing-library/react";
// import { ethers } from "ethers";
// import { useAggregateStats } from "@/hooks";
// import { useCheddaSdk } from "../useCheddaSdk";
// import { useEnvironment } from "../useEnvironment";

// jest.mock("ethers");
// jest.mock("../useCheddaSdk");
// jest.mock("../useEnvironment");

// const mockUseCheddaSdk = useCheddaSdk as jest.MockedFunction<
//   typeof useCheddaSdk
// >;
// const mockUseEnvironment = useEnvironment as jest.MockedFunction<
//   typeof useEnvironment
// >;

// describe("useAggregateStats Hook", () => {
//   beforeEach(() => {
//     // Reset the mock implementation before each test
//     mockUseEnvironment.mockReset();
//     mockUseCheddaSdk.mockReset();
//   });

//   it("fetches and sets aggregate stats correctly", async () => {
//     const mockProvider = {
//       getSigner: jest.fn(),
//     };

//     const mockGetAggregateStats = jest
//       .fn()
//       .mockResolvedValue(mockAggregateStats);

//     mockUseCheddaSdk.mockReturnValue({
//       chedda: {
//         provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
//         poolLens: jest.fn().mockReturnValue({
//           getAggregateStats: mockGetAggregateStats,
//         }),
//         lendingPool: jest.fn(),
//         erc20token: jest.fn(),
//         priceOracle: jest.fn(),
//         closeProvider: jest.fn(),
//       },
//       signer: mockProvider.getSigner(),
//       setupChedda: jest.fn(),
//     });

//     mockUseEnvironment.mockReturnValue({
//       currentEnvironment: mockCurrentEnvironment,
//       switchEnvironment: jest.fn(),
//     });

//     const { result } = renderHook(() => useAggregateStats());

//     // Ensure that the hook initializes with the correct values
//     expect(result.current.isLoading).toBe(true);
//     expect(result.current.aggregateStats).toBeUndefined();

//     // Wait for the hook to fetch and update the values
//     await act(async () => {
//       // Call the function that triggers useEffect
//       await expect(result.current.getAggregateStats()).resolves.not.toThrow();
//     });

//     // Make assertions based on the expected behavior
//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.aggregateStats).toEqual(mockAggregateStats);

//     // Ensure clean-up
//     expect(mockUseCheddaSdk).toHaveBeenCalled();
//     expect(mockGetAggregateStats).toHaveBeenCalled();
//   });
// });
