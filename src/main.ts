import {
  generateBls12381G2KeyPair,
  blsSign,
  blsVerify,
  blsCreateProof,
  blsVerifyProof,
} from "@mattrglobal/bbs-signatures";

async function main() {
  //Generate a new key pair
  const keyPair = await generateBls12381G2KeyPair();

  //Set of messages we wish to sign
  const messages = [
    Uint8Array.from(Buffer.from("message1", "utf-8")),
    Uint8Array.from(Buffer.from("message2", "utf-8")),
  ];

  //Create the signature
  const signature = await blsSign({
    keyPair,
    messages: messages,
  });

  //Verify the signature
  const isVerified = await blsVerify({
    publicKey: keyPair.publicKey,
    messages: messages,
    signature,
  });

  //Derive a proof from the signature revealing the first message
  const proof = await blsCreateProof({
    signature,
    publicKey: keyPair.publicKey,
    messages,
    nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
    revealed: [0],
  });

  //Verify the created proof
  const isProofVerified = await blsVerifyProof({
    proof,
    publicKey: keyPair.publicKey,
    messages: messages.slice(0, 1),
    nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
  });
  // print isVerified and isProofVerified
  console.log(`Signature verified: ${isVerified.verified}`);
  console.log(`Proof verified: ${isProofVerified.verified}`);
}

main();
