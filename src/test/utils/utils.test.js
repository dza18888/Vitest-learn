import { deepCopy } from "@/utils/utils.js";

describe("utils.js", () => {
  describe("deepCopy", () => {
    test("cloned obj should not equal to old obj", () => {
      const testObj = {
        arr: [],
      };
      const deepClonedObj = deepCopy(testObj);
      expect(deepClonedObj.arr).not.toBe(testObj.arr);
    });
    test("cloned obj should not equal to old obj", () => {
      const testObj = {
        arr: [
          {
            insideObj: "test",
          },
        ],
      };
      const testObj2 = {
        arr: [
          {
            insideObj: "test2",
          },
        ],
      }
      const deepClonedObj = deepCopy(testObj);
      expect(deepClonedObj).toEqual(testObj);
    });
  });
});
