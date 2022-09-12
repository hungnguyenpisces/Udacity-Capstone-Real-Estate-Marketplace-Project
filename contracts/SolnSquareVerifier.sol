//SPDX-License-Identifier: CC BY-NC-ND 4.0
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

contract SolnSquareVerifier is CapstoneERC721Token {
    Verifier private verifierContract;
    uint256 private index;

    struct Proof {
        uint256[2] a;
        uint256[2][2] b;
        uint256[2] c;
    }
    struct Solution {
        Proof _proof;
        uint256[3] _input;
        address _submitter;
        uint256 _index;
    }

    mapping(bytes32 => bool) solutions;

    event SolutionAdded(address indexed submitter, uint256 index, bytes32 hash);

    constructor(address _verifierContract) {
        verifierContract = Verifier(_verifierContract);
    }

    function submitProof(Proof memory proof_, uint256[3] memory input_)
        internal
    {
        Solution memory solution = Solution({
            _proof: proof_,
            _input: input_,
            _submitter: msg.sender,
            _index: index
        });

        bytes32 hash = keccak256(abi.encode(solution));

        // Does the solution exist already?
        require(!solutions[hash], "Solution exists already");

        // Verify the proof
        require(
            verifierContract.verifyTx(proof_.a, proof_.b, proof_.c, input_),
            "Solution not valid"
        );

        // Proof is valid so add it to the array
        solutions[hash] = true;

        emit SolutionAdded(msg.sender, index++, hash);
    }

    /**
     * @notice This function mints a new token after verifying that the sender
     * has indeed solved the key and that the solution is unique
     * @param tokenId The token ID to mint
     * @param proof The proof of the solution
     * @param input The input of the proof
     */
    function mintNFT(
        uint256 tokenId,
        Proof memory proof,
        uint256[3] memory input
    ) public {
        // Check that the solution is unique
        bytes32 hash = keccak256(abi.encode(proof, input));
        require(!solutions[hash], "Solution exists already");

        // Verify the proof
        require(
            verifierContract.verifyTx(proof.a, proof.b, proof.c, input),
            "Solution not valid"
        );

        // Proof is valid so add it to the array
        solutions[hash] = true;

        // Mint the token
        super._mint(msg.sender, tokenId);

        // Emit the event
        emit SolutionAdded(msg.sender, index++, hash);
    }
}
