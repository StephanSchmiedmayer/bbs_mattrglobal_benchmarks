"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var benchmark_1 = __importDefault(require("benchmark"));
var suite = new benchmark_1.default.Suite();
function e2eSignNProof() {
    var a = 0;
    for (var i = 0; i < 100000; i++) {
        a += i;
    }
}
suite
    .add("Test Function", function () {
    e2eSignNProof();
})
    .on("cycle", function (event) {
    console.log(String(event.target));
})
    .on("complete", function () {
    console.log("Fastest is " + suite.filter("fastest").map("name"));
})
    .run();
