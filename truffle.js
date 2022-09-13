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
          "https://rinkeby.infura.io/v3/c2886ad777634746b29b9ab3fe18bf3c"
        ),
      gas: 5000000,
      gasPrice: 50000000000,
      confirmation: 2,
      network_id: '4',
      networkCheckTimeout: 10000,
      timeoutBlocks: 600
    },
  },
  compilers: {
    solc: {
      version: '^0.8.0',
    },
  },
};
