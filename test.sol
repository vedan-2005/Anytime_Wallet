// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyWalletBalance {
    // Fallback function to receive Ether
    receive() external payable {}

    function getBalance() public view returns (uint) {
        require(msg.sender == tx.origin, "Only external accounts allowed");
        return address(msg.sender).balance;
    }
}
