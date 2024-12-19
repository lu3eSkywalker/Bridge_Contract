import express, { Request, Response } from 'express';
import { ethers } from 'ethers';

require('dotenv').config();

const app = express();
const PORT = 3000;

const ethereumRpcUrl = process.env.ETHEREUM_RPC_URL;
const baseRpcUrl = process.env.BASE_RPC_URL;
const ethereumPrivateKey = process.env.ETH_PRIVATE_KEY;
const basePrivateKey = process.env.BASE_PRIVATE_KEY;

const lockUnlockAddress = "0xEbf653876160b9FeF203e7142A2235C41a6327D0";
const baseContractAddress = "0x0D5809846D1cA42Fa361E91399F770CB0a4824ED";

const abi = [
  "event LockEvent(address sender, uint256 _tokenValue)",
];

const baseAbi = [
    "function mint(address _to, uint256 _amount)"
]

const ethereumProvider = new ethers.JsonRpcProvider(ethereumRpcUrl);
const ethereumWallet = new ethers.Wallet(ethereumPrivateKey, ethereumProvider);

const baseProvider = new ethers.JsonRpcProvider(baseRpcUrl);
const baseWallet = new ethers.Wallet(basePrivateKey, baseProvider);
const baseContract = new ethers.Contract(baseContractAddress, baseAbi, baseWallet);

const lockContract = new ethers.Contract(lockUnlockAddress, abi, ethereumProvider);


// Token Mint If Token Lock
lockContract.on("LockEvent", async (sender, _tokenValue) => {
    console.log(`Event Log Detected: By the TokenAddress: ${sender}, TokenValue: ${_tokenValue}`);

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


// Token Burn if Token Burn

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});