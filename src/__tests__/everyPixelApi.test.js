import { everyPixelQualityCall } from "../Other/everyPixel";

it("returns a value between 0 and 100", async () => {
  let score = await everyPixelQualityCall("invalid image url");
  expect(score).toBeGreaterThanOrEqual(0);
  expect(score).toBeLessThanOrEqual(100);
});
