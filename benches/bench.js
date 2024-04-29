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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var benchmark_1 = __importDefault(require("benchmark"));
var bbs_signatures_1 = require("@mattrglobal/bbs-signatures");
var perf_hooks_1 = require("perf_hooks"); // Import this if you're using Node.js
var suite = new benchmark_1.default.Suite();
function e2eSignNProof() {
    return __awaiter(this, arguments, void 0, function (iterations, msg_len) {
        var ITERATIONS_START, ITERATIONS_END, ITERATIONS_STEP, MSG_LEN_START, MSG_LEN_END, MSG_LEN_STEP, msg1, msg2, j, iterations_count, msg_len_1, start, i, keyPair, messages, signature, isVerified, proof, isProofVerified, end;
        if (iterations === void 0) { iterations = 1000; }
        if (msg_len === void 0) { msg_len = 64; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ITERATIONS_START = 10;
                    ITERATIONS_END = 310;
                    ITERATIONS_STEP = 10;
                    MSG_LEN_START = 64;
                    MSG_LEN_END = 65;
                    MSG_LEN_STEP = 1024;
                    msg1 = new Uint8Array(MSG_LEN_END);
                    msg2 = new Uint8Array(MSG_LEN_END);
                    // Fill the arrays with random numbers simulating ASCII values of characters
                    for (j = 0; j < MSG_LEN_END; j++) {
                        msg1[j] = Math.floor(Math.random() * 256); // Simulate random char by ASCII code
                        msg2[j] = Math.floor(Math.random() * 256);
                    }
                    iterations_count = ITERATIONS_START;
                    _a.label = 1;
                case 1:
                    if (!(iterations_count < ITERATIONS_END)) return [3 /*break*/, 13];
                    msg_len_1 = MSG_LEN_START;
                    _a.label = 2;
                case 2:
                    if (!(msg_len_1 < MSG_LEN_END)) return [3 /*break*/, 12];
                    process.stdout.write("Iterations: ".concat(iterations_count, " Message Length: ").concat(msg_len_1, ", Reveal Message 0 (1/2)"));
                    start = perf_hooks_1.performance.now();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < iterations_count)) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, bbs_signatures_1.generateBls12381G2KeyPair)()];
                case 4:
                    keyPair = _a.sent();
                    messages = [msg1.slice(0, msg_len_1), msg2.slice(0, msg_len_1)];
                    return [4 /*yield*/, (0, bbs_signatures_1.blsSign)({
                            keyPair: keyPair,
                            messages: messages,
                        })];
                case 5:
                    signature = _a.sent();
                    return [4 /*yield*/, (0, bbs_signatures_1.blsVerify)({
                            publicKey: keyPair.publicKey,
                            messages: messages,
                            signature: signature,
                        })];
                case 6:
                    isVerified = _a.sent();
                    return [4 /*yield*/, (0, bbs_signatures_1.blsCreateProof)({
                            signature: signature,
                            publicKey: keyPair.publicKey,
                            messages: messages,
                            nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
                            revealed: [0],
                        })];
                case 7:
                    proof = _a.sent();
                    return [4 /*yield*/, (0, bbs_signatures_1.blsVerifyProof)({
                            proof: proof,
                            publicKey: keyPair.publicKey,
                            messages: messages.slice(0, 1),
                            nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
                        })];
                case 8:
                    isProofVerified = _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 3];
                case 10:
                    end = perf_hooks_1.performance.now();
                    console.log("Time taken: ".concat((end - start) * Math.pow(10, 6), " ns for ").concat(iterations_count, " iterations"));
                    _a.label = 11;
                case 11:
                    msg_len_1 += MSG_LEN_STEP;
                    return [3 /*break*/, 2];
                case 12:
                    iterations_count += ITERATIONS_STEP;
                    return [3 /*break*/, 1];
                case 13: return [2 /*return*/];
            }
        });
    });
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
