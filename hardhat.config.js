require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.7",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
        networks: {
            ropsten: {
                url: process.env.ROPSTEN_URL || "",
                accounts:
                    process.env.PRIVATE_KEY !== undefined
                        ? [process.env.PRIVATE_KEY]
                        : [],
            },
        },
        gasReporter: {
            enabled: true,
            currency: "USD",
        },
        etherscan: {
            apiKey: process.env.ETHERSCAN_API_KEY,
        },
    },
};
