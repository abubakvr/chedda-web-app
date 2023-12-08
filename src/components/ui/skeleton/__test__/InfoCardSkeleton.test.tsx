// MyInformationSkeleton.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { InfoCardSkeleton } from "../InfoCardSkeleton";

describe("InfoCardSkeleton", () => {
  it("renders InfoCardSkeleton component correctly", () => {
    const title = "Test Title";
    render(<InfoCardSkeleton title={title} />);

    // Test the rendering of components and elements in the loading state
    expect(screen.getByTestId("info-loading-element")).toBeInTheDocument();
    expect(screen.getByTestId("info-card-title")).toHaveTextContent(title);
  });
});
