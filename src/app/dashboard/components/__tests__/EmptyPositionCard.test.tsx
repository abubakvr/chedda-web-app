import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { EmptyPositionCard } from "../EmptyPositionCard";

describe("EmptyPositionCard", () => {
  test("renders correctly", () => {
    render(<EmptyPositionCard />);

    // Check if the card is rendered
    const card = screen.getByTestId("empty-position-card");
    expect(card).toBeInTheDocument();

    // Check if the message is rendered
    const message = screen.getByTestId("connect-wallet-message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(
      "You do not have any open position. Supply to earn rewards."
    );

    // Check if the button is rendered
    const button = screen.getByText("Go to Markets");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Go to Markets");

    // Check if the arrow icon is rendered within the button
    const arrowIcon = screen.getByAltText("arrow forward");
    expect(arrowIcon).toBeInTheDocument();
  });
});
