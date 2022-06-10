require("@nomiclabs/hardhat-waffle");
const dotenv = require('dotenv');
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/vLyMePNJ6n6P5VWBfndgMgX2svjw-n-D',
      accounts: [
        '98a2d1575390493238797290385ba7e5c029cb708bb1b4943bfb2049ab85040f'
      ],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/60bb926b180b4eb8bcc405500a3bbd9c`,
      accounts: [
        '98a2d1575390493238797290385ba7e5c029cb708bb1b4943bfb2049ab85040f'
      ],
    }
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
};