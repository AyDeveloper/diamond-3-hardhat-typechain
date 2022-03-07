// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Facet2 {
    event TestEvent(address something);

    function sumUp(uint x, uint y) public view returns (uint256 _max) {
        _max = x + y;
        console.log(_max);
    }
}
