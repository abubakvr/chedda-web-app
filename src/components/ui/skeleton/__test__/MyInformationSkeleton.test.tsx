// MyInformationSkeleton.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MyInformationSkeleton } from "../MyInformationSkeleton";

describe("MyInformationSkeleton", () => {
  it("renders MyInformationSkeleton component correctly", () => {
    render(<MyInformationSkeleton />);

    // Test the rendering of components and elements in the loading state
    expect(
      screen.getByTestId("myinformation-loading-element")
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("collateral-logo")).toHaveLength(3); // 3 placeholders
  });
});
