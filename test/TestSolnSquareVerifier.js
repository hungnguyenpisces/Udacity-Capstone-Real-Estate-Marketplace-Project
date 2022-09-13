// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

contract('TestSolnSquareVerfier', async (accounts) => {
  let contract;
  let proof;
  let inputs;

  const account_one = accounts[0];
  const tokenName = "CapstoneERC721Token";
  const tokenSymbol = "DEVIC";

  beforeEach(async () => {
    const verifier = await Verifier.new();
    contract = await SolnSquareVerifier.new(verifier.address, tokenName, tokenSymbol);
    proof = {
      "a": [
        "0x102824cd0ee61467832da80900783cf9eb11f58952306f6de564e0655f09ed4c",
        "0x2ff1f17ec5fd1fa332df446c975020dc834f830e02b278b8f0b284411bcf8eef"
      ],
      "b": [
        [
          "0x063cd0b68c859a702916fb3fe46dcff219084f1d5ab567f78918e44284de172f",
          "0x196ebd7d248b9b4c9a3866d6f0fdaf109d70283d0b0f0961f6dc3b6ba4f15958"
        ],
        [
          "0x0eb144b7cf03671145ee29d26e0db17b0358e874bce6dcd5ca1fc1b8f44547c3",
          "0x01c5f53bcf6037f8272c48e46963c0c15950763bcf780252adb0b7ea44d2f123"
        ]
      ],
      "c": [
        "0x09097c80545e25936cf9cf444e8f56db193104050483491c263384ad1f1803db",
        "0x1a50a5788b5b5ede2f107f475ff8d8e6298dfd38486fa9c56d8706d0d5ef4682"
      ]
    };
    inputs = [
      "0x0000000000000000000000000000000000000000000000000000000000000009"
    ];
  });

  it('Test if a new solution can be added', async () => {
    let eventEmitted = false;
    contract.SolutionAdded(null, () => eventEmitted = true);

    await contract.addSolution({ addr: account_one, index: 1 });

    assert.equal(eventEmitted, true);
  });

  it('Test if an ERC721 token can be minted', async () => {
    const tokenId = 1;

    await contract.mintNFT(tokenId, proof.a, proof.b, proof.c, inputs);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const ownerOf = await contract.ownerOf(tokenId);

    assert.equal(name, tokenName);
    assert.equal(symbol, tokenSymbol);
    assert.equal(ownerOf, account_one);
  });
});
