import React from "react";
import { render } from "@testing-library/react";
import { RefreshSpinner } from "../RefreshSpinner";

describe("RefreshSpinner Component", () => {
  it("renders the spinner when isOpen is true", () => {
    const { getByTestId } = render(<RefreshSpinner isOpen={true} />);
    const loadingIcon = getByTestId("loading-icon");

    expect(loadingIcon).toBeInTheDocument();
  });

  it("does not render the spinner when isOpen is false", () => {
    const { queryByTestId } = render(<RefreshSpinner isOpen={false} />);
    const loadingIcon = queryByTestId("loading-icon");

    expect(loadingIcon).toBeNull();
  });
});
