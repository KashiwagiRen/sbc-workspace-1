import * as Web3 from "@solana/web3.js";
import base58 from "bs58";

async function main() {
  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
  const decoded = base58.decode("Private_Key");
  const keyPair = Web3.Keypair.fromSecretKey(decoded);
  const programId = new Web3.PublicKey("Program_ID");
  const publicKey = new Web3.PublicKey("Public_Key");

  const instruction = new Web3.TransactionInstruction({
    keys: [
      {
        pubkey: publicKey,
        isSigner: true,
        isWritable: false,
      },
    ],
    data: Buffer.alloc(20),
    programId,
  });

  const transaction = new Web3.Transaction().add(instruction);

  const signature = await Web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [keyPair]
  );
  console.log("SIGNATURE", signature);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
  });