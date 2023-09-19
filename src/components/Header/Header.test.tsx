import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders header correctly", () => {
  render(<Header />);
  const headerElement = screen.getByText("My App Header");
  expect(headerElement).toBeInTheDocument();
});
