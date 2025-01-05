// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test, console} from "forge-std/Test.sol";
import {BUSDT} from "../src/Token.sol";

contract BUSDTTest is Test {
    BUSDT busdt;

    uint256 ethToWei = 10 ** 18;

    function setUp() public {
        busdt = new BUSDT();
    }

    function test_mint() public {
        busdt.mint(address(this), 100 * ethToWei);
        assertEq(busdt.balanceOf(address(this)), 100 * ethToWei, "OK");
    }

    function test_burn() public {
        busdt.mint(address(this), 100 * ethToWei);
        assertEq(busdt.balanceOf(address(this)), 100 * ethToWei, "OK");

        busdt.burn(50 * ethToWei);
        assertEq(busdt.balanceOf(address(this)), 50 * ethToWei, "OK");
    }
}
