import { debounce, deepCopy, RGBAtoRGB } from "@/utils/utils.js";

describe("utils.js", () => {
  describe("RGBAtoRGB", () => {
    test("rgba color should transfer to rgb color", () => {
      expect(RGBAtoRGB(100, 100, 100, 0.5)).toBe("178, 178, 178");
    });
  });
});
