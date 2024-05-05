import { describe, test, vi, expect } from "vitest";

describe("test", () => {
  test("test", () => {
    let func = vi.fn();
    func();
    expect(func).toHaveBeenCalled();
  });
});
