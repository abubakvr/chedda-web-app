import React from "react";
import backIcon from "@/assets/icon/back-icon.svg";
import { render, screen, fireEvent } from "@testing-library/react";
import { SummaryHeader } from "../SummaryHeader"; // Assuming ReusableComponentProps is in the same file as SummaryHeader
import { useRouter } from "next/navigation";

jest.mock("ethers");
jest.mock("../../../../hooks");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SummaryHeader component", () => {
  const mockNavigateBack = jest.fn();
  const mockIcon = backIcon;
  const mockAssetName = "Mock Asset";

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockNavigateBack,
    });

    const props = {
      navigateBack: mockNavigateBack,
      logoSrc: mockIcon,
      assetName: mockAssetName,
    };

    render(<SummaryHeader {...props} />);
  });

  it("renders the component with correct props", () => {
    expect(screen.getByTestId("asset-name")).toHaveTextContent(mockAssetName);

    expect(screen.getByText(mockAssetName)).toBeInTheDocument();
  });

  it("calls navigateBack when the back button is clicked", () => {
    // Click the back button
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    expect(mockNavigateBack).toHaveBeenCalledTimes(1);
  });
});
