
const hre = require('hardhat');
require('@nomiclabs/hardhat-etherscan');

async function main() {
    await hre.run('verify:verify', {
        address: '0x2C7f09B132cfAAeC50EA1a00861127E00Bc03e08',
        constructorArguments: [],
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});