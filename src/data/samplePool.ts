import usdcLogo from "@/assets/logos/usdc-logo.png";
import etheruemLogo from "@/assets/logos/ethereum-logo.png";
import daiLogo from "@/assets/logos/dai-logo.png";
import uxdLogo from "@/assets/logos/uxd-logo.png";
import fraxLogo from "@/assets/logos/usdc-logo.png";
import gmxLogo from "@/assets/logos/gmx-logo.png";
import uniswapLogo from "@/assets/logos/uniswap-logo.png";
import radiantLogo from "@/assets/logos/radiant-logo.png";
import aaveLogo from "@/assets/logos/aave-logo.png";

export const samplePools = [
  {
    name: "USDC/WETH Pool",
    address: "0xB27595Bedd063935ca146EB46ee7CaE40F696f7E",
    asset: {
      name: "USD Coin",
      symbol: "USDC",
      address: "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8",
      logo: usdcLogo,
    },
    collateral: [
      {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
        logo: etheruemLogo,
      },
    ],
    stats: {
      totalSupply: 3.14,
      supplyApy: 13.04,
      totalBorrow: 17.14,
      borrowApy: 29.67,
      utilization: 40.14,
    },
  },
  {
    name: "DAI/WETH Pool",
    address: "0x1c89B84C5932badDc3c3889B1b0B1666cc53eFAB",
    asset: {
      name: "Dai Stalbcoin",
      symbol: "DAI",
      address: "0xF359A9c19CE5AB960d9c57977831f41838A87801",
      logo: daiLogo,
    },
    collateral: [
      {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
        logo: etheruemLogo,
      },
    ],
    stats: {
      totalSupply: 3.14,
      supplyApy: 13.04,
      totalBorrow: 17.14,
      borrowApy: 29.67,
      utilization: 40.14,
    },
  },
  {
    name: "UXD/WETH Pool",
    address: "0x41EBd597aCf37F7bC4e70BC49241fF16ED650189",
    asset: {
      name: "UXD",
      symbol: "UXD",
      address: "0xdF8b23Ce429a83d29fad3CB21Ff801da75f95415",
      logo: uxdLogo,
    },
    collateral: [
      {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
        logo: etheruemLogo,
      },
    ],
    stats: {
      totalSupply: 3.14,
      supplyApy: 13.04,
      totalBorrow: 17.14,
      borrowApy: 29.67,
      utilization: 40.14,
    },
  },
  {
    name: "Native Asset Pool",
    address: "0xd663fA792df7E9D749F20c9c2F6D29FF4957Cae8",
    asset: {
      name: "Wrapped ETH",
      symbol: "WETH",
      address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
      logo: etheruemLogo,
    },
    collateral: [
      {
        name: "USD Coin",
        symbol: "USCD.c",
        address: "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8",
        logo: usdcLogo,
      },
      {
        name: "Dai Stalbcoin",
        symbol: "DAI",
        address: "0xF359A9c19CE5AB960d9c57977831f41838A87801",
        logo: daiLogo,
      },
      {
        name: "Frax",
        symbol: "FRAX",
        address: "0xEDE0D9d8afB5dF59216C0eC19e5a79de2EcC7552",
        logo: fraxLogo,
      },
    ],
    stats: {
      totalSupply: 3.14,
      supplyApy: 13.04,
      totalBorrow: 17.14,
      borrowApy: 29.67,
      utilization: 40.14,
    },
  },
  {
    name: "USDC DeFi Pool",
    address: "0xf62b9B1171feF6599FcE3fE09569B5ABc4d66912",
    asset: {
      name: "USD Coin",
      symbol: "USCD.c",
      address: "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8",
      logo: usdcLogo,
    },
    collateral: [
      {
        name: "Radiant",
        symbol: "RDNT",
        address: "0x31F71e2FDA3ceE51721Fe677Eb5920372A58f091",
        logo: radiantLogo,
      },
      {
        name: "Uniswap",
        symbol: "UNI",
        address: "0x8792894778B5D3df33fc9564d9f6238B79c05661",
        logo: uniswapLogo,
      },
      {
        name: "AAVE",
        symbol: "AAVE",
        address: "0x247f60e4435881018a1B19eB070A09550b73612E",
        logo: aaveLogo,
      },
      {
        name: "GMX",
        symbol: "GMX",
        address: "0xcbd5BF9E84DA3F4CB3A78B5138385805CeaAB69D",
        logo: gmxLogo,
        isNFT: true,
      },
    ],
    stats: {
      totalSupply: 3.14,
      supplyApy: 13.04,
      totalBorrow: 17.14,
      borrowApy: 29.67,
      utilization: 40.14,
    },
  },
];
