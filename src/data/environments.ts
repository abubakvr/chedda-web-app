import usdcLogo from "@/assets/logos/usdc-logo.png";
import usdtLogo from "@/assets/logos/usdt-logo.png";
import etheruemLogo from "@/assets/logos/ethereum-logo.png";
import bitcoinLogo from "@/assets/logos/bitcoin-logo.png";
import uniswapLogo from "@/assets/logos/uniswap-logo.png";
import maviaLogo from "@/assets/logos/mavia-logo.png";
import primeLogo from "@/assets/logos/prime-logo.png";
import aeroLogo from "@/assets/logos/aero-logo.png";
import aaveLogo from "@/assets/logos/aave-logo.png";
import daiLogo from "@/assets/logos/dai-logo.png";
import compoundLogo from "@/assets/logos/compound-logo.png";

import { alchemyKey } from "@/utils/constants";
import { IEnvironment } from "@/utils/types";

export const currentEnvironment: IEnvironment = {
  production: false,
  environmentName: "Base Sepolia",
  jsonRpcUrl: `https://base-sepolia.g.alchemy.com/v2/${alchemyKey}`,
  webSocketUrl: `wss://base-sepolia.g.alchemy.com/v2/${alchemyKey}`,
  txUrlPrefix: "https://sepolia.basescan.org/tx",
  contractPrefix: "https://sepolia.basescan.org/address",
  chainId: 84532,
  contracts: {
    LendingPoolLens: "0xfCd7f50b9E7117Ef7f0664D87f3823C55eeee6A1",
    InterestRatesProjector: "0x94562B7899fdFd58fDD3a7cc98Ec928568e19aD6",
    PriceFeed: "0xFe09e4d727Eda07D5C0e961EbE04c7c0f0B0C2C6",
    LockingGaugeRewardsDistributor:
      "0x09116D3De0D2A5ef27e36599f4Ed81F444e00Dba",
    CheddaToken: "0xeC7D6a60d7367681e42b1c153d38cBCde55f786D",
    veChedda: "0x0",
    Faucet: "0x0A5Fe3dd684B1aA04d156d42C259a9feF887255e",
  },
  tokens: {
    "0xc349d33292F4958d5E616035241bE2ab2dE85100": {
      name: "USD Coin",
      symbol: "USDC",
      address: "0xc349d33292F4958d5E616035241bE2ab2dE85100",
      logo: usdcLogo,
      decimals: 6,
      color: "#3498db",
    },
    "0xF621E3fF2379d9a64a614A4D8C6b0dD6fa014A18": {
      name: "Tether USD",
      symbol: "USDT",
      address: "0xF621E3fF2379d9a64a614A4D8C6b0dD6fa014A18",
      logo: usdtLogo,
      decimals: 6,
      color: "#2ecc71",
    },
    "0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b": {
      name: "DAI Stablecoin",
      symbol: "DAI",
      address: "0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b",
      logo: daiLogo,
      decimals: 18,
      color: "#FFC26F",
    },
    "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511": {
      name: "Wrapped ETH",
      symbol: "WETH",
      address: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511",
      logo: etheruemLogo,
      decimals: 18,
      color: "#687EFF",
    },
    "0x12110BA7e972D03f90fCDe07F92e603f9D1ED982": {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      address: "0x12110BA7e972D03f90fCDe07F92e603f9D1ED982",
      logo: bitcoinLogo,
      decimals: 8,
      color: "#FFC436",
    },
    "0x2d5246fcC20Df5Cdf5346254702a7cBD77E7DBC3": {
      name: "Aerodrome",
      symbol: "AERO",
      address: "0x2d5246fcC20Df5Cdf5346254702a7cBD77E7DBC3",
      logo: aeroLogo,
      decimals: 18,
      color: "#D8D8D8",
    },
    "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0": {
      name: "AAVE",
      symbol: "AAVE",
      address: "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0",
      logo: aaveLogo,
      decimals: 18,
      color: "#DDE6ED",
    },
    "0xC58bb755381C43FC8A9505fFa7C44d8737203300": {
      name: "Compound",
      symbol: "COMP",
      address: "0xC58bb755381C43FC8A9505fFa7C44d8737203300",
      logo: compoundLogo,
      decimals: 18,
      color: "#85CDFD",
    },
    "0x8166D0DeFb96900075a667FFb099DE8A493A4DfD": {
      name: "Uniswap",
      symbol: "UNI",
      address: "0x8166D0DeFb96900075a667FFb099DE8A493A4DfD",
      logo: uniswapLogo,
      decimals: 18,
      color: "#E26EE5",
    },
    "0xFcA37314E6E1e399e7054C14B2746f3BC9F33fEB": {
      name: "Echelon Prime",
      symbol: "PRIME",
      address: "0xFcA37314E6E1e399e7054C14B2746f3BC9F33fEB",
      logo: primeLogo,
      decimals: 18,
      color: "#0E8388",
    },
    "0xc1e5599f1ac90995762302D946AF619bD9824813": {
      name: "Heroes of Mavia",
      symbol: "MAVIA",
      address: "0xc1e5599f1ac90995762302D946AF619bD9824813",
      logo: maviaLogo,
      decimals: 18,
      color: "#DDE6ED",
    },
  },
};
