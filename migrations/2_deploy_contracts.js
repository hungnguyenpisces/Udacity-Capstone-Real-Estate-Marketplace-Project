
let Verifier = artifacts.require("Verifier");
let SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = async function (deployer) {
  await deployer.deploy(Verifier);
  await deployer.deploy(SolnSquareVerifier, Verifier.address, "CapstoneERC721Token", "DEVIC");
};
