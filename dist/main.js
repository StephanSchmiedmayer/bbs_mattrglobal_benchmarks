"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bbs_signatures_1 = require("@mattrglobal/bbs-signatures");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //Generate a new key pair
        const keyPair = yield (0, bbs_signatures_1.generateBls12381G2KeyPair)();
        //Set of messages we wish to sign
        const messages = [
            Uint8Array.from(Buffer.from("message1", "utf-8")),
            Uint8Array.from(Buffer.from("message2", "utf-8")),
        ];
        //Create the signature
        const signature = yield (0, bbs_signatures_1.blsSign)({
            keyPair,
            messages: messages,
        });
        //Verify the signature
        const isVerified = yield (0, bbs_signatures_1.blsVerify)({
            publicKey: keyPair.publicKey,
            messages: messages,
            signature,
        });
        //Derive a proof from the signature revealing the first message
        const proof = yield (0, bbs_signatures_1.blsCreateProof)({
            signature,
            publicKey: keyPair.publicKey,
            messages,
            nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
            revealed: [0],
        });
        //Verify the created proof
        const isProofVerified = yield (0, bbs_signatures_1.blsVerifyProof)({
            proof,
            publicKey: keyPair.publicKey,
            messages: messages.slice(0, 1),
            nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
        });
        // print isVerified and isProofVerified
        console.log(`Signature verified: ${isVerified.verified}`);
        console.log(`Proof verified: ${isProofVerified.verified}`);
    });
}
main();
//# sourceMappingURL=main.js.map