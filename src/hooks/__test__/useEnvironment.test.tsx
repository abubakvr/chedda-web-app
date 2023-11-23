import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { EnvironmentContextProps } from "@/contexts/EnvironmentContext";
import { useEnvironment } from "../useEnvironment";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

type WrapperProps = {
  children?: React.ReactNode;
};

jest.mock("ethers");

describe("useEnvironment Hook", () => {
  it("returns context from EnvironmentProvider", () => {
    const mockContextValue: EnvironmentContextProps = {
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    };

    const wrapper: React.FC<WrapperProps> = ({ children }) => (
      <MockAppProviders>{children}</MockAppProviders>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper });

    waitFor(() => {
      expect(result.current).toEqual(mockContextValue);
    });
  });

  it("throws an error if used outside of EnvironmentProvider", () => {
    // Silence the error output during this test
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {});

    const wrapper: React.FC<WrapperProps> = ({ children }) => (
      <div>{children}</div>
    );

    // Wrap the rendering in a function to catch the error
    const renderWithWrapper = () => renderHook(() => useEnvironment());

    // Expect an error to be thrown since useEnvironment is used outside of EnvironmentProvider
    expect(renderWithWrapper).toThrowError(
      "useEnvironment must be used within an EnvironmentProvider"
    );

    spy.mockRestore(); // Restore console.error to its original implementation
  });
});
