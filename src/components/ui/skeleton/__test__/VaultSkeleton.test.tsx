import React from "react";
import { render } from "@testing-library/react";
import { VaultSkeleton } from "../VaultSkeleton";

describe("VaultSkeleton Component", () => {
  it("renders the correct number of skeleton items", () => {
    const itemCount = 3;

    const { getAllByTestId } = render(<VaultSkeleton itemCount={itemCount} />);
    const skeletonItems = getAllByTestId("skeleton-item-container");

    expect(skeletonItems).toHaveLength(itemCount);
  });
});
