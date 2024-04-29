# Benchmark mattrglobal bbs

Compare implementation of BBS signature scheme of [mattrglobal](https://github.com/mattrglobal/bbs-signatures) with [Fraunhofer AISEC](https://github.com/Fraunhofer-AISEC/libbbs)

## Setup

`npm install`

## Run

`tsc benches/bench.ts --esModuleInterop && node benches/bench.js`

## TODO

- [ ] Use more efficient optional node / web assembly dependency
