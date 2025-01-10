import express, { Request, Response } from 'express';
import { ethers } from 'ethers';

require('dotenv').config();

const app = express();
const PORT = 3001;

const ethereumRpcUrl = process.env.ETHEREUM_RPC_URL;
const baseRpcUrl = process.env.BASE_RPC_URL;
const ethereumPrivateKey = process.env.ETH_PRIVATE_KEY;
const basePrivateKey = process.env.BASE_PRIVATE_KEY;

const lockUnlockAddress = "0xC3518a469Ac65Fc9623713C85a6Eb81878f9190a"
const baseContractAddress = "0x0D5809846D1cA42Fa361E91399F770CB0a4824ED";

const abiETH = [
  "event LockEvent(address sender, uint256 _tokenValue)"
];

const abiBASE = [
    "event tokenBurn(address _from, uint256 _value)"
];


const ethABI = [
    "function tokenBurnedOnBaseChain(address _to, uint256 _tokenValue)"
];

const baseAbi = [
    "function mint(address _to, uint256 _amount)"
];

const ethereumProvider = new ethers.JsonRpcProvider(ethereumRpcUrl);
const ethereumWallet = new ethers.Wallet(ethereumPrivateKey, ethereumProvider);
const ethereumContract = new ethers.Contract(lockUnlockAddress, ethABI, ethereumWallet);

const baseProvider = new ethers.JsonRpcProvider(baseRpcUrl);
const baseWallet = new ethers.Wallet(basePrivateKey, baseProvider);
const baseContract = new ethers.Contract(baseContractAddress, baseAbi, baseWallet);

const lockContract = new ethers.Contract(lockUnlockAddress, abiETH, ethereumProvider);

const burnTokensContract = new ethers.Contract(baseContractAddress, abiBASE, baseProvider);

// Token Mint If Token Lock
lockContract.on("LockEvent", async (sender, _tokenValue) => {
    console.log(`Event Log Detected: From the Sender: ${sender}, TokenValue: ${_tokenValue}`);

    async function mintTokens() {
        try {
            const mint = await baseContract.mint(sender, _tokenValue);
            await mint.wait();
            console.log("Tokens Minted: ", mint.hash);
        } catch(error) {
            console.log(error);
        }
    }
    mintTokens()
});

burnTokensContract.on("tokenBurn", async(_from, _value) => {
    console.log(`Event Log Detected: From: ${_from}, TokenValue: ${_value}`);

    async function addTokens() {
        try {
            const addTokens = await ethereumContract.tokenBurnedOnBaseChain(_from, _value);
            await addTokens.wait();
            console.log("Tokens Added to User Account: ", addTokens.hash);
        } catch(error) {
            console.log(error);
        }
    }
    addTokens();
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});