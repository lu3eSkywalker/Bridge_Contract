// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract LockETH is Ownable {
    address public tokenAddress;

    mapping (address => uint256) public balanceOfToken;

    event LockEvent(address sender, uint256 _tokenValue);
    event WithDrawEvent(address sender, uint256 _tokenValue);

    event tokenUnlock(address _to, uint256 _amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        tokenAddress = _tokenAddress;
    }

    function deposit(address _tokenAddress, uint256 _tokenValue) external {
        require(tokenAddress == _tokenAddress, "The token address should be same as the above");
        require(_tokenValue > 0, "Token value must be greater than 0");
        IERC20 token = IERC20(_tokenAddress);

        require(token.allowance(address(msg.sender), address(this)) >= _tokenValue, "Approval must be there");

        bool success = token.transferFrom(
            msg.sender,
            address(this),
            _tokenValue
        );
        require(success, "Token transfer failed");

        emit LockEvent(msg.sender, _tokenValue);
    }

    function withdraw(address _tokenAddress, uint256 _tokenValue) public {
        require(_tokenValue > 0, "Token value must be greater than 0");
        require(tokenAddress == _tokenAddress, "The token address should be same as the above");
        uint256 _tokenBalance = balanceOfToken[msg.sender];
        require(_tokenBalance >= _tokenValue, "Insufficient Balance");

        balanceOfToken[msg.sender] -= _tokenValue;
        IERC20 token = IERC20(_tokenAddress);

        bool success = token.transfer(msg.sender, _tokenValue);
        require(success, "Error tranferring the tokens");

        emit WithDrawEvent(msg.sender, _tokenValue);
    }

    function tokenBurnedOnBaseChain(address _to, uint256 _tokenValue) public onlyOwner {
        require(_tokenValue > 0, 'The token value should be greater than zero');
        balanceOfToken[_to] += _tokenValue;
    }

    function userTokenBalance(address _userAddress) public view returns(uint256) {
        return balanceOfToken[_userAddress];
    }
}