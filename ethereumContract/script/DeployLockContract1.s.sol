// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {LockETH} from "../src/LockContract1.sol";

contract DeployLockContract1 is Script {
    function run() external returns (LockETH) {

        vm.startBroadcast();

        LockETH locketh = new LockETH(0x4721468CF9DcA7e79a66508D9d9588e85B26eA2b);

        vm.stopBroadcast();

        return locketh;
    }
}