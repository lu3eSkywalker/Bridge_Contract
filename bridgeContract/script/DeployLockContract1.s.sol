// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {LockETH} from "../src/LockContract1.sol";

contract DeployLockContract1 is Script {
    function run() external returns (LockETH) {

        vm.startBroadcast();

        LockETH locketh = new LockETH(0x5FbDB2315678afecb367f032d93F642f64180aa3);

        vm.stopBroadcast();

        return locketh;
    }
}