import { render, screen } from "@testing-library/react";
import { BridgeSection } from "../BridgeSection";

describe("BridgeSection", () => {
  it("renders the component correctly", () => {
    render(<BridgeSection />);

    // Check if the component renders
    expect(screen.getByTestId("bridge-assets")).toBeInTheDocument();

    // Check if the title is rendered
    expect(
      screen.getByText("Bridge assets from other networks to use on CHEDDA")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Bridged assets can be supplied or as collateral in CHEDDA lending pools and can be bridged back at any time./
      )
    ).toBeInTheDocument();

    expect(screen.getByTestId("go-to-bridge")).toBeInTheDocument();

    // Check if the Learn more link is rendered
    expect(screen.getByTestId("learn-more")).toBeInTheDocument();

    // Check if the images are rendered
    expect(screen.getAllByAltText("networks").length).toBe(2);
    expect(screen.getByAltText("arrow forward")).toBeInTheDocument();
    expect(screen.getByAltText("bridge vector")).toBeInTheDocument();
  });
});
