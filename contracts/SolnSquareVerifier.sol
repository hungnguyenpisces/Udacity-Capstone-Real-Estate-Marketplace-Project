//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
// TODO define a solutions struct that can hold an index & an address
// TODO define an array of the above struct
// TODO define a mapping to store unique solutions submitted
// TODO Create an event to emit when a solution is added
// TODO Create a function to add the solutions to the array and emit the event
// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

interface IVerifier {
    function _verifyTx(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) external view returns (bool r);
}

contract SolnSquareVerifier is CapstoneERC721Token {
    struct Solution {
        address addr;
        uint256 index;
    }

    Solution[] private solutions;

    //  define a mapping to store unique solutions submitted
    mapping(uint256 => Solution) private uniqueSolutions;

    event SolutionAdded(address indexed addr, uint256 indexed index);

    IVerifier private verifier;

    constructor(
        address _contractAddress,
        string memory _name,
        string memory _symbol
    ) CapstoneERC721Token(_name, _symbol) {
        verifier = IVerifier(_contractAddress);
    }

    function addSolution(Solution memory solution) public {
        uint256 index = solution.index;

        solutions.push(solution);
        uniqueSolutions[index] = solution;

        emit SolutionAdded(solution.addr, index);
    }

    function mintNFT(
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) external {
        require(
            uniqueSolutions[tokenId].addr == address(0),
            "Solution already exists"
        );
        require(verifier._verifyTx(a, b, c, input), "Verification failed");

        Solution memory sol = Solution({addr: msg.sender, index: tokenId});

        addSolution(sol);
        mint(msg.sender, tokenId);
    }
}
