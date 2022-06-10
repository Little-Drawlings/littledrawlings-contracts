const hre = require('hardhat');
require('@nomiclabs/hardhat-etherscan');

async function main() {
    await hre.run('verify:verify', {
        address: process.env.CONTRACT_ADDRESS,
        constructorArguments: [],
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

