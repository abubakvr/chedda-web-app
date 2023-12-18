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

import { alchemyKey, infuraKey } from "@/utils/constants";
import { IEnvironmentConfig } from "@/utils/types";

export const environmentConfig: IEnvironmentConfig = {
  11155111: {
    production: false,
    environmentName: "Ethereum testnet",
    jsonRpcUrl: `https://sepolia.infura.io/v3/${infuraKey}`,
    webSocketUrl: `wss://sepolia.infura.io/ws/v3/${infuraKey}`,
    chainId: 11155111,
    contracts: {
      LendingPool: "0x7de1c0bf2d5a810b98ce9373e8195353ff4dbed1",
      LendingPoolLens: "0x8b2eAF4193EB3c0345739dfAb1FF56EdeD3A15E8",
      PriceFeed: "0xdc33C1aFD2060c8D5C14476F4802F2FD850f85C3",
      Chedda: "0xC58bb755381C43FC8A9505fFa7C44d8737203300",
      xChedda: "0xB362b1Da2814400740FDF221964631f10Cd34255",
      veChedda: "0x410236c7e9763891A90EE41C47826246348963dA",
      Faucet: "0x743E25655Efe790741Bf48342a05b14E83C287d2",
      GaugeController: "0xF0449d23A101bAA981EDf03152e70877139Ce51F",
    },
    tokens: {
      "0xeC7D6a60d7367681e42b1c153d38cBCde55f786D": {
        name: "USD Coin",
        symbol: "USDC",
        address: "0xeC7D6a60d7367681e42b1c153d38cBCde55f786D",
        logo: usdcLogo,
        decimals: 6,
        color: "#3498db",
      },
      "0x99759489e8F7f42a72204f1e516Fab7ea39B8e42": {
        name: "Tether USD",
        symbol: "USDT",
        address: "0x99759489e8F7f42a72204f1e516Fab7ea39B8e42",
        logo: usdtLogo,
        decimals: 6,
        color: "#1abc9c",
      },
      "0xFcA37314E6E1e399e7054C14B2746f3BC9F33fEB": {
        name: "DAI Stablecoin",
        symbol: "DAI",
        address: "0xFcA37314E6E1e399e7054C14B2746f3BC9F33fEB",
        logo: daiLogo,
        decimals: 18,
        color: "#FFC26F",
      },
      "0xc1e5599f1ac90995762302D946AF619bD9824813": {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0xc1e5599f1ac90995762302D946AF619bD9824813",
        logo: etheruemLogo,
        decimals: 18,
        color: "#687EFF",
      },
      "0xFe09e4d727Eda07D5C0e961EbE04c7c0f0B0C2C6": {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        address: "0xFe09e4d727Eda07D5C0e961EbE04c7c0f0B0C2C6",
        logo: bitcoinLogo,
        decimals: 8,
        color: "#FFC436",
      },
    },
  },
  421614: {
    production: false,
    environmentName: "Arbitrum Sepolia",
    jsonRpcUrl: `https://arbitrum-sepolia.infura.io/v3/${infuraKey}`,
    webSocketUrl: `wss://arb-sepolia.g.alchemy.com/v2/${alchemyKey}`,
    chainId: 421614,
    contracts: {
      LendingPool: "0x7de1c0bf2d5a810b98ce9373e8195353ff4dbed1",
      LendingPoolLens: "0xcd7AbFd6Cb848A5397A29fCC8Cb5D4CE9C993814",
      PriceFeed: "0x5D0d03A506F2df4Bcf8fa022027FCcEd7fF639d1",
      Chedda: "0xAdBCD031E337453a2451f336194F9912Ff3D0893",
      xChedda: "0x5c35eD563029a9D7B37a60EC2C964fC7d37672E5",
      veChedda: "0xBC03E7E93710b2efFfFaeec29Dc3D325BD89a8dB",
      Faucet: "0x0A5Fe3dd684B1aA04d156d42C259a9feF887255e",
      GaugeController: "0xE7353D33D8b92446789cF60604D66F1044acB89f",
    },
    tokens: {
      "0x311F0DD563582f7a94ED605429446dCc6bA68bBF": {
        name: "USD Coin",
        symbol: "USDC",
        address: "0x311F0DD563582f7a94ED605429446dCc6bA68bBF",
        logo: usdcLogo,
        decimals: 6,
        color: "#3498db",
      },
      "0x0dbb7d305434d01cd9E408b0ddc5A227d563a921": {
        name: "Tether USD",
        symbol: "USDT",
        address: "0x0dbb7d305434d01cd9e408b0ddc5a227d563a921",
        logo: usdtLogo,
        decimals: 6,
        color: "#2ecc71",
      },
      "0xCBfa283cCc60CF5151AAf5f73F9513e7321c8483": {
        name: "DAI Stablecoin",
        symbol: "DAI",
        address: "0xCBfa283cCc60CF5151AAf5f73F9513e7321c8483",
        logo: daiLogo,
        decimals: 18,
        color: "#FFC26F",
      },
      "0x94562B7899fdFd58fDD3a7cc98Ec928568e19aD6": {
        name: "Wrapped ETH",
        symbol: "WETH",
        address: "0x94562B7899fdFd58fDD3a7cc98Ec928568e19aD6",
        logo: etheruemLogo,
        decimals: 18,
        color: "#687EFF",
      },
      "0x3266275A2D62BE0634146DF767E8505A2173708E": {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        address: "0x3266275A2D62BE0634146DF767E8505A2173708E",
        logo: bitcoinLogo,
        decimals: 8,
        color: "#FFC436",
      },
      "0x513a37DfC7D17Bb285FF771D9b60853c55aD0C65": {
        name: "Arbitrum",
        symbol: "ARB",
        address: "0x513a37DfC7D17Bb285FF771D9b60853c55aD0C65",
        logo: arbtrumLogo,
        decimals: 18,
        color: "#D8D8D8",
      },
      "0xd81c875c667f3930A4edC67776f3C0C5CC777AE9": {
        name: "GMX",
        symbol: "GMX",
        address: "0xd81c875c667f3930A4edC67776f3C0C5CC777AE9",
        logo: gmxLogo,
        decimals: 18,
        color: "#85CDFD",
      },
      "0xaEea70F81C41A2Af80DE86467eeBB51A2DAB6fb3": {
        name: "Radiant",
        symbol: "RDNT",
        address: "0xaEea70F81C41A2Af80DE86467eeBB51A2DAB6fb3",
        logo: radiantLogo,
        decimals: 18,
        color: "#0E8388",
      },
      "0x2243C1F4FbB5F67bE6D349cB4b744c3CcEDB38cA": {
        name: "Uniswap",
        symbol: "UNI",
        address: "0x2243C1F4FbB5F67bE6D349cB4b744c3CcEDB38cA",
        logo: uniswapLogo,
        decimals: 18,
        color: "#E26EE5",
      },
      "0x6a13988035609CbBa58894144DBF83c9dACA2f83": {
        name: "AAVE",
        symbol: "AAVE",
        address: "0x6a13988035609CbBa58894144DBF83c9dACA2f83",
        logo: aaveLogo,
        decimals: 18,
        color: "#DDE6ED",
      },
    },
  },
};
