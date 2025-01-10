// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Token.sol";
import "../src/LockContract1.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeETHTest is Test {
    event Transfer(address indexed from, address indexed to, uint256 value);

    LockETH lockETH;
    USDT usdt;

    function setUp() public {
        usdt = new USDT();
        lockETH = new LockETH(address(usdt));
    }

    function test_Deposit() public {
        usdt.mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 200);
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        usdt.approve(address(lockETH), 200);

        lockETH.deposit(address(usdt), 200);
        assertEq(usdt.balanceOf(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 0);
        assertEq(usdt.balanceOf(address(lockETH)), 200);
    }

    function test_withdraw() public {
        usdt.mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 200);
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        usdt.approve(address(lockETH), 200);

        lockETH.deposit(address(usdt), 200);
        assertEq(usdt.balanceOf(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 0);
        assertEq(usdt.balanceOf(address(lockETH)), 200);
        vm.stopPrank();

        lockETH.tokenBurnedOnBaseChain(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 100);

        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        lockETH.withdraw(address(usdt), 100);
        assertEq(usdt.balanceOf(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 100);
        assertEq(usdt.balanceOf(address(lockETH)), 100);
    }

    function test_tokenBurnedOnBaseChain() public {
        usdt.mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 200);
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        usdt.approve(address(lockETH), 200);

        lockETH.deposit(address(usdt), 200);
        assertEq(usdt.balanceOf(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 0);
        assertEq(usdt.balanceOf(address(lockETH)), 200);

        vm.stopPrank();

        lockETH.tokenBurnedOnBaseChain(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 100);
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        lockETH.withdraw(address(usdt), 100);
        assertEq(usdt.balanceOf(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 100);
    }

    function test_userTokenBalance() public {
        usdt.mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 200);
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        usdt.approve(address(lockETH), 200);

        lockETH.deposit(address(usdt), 200);
        assertEq(usdt.balanceOf(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 0);
        assertEq(usdt.balanceOf(address(lockETH)), 200);

        vm.stopPrank();

        lockETH.tokenBurnedOnBaseChain(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 200);

        uint256 balance = lockETH.userTokenBalance(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        assertEq(balance, 200, "OK");
    }
}