import React from "react";
import { render } from "@testing-library/react";
import { PacmanLogo } from "../PacmanLogo";

describe("PacmanLogo component", () => {
  test("renders Pacman logo", () => {
    const { getByTestId, getAllByTestId } = render(<PacmanLogo />);

    // Check if the main container is rendered
    const mainContainer = getByTestId("pacman-logo");
    expect(mainContainer).toBeInTheDocument();

    // Check if the logo SVG is rendered
    const logoSvg = getByTestId("logo-svg");
    expect(logoSvg).toBeInTheDocument();

    // Check if the circle elements are rendered
    const circlePacs = getAllByTestId("circle-pac");
    expect(circlePacs.length).toBe(4); // Assuming there are 4 circle elements
  });
});
