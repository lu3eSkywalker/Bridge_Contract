// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {BUSDT} from "../src/Token.sol";

contract DeployLockContract1 is Script {
    function run() external returns (BUSDT) {

        vm.startBroadcast();

        BUSDT busdt = new BUSDT();

        vm.stopBroadcast();

        return busdt;

    }
}