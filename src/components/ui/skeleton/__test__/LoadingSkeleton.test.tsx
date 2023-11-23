import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoadingSkeleton } from "../LoadingSkeleton";

describe("LoadingSkeleton Component", () => {
  it("renders the correct number of skeleton items", () => {
    const itemCount = 3;

    const { getAllByTestId } = render(
      <LoadingSkeleton itemCount={itemCount} />
    );

    const skeletonItems = getAllByTestId("skeleton-item-container");

    expect(skeletonItems).toHaveLength(itemCount);
  });
});
