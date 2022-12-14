const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gas: 5000000,
      gasPrice: 100000000000,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          "sing call wheat amazing day finish decrease poem color used top under",
          "wss://eth-goerli.g.alchemy.com/v2/w9JvaFGn8FNoac0xNW6ZlO9L19Vw0Z3E"
        ),
      confirmation: 2,
      network_id: '*',
      networkCheckTimeout: 10000,
      timeoutBlocks: 600,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: '^0.8.0',
    },
  },
};
