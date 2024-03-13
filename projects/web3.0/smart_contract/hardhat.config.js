require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

// https://eth-goerli.g.alchemy.com/v2/JHPq35WxaaJ86ncfig6pecPImBnh_Lpe

const ALCHEMY_API_KEY = "JHPq35WxaaJ86ncfig6pecPImBnh_Lpe";
const GOERLI_PRIVATE_KEY = "a0b2bbeb1ac42c7e099a089a251f721784c1a52ad9ce2bdb5c7923bfbd9c3d25";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
