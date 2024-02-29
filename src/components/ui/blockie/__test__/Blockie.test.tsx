import React from "react";
import { render, screen } from "@testing-library/react";
import { Blockie } from "../Blockie";

jest.mock("react-blockies");

describe("Blockie Component", () => {
  beforeAll(() => {
    const originalWarn = console.warn;

    jest.spyOn(console, "warn").mockImplementation((...args) => {
      if (!args.some((arg) => arg.includes("Identicon"))) {
        originalWarn(...args);
      }
    });
  });
  it("renders Blockie component with the provided account address", () => {
    const accountAddress = "testUser";

    render(<Blockie accountAddress={accountAddress} />);

    const blockieElement = screen.getByTestId("blockie");
    expect(blockieElement).toBeInTheDocument();
  });

  it("renders Blockie component with the default account address when not provided", () => {
    render(<Blockie />);

    const defaultBlockieElement = screen.getByTestId("blockie");
    expect(defaultBlockieElement).toBeInTheDocument();
  });
});
