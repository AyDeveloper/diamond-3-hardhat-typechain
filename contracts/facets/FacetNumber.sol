// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract FacetNumber {
    event TestEvent(address something);

    function getNum(uint x) public view returns (uint256 _num) {
        _num = x;
        console.log(_num);
    }
}
