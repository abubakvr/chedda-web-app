import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SupplyTabInfo, WithdrawTabInfo } from "../TabInfo";

describe("SupplyTabInfo Component", () => {
  const props = {
    allowance: "100",
    supplied: "50",
    baseSupplyAPY: "5%",
    projectedSupply: "60",
  };

  it("renders SupplyTabInfo component correctly", () => {
    const { getByText } = render(<SupplyTabInfo {...props} />);

    expect(getByText("Allowance")).toBeInTheDocument();
    expect(getByText("Supplied")).toBeInTheDocument();
    expect(getByText("Base Supply APY")).toBeInTheDocument();

    expect(getByText(props.allowance)).toBeInTheDocument();
    expect(getByText(props.supplied)).toBeInTheDocument();
    expect(getByText(props.baseSupplyAPY)).toBeInTheDocument();
    expect(getByText(props.projectedSupply)).toBeInTheDocument();
  });
});

describe("WithdrawTabInfo Component", () => {
  const props = {
    liquidity: "200",
    supplied: "30",
    projectedLiquidity: "250",
    baseSupplyAPY: "8%",
    projectedSupply: "35",
  };

  it("renders WithdrawTabInfo component correctly", () => {
    const { getByText } = render(<WithdrawTabInfo {...props} />);

    expect(getByText("Liquidity")).toBeInTheDocument();
    expect(getByText("Supplied")).toBeInTheDocument();
    expect(getByText("Base Supply APY")).toBeInTheDocument();

    expect(getByText(props.liquidity)).toBeInTheDocument();
    expect(getByText(props.supplied)).toBeInTheDocument();
    expect(getByText(props.projectedLiquidity)).toBeInTheDocument();
    expect(getByText(props.baseSupplyAPY)).toBeInTheDocument();
    expect(getByText(props.projectedSupply)).toBeInTheDocument();
  });
});
