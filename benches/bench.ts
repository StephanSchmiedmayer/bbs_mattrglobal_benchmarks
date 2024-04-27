import Benchmark from "benchmark";

let suite = new Benchmark.Suite();

function e2eSignNProof() {
  let a = 0;
  for (let i = 0; i < 100000; i++) {
    a += i;
  }
}

suite
  .add("Test Function", () => {
    e2eSignNProof();
  })
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })
  .run();
