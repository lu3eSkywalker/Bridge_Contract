// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {USDT} from "../src/Token.sol";

contract DeployLockContract1 is Script {
    function run() external returns (USDT) {

        vm.startBroadcast();

        USDT usdt = new USDT();

        vm.stopBroadcast();

        return usdt;

    }
}