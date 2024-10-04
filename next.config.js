/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_INFURA_KEY: process.env.REACT_APP_INFURA_KEY,
    REACT_APP_ALCHEMY_KEY: process.env.REACT_APP_ALCHEMY_KEY,
    WALLECONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
  },
};

module.exports = nextConfig;
