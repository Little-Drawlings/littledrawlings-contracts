
const hre = require("hardhat");
const fs = require('fs');
require('@nomiclabs/hardhat-etherscan');

const AWS = require('aws-sdk');

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("LittleDrawlingsNFTFlattened");
  const MyNFTDeploy = await MyNFT.deploy();
  const MyNFTDeployed = await MyNFTDeploy.deployed();

  const address = await MyNFTDeployed.address;

  console.log(address);

  if (!address) return;

  const MyNftJSON = JSON.parse(fs.readFileSync('./artifacts/contracts/LittleDrawlingsNFTFlattened.sol/LittleDrawlingsNFTFlattened.json', 'utf8'));
  const fileResult = JSON.stringify({
    address: address,
    abi: MyNftJSON.abi
  })

  const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');

  this.s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
  });

  const key = `abi-space/abi.json`;
  const params = {
    Bucket: 'ld-s3-dev',
    Key: key,
    Body: fileResult,
    ContentType: 'json',
    ACL: "public-read",
  };

  await new Promise((resolve) => {
    this.s3.putObject(params, function (err) {
      if (err) {
        console.log('[FILE - SAVE]: ERROR ', err);
        resolve(null);
      }
    });
  })

  hre.run('verify:verify', {
    address: address,
    constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
