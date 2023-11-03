import usdcLogo from "@/assets/logos/usdc-logo.png";
import etheruemLogo from "@/assets/logos/ethereum-logo.png";
import daiLogo from "@/assets/logos/dai-logo.png";
import uxdLogo from "@/assets/logos/uxd-logo.png";
import fraxLogo from "@/assets/logos/usdc-logo.png";
import gmxLogo from "@/assets/logos/gmx-logo.png";
import uniswapLogo from "@/assets/logos/uniswap-logo.png";
import radiantLogo from "@/assets/logos/radiant-logo.png";
import aaveLogo from "@/assets/logos/aave-logo.png";
import curveLogo from "@/assets/logos/curve-logo.png";
import markerLogo from "@/assets/logos/marker-logo.png";
import compoundLogo from "@/assets/logos/compound-logo.png";

import { alchemyKey, infuraKey } from "@/utils/constants";
import { EnvironmentConfig } from "@/utils/types";

export const environmentConfig: EnvironmentConfig = {
  421613: {
    production: false,
    environmentName: "Arbitrum Testnet",
    jsonRpcUrl: `https://arb-goerli.g.alchemy.com/v2/${alchemyKey}`,
    webSocketUrl: `wss://goerli.infura.io/ws/v3/${infuraKey}`,
    contracts: {
      LendingPool: "0x7de1c0bf2d5a810b98ce9373e8195353ff4dbed1",
      LendingPoolLens: "0x7b45b2DDf88e0ceDC14172d2Fa2c0578EdEa5B9c",
      PriceFeed: "0x0d421b53964856364358D154fAdC0AF0C7B6a6D1",
      Chedda: "0x7f4329c822ee86d713140923153eEdD925673759",
      xChedda: "0x14d8C077FbFB0Bb9657C3E4D4f8E20eC7E1C7D6B",
      veChedda: "0xBC03E7E93710b2efFfFaeec29Dc3D325BD89a8dB",
      Faucet: "0x0A5Fe3dd684B1aA04d156d42C259a9feF887255e",
      GaugeController: "0xE7353D33D8b92446789cF60604D66F1044acB89f",
    },
    tokens: {
      "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8": {
        name: "USD Coin",
        symbol: "USCD.c",
        address: "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8",
        logo: usdcLogo,
      },
      "0xF359A9c19CE5AB960d9c57977831f41838A87801": {
        name: "DAI Stable coin",
        symbol: "DAI",
        address: "0xF359A9c19CE5AB960d9c57977831f41838A87801",
        logo: daiLogo,
      },
      "0xEDE0D9d8afB5dF59216C0eC19e5a79de2EcC7552": {
        name: "Frax coin",
        symbol: "FRAX",
        address: "0xEDE0D9d8afB5dF59216C0eC19e5a79de2EcC7552",
        logo: fraxLogo,
      },
      "0xdF8b23Ce429a83d29fad3CB21Ff801da75f95415": {
        name: "UXD coin",
        symbol: "UXD",
        address: "0xdF8b23Ce429a83d29fad3CB21Ff801da75f95415",
        logo: uxdLogo,
      },
      "0x364062f04922CccB89bbbE1fd03b735D09A50662": {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
        logo: etheruemLogo,
      },
      "0x247f60e4435881018a1B19eB070A09550b73612E": {
        name: "AAVE",
        symbol: "AAVE",
        address: "0x247f60e4435881018a1B19eB070A09550b73612E",
        logo: aaveLogo,
      },
      "0x8792894778B5D3df33fc9564d9f6238B79c05661": {
        name: "Uniswap",
        symbol: "UNI",
        address: "0x8792894778B5D3df33fc9564d9f6238B79c05661",
        logo: uniswapLogo,
      },
      "0xcbd5BF9E84DA3F4CB3A78B5138385805CeaAB69D": {
        name: "GMX",
        symbol: "GMX",
        address: "0xcbd5BF9E84DA3F4CB3A78B5138385805CeaAB69D",
        logo: gmxLogo,
      },
      "0x31F71e2FDA3ceE51721Fe677Eb5920372A58f091": {
        name: "Radiant",
        symbol: "RDNT",
        address: "0x31F71e2FDA3ceE51721Fe677Eb5920372A58f091",
        logo: radiantLogo,
      },
    },
  },
  5: {
    production: false,
    environmentName: "Ethereum testnet",
    jsonRpcUrl: `https://goerli.infura.io/v3/${infuraKey}`,
    webSocketUrl: `wss://goerli.infura.io/ws/v3/${infuraKey}`,
    contracts: {
      LendingPool: "0x7de1c0bf2d5a810b98ce9373e8195353ff4dbed1",
      LendingPoolLens: "0x7b45b2DDf88e0ceDC14172d2Fa2c0578EdEa5B9c",
      PriceFeed: "0x197e22F7fce8230dFa5B28d64FEcCe8fE9B68e25",
      Chedda: "0x3600cAB0053eB1Cc76fF3dF73f47130dC391eD2B",
      xChedda: "0xEDFa988f9498165fE79f09dA9e39f9dC829507D7",
      veChedda: "0x410236c7e9763891A90EE41C47826246348963dA",
      Faucet: "0x743E25655Efe790741Bf48342a05b14E83C287d2",
      GaugeController: "0xF0449d23A101bAA981EDf03152e70877139Ce51F",
    },
    tokens: {
      "0xE1e79152A2D72F0Ec79Cac0d508dfC94332E9E56": {
        name: "USD Coin",
        symbol: "USCD.c",
        address: "0xE1e79152A2D72F0Ec79Cac0d508dfC94332E9E56",
        logo: usdcLogo,
      },
      "0x55df0aF74eE7FA170AbBF7eb3F8D43d7c20De207": {
        name: "DAI Stable coin",
        symbol: "DAI",
        address: "0x55df0aF74eE7FA170AbBF7eb3F8D43d7c20De207",
        logo: daiLogo,
      },
      "0x2c01212f051A59D88A1361db1E2041896dB4af64": {
        name: "Frax coin",
        symbol: "FRAX",
        address: "0x2c01212f051A59D88A1361db1E2041896dB4af64",
        logo: fraxLogo,
      },
      "0x4f69E2b5c3a93F33932e0faFAb3B516510aa5ab6": {
        name: "UXD coin",
        symbol: "UXD",
        address: "0x4f69E2b5c3a93F33932e0faFAb3B516510aa5ab6",
        logo: uxdLogo,
      },
      "0x1afE6732d880Fa3714Dac4857723f6407140a510": {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0x1afE6732d880Fa3714Dac4857723f6407140a510",
        logo: etheruemLogo,
      },
      "0xD74913265E74F6B56FE80d18aF5ef42575c226af": {
        name: "AAVE",
        symbol: "AAVE",
        address: "0xD74913265E74F6B56FE80d18aF5ef42575c226af",
        logo: aaveLogo,
      },
      "0xC04B0FCf0d2c58b68C1C5927ed649557690A546d": {
        name: "Uniswap",
        symbol: "UNI",
        address: "0xC04B0FCf0d2c58b68C1C5927ed649557690A546d",
        logo: uniswapLogo,
      },
      "0x942940777Bd572789d72C8EcfA41f211F290167C": {
        name: "Marker",
        symbol: "MKR",
        address: "0x942940777Bd572789d72C8EcfA41f211F290167C",
        logo: markerLogo,
      },
      "0xb97e26cf10DD5BF582d4F935f15C12cf6ec649ca": {
        name: "Compound",
        symbol: "COMP",
        address: "0xb97e26cf10DD5BF582d4F935f15C12cf6ec649ca",
        logo: compoundLogo,
      },

      "0x0DaA8F99D6AFA6CfC6956569206301fc4d9F514B": {
        name: "NFT",
        symbol: "NFT",
        address: "0x0DaA8F99D6AFA6CfC6956569206301fc4d9F514B",
        logo: curveLogo,
      },
    },
  },
};
