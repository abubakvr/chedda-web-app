import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { AppProviders } from "../AppProviders";

describe("AppProviders Component", () => {
  it("renders its children correctly", async () => {
    const mockChildren = "Test Children";

    render(<AppProviders>{mockChildren}</AppProviders>);

    await waitFor(() => {
      const childrenElement = screen.getByText("Test Children");
      expect(childrenElement).toBeInTheDocument();
    });
  });
});
