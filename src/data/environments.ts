export const environments = [
  {
    production: false,
    environmentName: "Arbitrum Testnet",
    identifier: "Arbitrum",
    jsonRpcUrl:
      "https://arb-goerli.g.alchemy.com/v2/MjKCCMegGWN3PDm1Kt2vCAXhoKQd0XxR",
    webSocketUrl:
      "wss://arb-goerli.g.alchemy.com/v2/MjKCCMegGWN3PDm1Kt2vCAXhoKQd0XxR",
    config: {
      contracts: {
        ChainlinkPriceConsumer: "",
        CheddaMarketExplorer: "",
        CheddaBaseTokenVault: "",
        PriceFeed: "0x0d421b53964856364358D154fAdC0AF0C7B6a6D1",
        Chedda: "0x7f4329c822ee86d713140923153eEdD925673759",
        xChedda: "0x14d8C077FbFB0Bb9657C3E4D4f8E20eC7E1C7D6B",
        veChedda: "0xBC03E7E93710b2efFfFaeec29Dc3D325BD89a8dB",
        USDC: "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8",
        DAI: "0xF359A9c19CE5AB960d9c57977831f41838A87801",
        FRAX: "0xEDE0D9d8afB5dF59216C0eC19e5a79de2EcC7552",
        UXD: "0xdF8b23Ce429a83d29fad3CB21Ff801da75f95415",
        NFT: "0xA36d30A62Cf2E1D4731A32DFD3d468514FFA99d9",
        mUSDC: "",
        WrappedNative: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
        Faucet: "0x0A5Fe3dd684B1aA04d156d42C259a9feF887255e",
        GaugeController: "0xE7353D33D8b92446789cF60604D66F1044acB89f",
      },
      pools: [
        {
          name: "USDC/WETH Pool",
          address: "0xB27595Bedd063935ca146EB46ee7CaE40F696f7E",
          asset: {
            name: "USD Coin",
            symbol: "USDC",
            address: "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8",
            logo: "/assets/logos/usdc-logo.png",
          },
          collateral: [
            {
              name: "Wrapped ETH",
              symbol: "WETH",
              address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
              logo: "/assets/logos/ethereum-logo.png",
            },
          ],
        },
        {
          name: "DAI/WETH Pool",
          address: "0x1c89B84C5932badDc3c3889B1b0B1666cc53eFAB",
          asset: {
            name: "Dai Stalbcoin",
            symbol: "DAI",
            address: "0xF359A9c19CE5AB960d9c57977831f41838A87801",
            logo: "/assets/logos/dai-logo.png",
          },
          collateral: [
            {
              name: "Wrapped ETH",
              symbol: "WETH",
              address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
              logo: "/assets/logos/ethereum-logo.png",
            },
          ],
        },
        {
          name: "UXD/WETH Pool",
          address: "0x41EBd597aCf37F7bC4e70BC49241fF16ED650189",
          asset: {
            name: "UXD",
            symbol: "UXD",
            address: "0xdF8b23Ce429a83d29fad3CB21Ff801da75f95415",
            logo: "/assets/logos/uxd-logo.png",
          },
          collateral: [
            {
              name: "Wrapped ETH",
              symbol: "WETH",
              address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
              logo: "/assets/logos/ethereum-logo.png",
            },
          ],
        },
        {
          name: "Native Asset Pool",
          address: "0xd663fA792df7E9D749F20c9c2F6D29FF4957Cae8",
          asset: {
            name: "Wrapped ETH",
            symbol: "WETH",
            address: "0x364062f04922CccB89bbbE1fd03b735D09A50662",
            logo: "/assets/logos/ethereum-logo.png",
          },
          collateral: [
            {
              name: "USD Coin",
              symbol: "USCD.c",
              address: "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8",
              logo: "/assets/logos/usdc-logo.png",
            },
            {
              name: "Dai Stalbcoin",
              symbol: "DAI",
              address: "0xF359A9c19CE5AB960d9c57977831f41838A87801",
              logo: "/assets/logos/dai-logo.png",
            },
            {
              name: "Frax",
              symbol: "FRAX",
              address: "0xEDE0D9d8afB5dF59216C0eC19e5a79de2EcC7552",
              logo: "/assets/logos/frax-logo.png",
            },
          ],
        },
        {
          name: "USDC DeFi Pool",
          address: "0xf62b9B1171feF6599FcE3fE09569B5ABc4d66912",
          asset: {
            name: "USD Coin",
            symbol: "USCD.c",
            address: "0x4f8E5950F28299414bb6Be72937c6491c0a3BAd8",
            logo: "/assets/logos/usdc-logo.png",
          },
          collateral: [
            {
              name: "Radiant",
              symbol: "RDNT",
              address: "0x31F71e2FDA3ceE51721Fe677Eb5920372A58f091",
              logo: "/assets/logos/radiant-logo.png",
            },
            {
              name: "Uniswap",
              symbol: "UNI",
              address: "0x8792894778B5D3df33fc9564d9f6238B79c05661",
              logo: "/assets/logos/uniswap-logo.png",
            },
            {
              name: "AAVE",
              symbol: "AAVE",
              address: "0x247f60e4435881018a1B19eB070A09550b73612E",
              logo: "/assets/logos/aave-logo.png",
            },
            {
              name: "GMX",
              symbol: "GMX",
              address: "0xcbd5BF9E84DA3F4CB3A78B5138385805CeaAB69D",
              logo: "/assets/logos/gmx-logo.png",
              isNFT: true,
            },
          ],
          stats: {},
        },
      ],
      faucets: [
        {
          name: "Arbitrum Goerli Faucet",
          logo: "",
          url: "https://goerlifaucet.com/",
        },
      ],
      ui: {
        chainName: "Arbitrum",
        logo: "/assets/logos/arbitrum-logo.png",
        txUrlPrefix: "https://goerli.arbiscan.io/tx/",
      },
    },
  },
  {
    production: false,
    environmentName: "Ethereum testnet",
    identifier: "Ethereum",
    jsonRpcUrl: "https://goerli.infura.io/v3/d674ad7889a4404c960e18610cf74a3a",
    webSocketUrl:
      "wss://goerli.infura.io/ws/v3/d674ad7889a4404c960e18610cf74a3a",
    config: {
      contracts: {
        CheddaBaseTokenVault: "",
        ChainlinkPriceConsumer: "",
        CheddaMarketExplorer: "",
        PriceFeed: "0x197e22F7fce8230dFa5B28d64FEcCe8fE9B68e25",
        Chedda: "0x3600cAB0053eB1Cc76fF3dF73f47130dC391eD2B",
        xChedda: "0xEDFa988f9498165fE79f09dA9e39f9dC829507D7",
        veChedda: "0x410236c7e9763891A90EE41C47826246348963dA",
        USDC: "0xE1e79152A2D72F0Ec79Cac0d508dfC94332E9E56",
        DAI: "0x55df0aF74eE7FA170AbBF7eb3F8D43d7c20De207",
        FRAX: "0x2c01212f051A59D88A1361db1E2041896dB4af64",
        UXD: "0x4f69E2b5c3a93F33932e0faFAb3B516510aa5ab6",
        NFT: "0x0DaA8F99D6AFA6CfC6956569206301fc4d9F514B",
        mUSDC: "",
        WrappedNative: "0x1afE6732d880Fa3714Dac4857723f6407140a510",
        Faucet: "0x743E25655Efe790741Bf48342a05b14E83C287d2",
        GaugeController: "0xF0449d23A101bAA981EDf03152e70877139Ce51F",
      },
      pools: [
        {
          name: "USDC/WETH Pool",
          address: "0x7913128EBCede44Bf19EF608b20a08B45E33f003",
          asset: {
            name: "USD Coin",
            symbol: "USCD.c",
            address: "0xE1e79152A2D72F0Ec79Cac0d508dfC94332E9E56",
            logo: "/assets/logos/usdc-logo.png",
          },
          collateral: [
            {
              name: "Wrapped ETH",
              symbol: "WETH",
              address: "0x1afE6732d880Fa3714Dac4857723f6407140a510",
              logo: "/assets/logos/ethereum-logo.png",
            },
          ],
        },
        {
          name: "DAI/WETH Pool",
          address: "0xA8680a47945dbd9d58364f30edec745eF62fe975",
          asset: {
            name: "Dai Stalbcoin",
            symbol: "DAI",
            address: "0x55df0aF74eE7FA170AbBF7eb3F8D43d7c20De207",
            logo: "/assets/logos/dai-logo.png",
          },
          collateral: [
            {
              name: "Wrapped ETH",
              symbol: "WETH",
              address: "0x1afE6732d880Fa3714Dac4857723f6407140a510",
              logo: "/assets/logos/ethereum-logo.png",
            },
          ],
        },
        {
          name: "UXD/WETH Pool",
          address: "0xA824D0b777bf53fA9E1FE26Dbf1b20733b46A1A4",
          asset: {
            name: "UXD",
            symbol: "UXD",
            address: "0x4f69E2b5c3a93F33932e0faFAb3B516510aa5ab6",
            logo: "/assets/logos/uxd-logo.png",
          },
          collateral: [
            {
              name: "Wrapped ETH",
              symbol: "WETH",
              address: "0x1afE6732d880Fa3714Dac4857723f6407140a510",
              logo: "/assets/logos/ethereum-logo.png",
            },
          ],
        },
        {
          name: "Native Asset Pool",
          address: "0xE36aCa977430E9Cf725a10baF42aC8e29D4920Db",
          asset: {
            name: "Wrapped ETH",
            symbol: "WETH",
            address: "0x1afE6732d880Fa3714Dac4857723f6407140a510",
            logo: "/assets/logos/ethereum-logo.png",
          },
          collateral: [
            {
              name: "USD Coin",
              symbol: "USCD.c",
              address: "0xE1e79152A2D72F0Ec79Cac0d508dfC94332E9E56",
              logo: "/assets/logos/usdc-logo.png",
            },
            {
              name: "Dai Stalbcoin",
              symbol: "DAI",
              address: "0x55df0aF74eE7FA170AbBF7eb3F8D43d7c20De207",
              logo: "/assets/logos/dai-logo.png",
            },
            {
              name: "Frax",
              symbol: "FRAX",
              address: "0x2c01212f051A59D88A1361db1E2041896dB4af64",
              logo: "/assets/logos/frax-logo.png",
            },
          ],
        },
        {
          name: "USDC Defi Pool",
          address: "0xa70d950ADbD15f809eA26d5AE071741827f35820",
          asset: {
            name: "USD Coin",
            symbol: "USCD.c",
            address: "0xE1e79152A2D72F0Ec79Cac0d508dfC94332E9E56",
            logo: "/assets/logos/usdc-logo.png",
          },
          collateral: [
            {
              name: "Compound",
              symbol: "COMP",
              address: "0xb97e26cf10DD5BF582d4F935f15C12cf6ec649ca",
              logo: "/assets/logos/compound-logo.png",
            },
            {
              name: "Uniswap",
              symbol: "UNI",
              address: "0xC04B0FCf0d2c58b68C1C5927ed649557690A546d",
              logo: "/assets/logos/uniswap-logo.png",
            },
            {
              name: "Marker",
              symbol: "MKR",
              address: "0x942940777Bd572789d72C8EcfA41f211F290167C",
              logo: "/assets/logos/marker-logo.png",
            },
            {
              name: "AAVE",
              symbol: "AAVE",
              address: "0xD74913265E74F6B56FE80d18aF5ef42575c226af",
              logo: "/assets/logos/aave-logo.png",
            },
            {
              name: "Curve",
              symbol: "CRV",
              address: "0xa3953E0C2C69137EF2e83A78f77E95CAeb14BAA9",
              logo: "/assets/logos/curve-logo.png",
              isNFT: true,
            },
          ],
          stats: {},
        },
      ],
      faucets: [
        {
          name: "Goerli Faucet",
          logo: "",
          url: "https://goerlifaucet.com/",
        },
      ],
      ui: {
        chainName: "Ethereum",
        logo: "/assets/logos/ethereum-logo.png",
        txUrlPrefix: "https://goerli.etherscan.io/tx/",
      },
    },
  },
];
