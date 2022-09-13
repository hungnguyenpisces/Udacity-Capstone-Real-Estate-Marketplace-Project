const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require('web3');

require('dotenv').config();

const MNEMONIC = "sing call wheat amazing day finish decrease poem color used top under";
const INFURA_KEY = "w9JvaFGn8FNoac0xNW6ZlO9L19Vw0Z3E";
const CONTRACT_ADDRESS = "0x6d49a7868C37C35173DCa74337D3c7506fD88117";
const OWNER_ADDRESS = "0x4656691A3E008D4BB037e711042aaD3603612b0a";
const NETWORK = "rinkeby";

const NUM_TOKENS = 10;
const CONTRACT_FILE = require('./build/contracts/SolnSquareVerifier');
const NFT_ABI = CONTRACT_FILE.abi;

if (!MNEMONIC || !INFURA_KEY || !CONTRACT_ADDRESS || !OWNER_ADDRESS || !NETWORK) {
  console.error("Please set a mnemonic, infura key, owner, network, and contract address.");
  return;
}

const PROOF_FILE = require('./zokrates/code/square/proof.json');

if (!PROOF_FILE) {
  console.error("Proof file failed: please create a zokrates proof.json");
  return;
}

async function main() {
  const provider = new HDWalletProvider(MNEMONIC, `wss://eth-goerli.g.alchemy.com/v2/${INFURA_KEY}`);
  const web3Instance = new web3(provider);
  const contract = new web3Instance.eth.Contract(NFT_ABI, CONTRACT_ADDRESS, { gasLimit: "1000000" });
  const { proof, inputs } = PROOF_FILE;
  const { a, b, c } = proof;

  for (var i = 0; i < NUM_TOKENS; i++) {

    await contract.methods.mintNFT(i + 1, a, b, c, inputs)
      .send({ from: OWNER_ADDRESS, gas: 3000000 }, (error, result) => {
        if (error) console.log(error);
        else console.log("Minted Token. Transaction: " + result);
      });
  }
}

main();