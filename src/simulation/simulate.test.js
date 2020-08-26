import { add, identity, times, reduce, sortBy, zipWith } from "lodash/fp";
import simulate from "./simulate";

const zipMap = zipWith((fn, x) => fn(x));

const iterations = 100;

describe("simulate", () => {
  test("runs in less the 100ms", () => {
    const results = sortBy(
      identity,
      times(() => {
        const start = performance.now();
        simulate([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
        const end = performance.now();
        return end - start;
      }, iterations)
    );

    const [max, min, total] = reduce(
      (acc, value) => {
        return zipMap(
          [
            (a = 0) => Math.max(a, value),
            (a = value) => Math.min(a, value),
            add(value),
          ],
          acc
        );
      },
      [],
      results
    );

    const mean = total / iterations;

    console.log(`mean simulation time: ${mean.toFixed(2)}ms
fastest simulation time: ${min.toFixed(2)}ms
slowest simulation time: ${max.toFixed(2)}ms`);

    expect(mean).toBeLessThan(100);
  });

  test("returns nodes with the same text", () => {
    const results = simulate([{ text: "test" }, { text: "test2" }]);

    expect(results[0].text).toBe("test");
    expect(results[1].text).toBe("test2");
  });
});
