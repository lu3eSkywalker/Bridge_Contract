// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test, console} from "forge-std/Test.sol";
import {USDT} from "../src/Token.sol";

contract USDTTest is Test {
    USDT erc20;

    uint256 ethToWei = 10 ** 18;

    function setUp() public {
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        erc20 = new USDT();
        vm.stopPrank();
    }

    function test_mint() public {
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        erc20.mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 10 * ethToWei);
        assertEq(erc20.balanceOf(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 10 * ethToWei, "OK");
    }
}