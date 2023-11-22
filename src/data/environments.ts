import usdcLogo from "@/assets/logos/usdc-logo.png";
import usdtLogo from "@/assets/logos/usdt-logo.png";
import etheruemLogo from "@/assets/logos/ethereum-logo.png";
import bitcoinLogo from "@/assets/logos/bitcoin-logo.png";
import arbtrumLogo from "@/assets/logos/arbitrum-logo.png";
import daiLogo from "@/assets/logos/dai-logo.png";
import gmxLogo from "@/assets/logos/gmx-logo.png";
import uniswapLogo from "@/assets/logos/uniswap-logo.png";
import radiantLogo from "@/assets/logos/radiant-logo.png";
import aaveLogo from "@/assets/logos/aave-logo.png";

import { alchemyKey } from "@/utils/constants";
import { IEnvironmentConfig } from "@/utils/types";

export const environmentConfig: IEnvironmentConfig = {
  421613: {
    production: false,
    environmentName: "Arbitrum Testnet",
    jsonRpcUrl: `https://arb-goerli.g.alchemy.com/v2/${alchemyKey}`,
    webSocketUrl: `wss://arb-goerli.g.alchemy.com/v2/${alchemyKey}`,
    chainId: 421613,
    contracts: {
      LendingPool: "0x7de1c0bf2d5a810b98ce9373e8195353ff4dbed1",
      LendingPoolLens: "0x98bca9f9508815d4400057797A3Fa397815dDaE0",
      PriceFeed: "0xaff2587D12C6F27ACa7dA5c431b82BADa1d11edf",
      Chedda: "0x7f4329c822ee86d713140923153eEdD925673759",
      xChedda: "0x14d8C077FbFB0Bb9657C3E4D4f8E20eC7E1C7D6B",
      veChedda: "0xBC03E7E93710b2efFfFaeec29Dc3D325BD89a8dB",
      Faucet: "0x0A5Fe3dd684B1aA04d156d42C259a9feF887255e",
      GaugeController: "0xE7353D33D8b92446789cF60604D66F1044acB89f",
    },
    tokens: {
      "0x7079ef81bcFB2CfBE9699c79238b690a76848c73": {
        name: "USD Coin",
        symbol: "USDC",
        address: "0x7079ef81bcFB2CfBE9699c79238b690a76848c73",
        logo: usdcLogo,
        decimals: 6,
      },
      "0x2c5E809920f1d2b7e24F35e98816fA3314A362e2": {
        name: "Tether USD",
        symbol: "USDT",
        address: "0x2c5E809920f1d2b7e24F35e98816fA3314A362e2",
        logo: usdtLogo,
        decimals: 6,
      },
      "0x099f93DA9555868Bfe2cCf32965917187C145410": {
        name: "DAI Stablecoin",
        symbol: "DAI",
        address: "0x099f93DA9555868Bfe2cCf32965917187C145410",
        logo: daiLogo,
        decimals: 18,
      },
      "0xa2241D1339eDAD35c56F1834a54272BB70acf7AE": {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0xa2241D1339eDAD35c56F1834a54272BB70acf7AE",
        logo: etheruemLogo,
        decimals: 18,
      },
      "0xa0DDF73A63EBe3355d8255e7561b2Ae75be4EDa6": {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        address: "se",
        logo: bitcoinLogo,
        decimals: 8,
      },
      "0x139cEb07253A889D3Bafb8A6d59584bFBB34d273": {
        name: "Arbitrum",
        symbol: "ARB",
        address: "0x139cEb07253A889D3Bafb8A6d59584bFBB34d273",
        logo: arbtrumLogo,
        decimals: 18,
      },

      "0x83d76CDdb63Cf2A39e7Dd4C7780EbE77f35855c5": {
        name: "GMX",
        symbol: "GMX",
        address: "0x83d76CDdb63Cf2A39e7Dd4C7780EbE77f35855c5",
        logo: gmxLogo,
        decimals: 18,
      },

      "0x1F93d37c7591d3f799fEa073cD062F9F39097542": {
        name: "Radiant",
        symbol: "RDNT",
        address: "0x1F93d37c7591d3f799fEa073cD062F9F39097542",
        logo: radiantLogo,
        decimals: 18,
      },

      "0x534a60C253Fa39E97a5cdB2ae6fEaf95159985ec": {
        name: "Uniswap",
        symbol: "UNI",
        address: "0x534a60C253Fa39E97a5cdB2ae6fEaf95159985ec",
        logo: uniswapLogo,
        decimals: 18,
      },

      "0xE4a7e1A408D8b7344620412C20Ad519E3792556b": {
        name: "AAVE",
        symbol: "AAVE",
        address: "0xE4a7e1A408D8b7344620412C20Ad519E3792556b",
        logo: aaveLogo,
        decimals: 18,
      },
    },
  },
  5: {
    production: false,
    environmentName: "Ethereum testnet",
    jsonRpcUrl: `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
    webSocketUrl: `wss://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
    chainId: 5,
    contracts: {
      LendingPool: "0x7de1c0bf2d5a810b98ce9373e8195353ff4dbed1",
      LendingPoolLens: "0xb0B3B0C8131Ae58959661127a992D19CA9D3Ce81",
      PriceFeed: "0x197e22F7fce8230dFa5B28d64FEcCe8fE9B68e25",
      Chedda: "0x3600cAB0053eB1Cc76fF3dF73f47130dC391eD2B",
      xChedda: "0xEDFa988f9498165fE79f09dA9e39f9dC829507D7",
      veChedda: "0x410236c7e9763891A90EE41C47826246348963dA",
      Faucet: "0x743E25655Efe790741Bf48342a05b14E83C287d2",
      GaugeController: "0xF0449d23A101bAA981EDf03152e70877139Ce51F",
    },
    tokens: {
      "0x81df92DE8FD8bEa04A84E4c5Bad94A3daeEB2Fc1": {
        name: "USD Coin",
        symbol: "USDC",
        address: "0x81df92DE8FD8bEa04A84E4c5Bad94A3daeEB2Fc1",
        logo: usdcLogo,
        decimals: 6,
      },
      "0x7461B8581CFf2A8180BbaA193c7D266DcdDE1648": {
        name: "Tether USD",
        symbol: "USDT",
        address: "0x7461B8581CFf2A8180BbaA193c7D266DcdDE1648",
        logo: usdtLogo,
        decimals: 6,
      },
      "0x24Ab93F8863c17Af96d10df341B622E8ac613075": {
        name: "DAI Stable coin",
        symbol: "DAI",
        address: "0x24Ab93F8863c17Af96d10df341B622E8ac613075",
        logo: daiLogo,
        decimals: 18,
      },
      "0xF03244fB176279E572edC771CA57Ebb0f31201Df": {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0xF03244fB176279E572edC771CA57Ebb0f31201Df",
        logo: etheruemLogo,
        decimals: 18,
      },
      "0xe26ad5248ef917792e9540A8e688BfCA57d55441": {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        address: "0xe26ad5248ef917792e9540A8e688BfCA57d55441",
        logo: bitcoinLogo,
        decimals: 8,
      },
    },
  },
};
