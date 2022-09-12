
let SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
let CapstoneERC721Token = artifacts.require("CapstoneERC721Token");
let Verifier = artifacts.require("Verifier");

module.exports = async function (deployer) {
  await deployer.deploy(CapstoneERC721Token);
  await deployer.deploy(Verifier);
  await deployer.deploy(SolnSquareVerifier, Verifier.address);
};
