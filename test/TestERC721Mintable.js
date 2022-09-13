var CapstoneERC721Token = artifacts.require("CapstoneERC721Token");

contract('TestCapstoneERC721Token', async (accounts) => {
  let contract;

  const account_one = accounts[0];
  const account_two = accounts[1];

  describe('match erc721 spec', () => {

    beforeEach(async () => {
      contract = await CapstoneERC721Token.new("CapstoneERC721Token", "DEVIC");

      await contract.mint(account_one, 1);
      await contract.mint(account_one, 2);
      await contract.mint(account_one, 3);
    });

    it('should return total supply', async () => {
      const totalSupply = await contract.totalSupply();
      assert.equal(totalSupply, 3);
    });

    it('should get token balance', async () => {
      const tokenBalance = await contract.balanceOf(account_one);
      assert.equal(tokenBalance, 3);
    });

    it('should return token uri', async () => {
      const tokenURI = await contract.tokenURI(1);
      assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
    });

    it('should transfer token from one owner to another', async () => {
      await contract.safeTransferFrom(account_one, account_two, 1);
      const newOwner = await contract.ownerOf(1);
      assert.equal(newOwner, account_two);
    });
  });

  describe('have ownership properties', () => {
    beforeEach(async () => {
      contract = await CapstoneERC721Token.new("0x Land Title", "ZLT");
    });

    it('should fail when minting when address is not contract owner', async () => {
      let reason = '';

      try {
        await contract.mint(account_two, 1, { from: account_two });
      }
      catch (error) {
        reason = error.reason;
      }

      assert.equal(reason, 'Only owner can call this function');
    });

    it('should return contract owner', async () => {
      const contractOwner = await contract.owner();
      assert.equal(contractOwner, account_one);
    });
  });
});