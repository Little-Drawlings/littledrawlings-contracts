//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";


contract LittleDrawlingsNFT is ERC721URIStorage, Ownable {
    address private _owner;
    address private _wallet;
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    constructor() ERC721("LittleDrawlingsNFT", "NFT") {
        _owner = msg.sender;
    }

    uint256 public MINT_AMOUNT = 0.00021 ether;

    function changeAmount(uint256 value) public isOwner() {
        MINT_AMOUNT = value;
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        console.log('MINT_AMOUNT', MINT_AMOUNT);
        require(_tokenIds.current() > 0 && _tokenIds.current() < 21000, "Exceeds token supply");
        require(MINT_AMOUNT == (msg.value), "invalid amount");
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    modifier isOwner() {
        require(_owner == msg.sender, "LittleDrawlings: not owner");
        _;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://ipfs.pragmaticdlt.com/ipns/";
    }
}
