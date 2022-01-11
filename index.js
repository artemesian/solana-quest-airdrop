const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");

const newKeypair = new Keypair();

const publicKey = new PublicKey(newKeypair._keypair.publicKey).toString();
const secretKey = newKeypair._keypair.secretKey;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const getWalletBalance = async () => {
  try {
    let balance = await connection.getBalance(new PublicKey(publicKey));
    console.log("=> Wallet: ", publicKey);
    console.log("Balance: ", parseInt(balance) / LAMPORTS_PER_SOL, "SOL");
  } catch (error) {
    console.log(error);
  }
};

const airDropToWallet = async () => {
  try {
    console.log("=> AirDroping... 2 SOL to", publicKey);
    let airDropSignature = await connection.requestAirdrop(
      new PublicKey(publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airDropSignature);
    console.log("AirDropped!!");
  } catch (error) {
    console.log(error);
  }
};
const driver = async () => {
  await airDropToWallet();
  await getWalletBalance();
};

driver();
