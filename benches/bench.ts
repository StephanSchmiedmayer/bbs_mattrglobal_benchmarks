import Benchmark from "benchmark";
import {
  generateBls12381G2KeyPair,
  blsSign,
  blsVerify,
  blsCreateProof,
  blsVerifyProof,
} from "@mattrglobal/bbs-signatures";
import { performance } from "perf_hooks"; // Import this if you're using Node.js

let suite = new Benchmark.Suite();

async function e2eSignNProof(iterations: number = 1000, msg_len: number = 64) {
  const ITERATIONS_START = 10;
  const ITERATIONS_END = 310;
  const ITERATIONS_STEP = 10;
  const MSG_LEN_START = 64;
  const MSG_LEN_END = 65;
  const MSG_LEN_STEP = 1024;

  // Initialize the arrays
  let msg1: Uint8Array = new Uint8Array(MSG_LEN_END);
  let msg2: Uint8Array = new Uint8Array(MSG_LEN_END);

  // Fill the arrays with random numbers simulating ASCII values of characters
  for (let j = 0; j < MSG_LEN_END; j++) {
    msg1[j] = Math.floor(Math.random() * 256); // Simulate random char by ASCII code
    msg2[j] = Math.floor(Math.random() * 256);
  }

  // Placeholder for operations within defined iteration and message length parameters
  for (
    let iterations_count = ITERATIONS_START;
    iterations_count < ITERATIONS_END;
    iterations_count += ITERATIONS_STEP
  ) {
    for (
      let msg_len = MSG_LEN_START;
      msg_len < MSG_LEN_END;
      msg_len += MSG_LEN_STEP
    ) {
      process.stdout.write(
        `Iterations: ${iterations_count} Message Length: ${msg_len}, Reveal Message 0 (1/2)`
      );
      const start = performance.now();
      for (let i = 0; i < iterations_count; i++) {
        // Generate a new key pair
        const keyPair = await generateBls12381G2KeyPair();
        const messages = [msg1.slice(0, msg_len), msg2.slice(0, msg_len)];

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
        // Perform operations on msg1 and msg2 up to msg_len
        // Since no specific operations are defined, this block is left empty
      }
      const end = performance.now();
      console.log(
        `Time taken: ${
          (end - start) * 10 ** 6
        } ns for ${iterations_count} iterations`
      );
    }
  }
}

// execute e2eSignNProof function
e2eSignNProof();

// suite
//   .add("Test Function", () => {
//     e2eSignNProof();
//   })
//   .on("cycle", (event: Benchmark.Event) => {
//     console.log(String(event.target));
//   });
// suite.run();
