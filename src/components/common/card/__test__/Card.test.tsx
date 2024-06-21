import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Card } from "../Card";

describe("Card Component", () => {
  it("renders the title and children correctly", () => {
    const title = "Test Title";
    const children = <div data-testid="custom-children">Test Children</div>;

    render(<Card title={title}>{children}</Card>);

    // Check if the title is rendered correctly
    expect(screen.getByText(title)).toBeInTheDocument();

    // Check if the children are rendered correctly
    expect(screen.getByTestId("custom-children")).toBeInTheDocument();
    expect(screen.getByTestId("custom-children")).toHaveTextContent(
      "Test Children"
    );
  });

  it("has the correct classes applied", () => {
    const title = "Test Title";
    const children = <div>Test Children</div>;

    render(<Card title={title}>{children}</Card>);

    // Check if the card has the correct class applied
    expect(screen.getByTestId("custom-card")).toHaveClass(
      "pool-card rounded-lg flex flex-col flex-grow"
    );

    // Check if the header has the correct classes applied
    const header = screen.getByText(title).parentElement;
    expect(header).toHaveClass(
      "card-header-bg flex justify-between rounded-t-lg px-8 h-[50px] items-center"
    );

    // Check if the body has the correct classes applied
    const body = header?.nextSibling;
    expect(body).toHaveClass("px-8 p-4");
  });
});
