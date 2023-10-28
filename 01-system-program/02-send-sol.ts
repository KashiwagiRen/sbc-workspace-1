import * as Web3 from '@solana/web3.js';
import base58 from 'bs58'

async function main() {
    const decoded = base58.decode('3tKruBNNMJi37tkmB6bdZXMBopV2TvwBqux54xVHmKMeUtGNEepZ6X3dYFgBVHWjdcNjfBXzqqmHUVofJs9oYMmB')
    const keyPair = Web3.Keypair.fromSecretKey(decoded)

    const publicKeyFrom = new Web3.PublicKey('6jipsXxA8T7zxe7ixXWwbtkjEW8Vd87tZiYBqgbzofeH');
    const publicKeyTo = new Web3.PublicKey('8gWy1tAcoNjAfU7B5pkh7gxLWZX8RAy2Qy93Y1bzomV4');

    const instruction = Web3.SystemProgram.transfer({
        fromPubkey: publicKeyFrom,
        toPubkey: publicKeyTo,
        lamports: 10,
    });
    const transaction = new Web3.Transaction();
    transaction.add(instruction);

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const txSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [keyPair]);

    console.log('txHash', txSignature)
}

main();