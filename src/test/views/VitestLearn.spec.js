import { debounce, deepCopy, RGBAtoRGB } from "@/utils/utils.js";
import testMock from "@/utils/testMock.js";

describe("vitestLearn", () => {
  describe("toBe", () => {
    test("should be same reference", () => {
      expect(1 + 1).toBe(2);
      // expect(2).toBe("2");  expected 2 to be '2'

      expect(NaN).toBe(NaN);
      // expect(NaN === NaN).toBe(true); expected false to be true

      expect(0).toBe(+0);
      // expect(-0).toBe(0); expected -0 to be +0

      // expect(0.1 + 0.2).toBe(0.3); expected 0.30000000000000004 to be 0.3

      const obj = {
        insideObj: {},
      };
      const cloneObj = { ...obj };
      expect(obj.insideObj).toBe(cloneObj.insideObj);
    });
    test("cloned obj should not equal to old obj", () => {
      const testObj = {
        arr: [],
      };
      const deepClonedObj = deepCopy(testObj);
      expect(deepClonedObj.arr).not.toBe(testObj.arr);
    });
  });
  describe("toEqual", () => {
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
      };
      const deepClonedObj = deepCopy(testObj);
      expect(deepClonedObj).toEqual(testObj);
      expect(testObj).not.toEqual(testObj2);
    });
    test("obj1 should be equal to obj2", () => {
      const testObj1 = {
        insideObj: {
          test1: "1",
          test2: undefined,
        },
      };
      const testObj2 = {
        insideObj: {
          test1: "1",
        },
      };
      expect(testObj1).toEqual(testObj2);
    });
  });
  describe("toContain", () => {
    test("item should be contained in arr", () => {
      const arr = ["apple", "orange", "juice"];
      expect(arr).toContain("apple");

      const arr2 = [
        {
          value: "1",
        },
      ];
      let obj = {
        value: "1",
      };
      let obj2 = arr2[0];

      expect(arr2).not.toContain(obj);
      expect(arr2).toContain(obj2);
    });
    test("strSlice should be contained in str", () => {
      let str = "abcdefg";
      expect(str).toContain("abc");
    });
  });
  describe("toThrowError", () => {
    function throwError(syncOrAsync) {
      if (syncOrAsync === "async") {
        return Promise.reject(new Error("orange"));
      } else {
        throw new Error("apple");
      }
    }
    test("func should throw error", async () => {
      // expect(throwError()).toThrowError() Error: error
      expect(throwError).toThrowError();
      expect(() => throwError("sync")).toThrowError("apple");

      await expect(() => throwError("async")).rejects.toThrowError(/ora/);
    });
  });
  describe("toHaveBeenCalled", () => {
    const obj = {
      testFunc() {},
    };
    test("func should be called", () => {
      const func = vi.spyOn(obj, "testFunc");

      expect(func).not.toHaveBeenCalled();

      obj.testFunc();

      expect(func).toHaveBeenCalled();
    });
    test("vi func should be called", () => {
      const func = vi.fn();

      // console.log(func); [Function: spy]
      func();

      expect(func).toHaveBeenCalled();
    });
  });
  describe("toHaveBeenCalledTimes", () => {
    const callback = vi.fn();
    test("func should be called", async () => {
      const debounceFunc = debounce(callback, 100);

      vi.useFakeTimers();
      debounceFunc();
      debounceFunc();
      debounceFunc();
      vi.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledTimes(1);

      vi.clearAllMocks(); // 清除spy调用历史记录
      debounceFunc();
      vi.advanceTimersByTime(100);
      debounceFunc();
      vi.advanceTimersByTime(100);
      vi.useRealTimers();
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });
  describe("vi.mock", () => {
    test("module should be mocked", () => {
      expect(RGBAtoRGB()).toBe("mockRes");

      vi.mock("@/utils/utils.js", async (importOriginal) => {
        const mod = await importOriginal(); // 导入原始module
        return {
          ...mod,
          RGBAtoRGB: vi.fn(() => "mockRes"),
        };
      });
    });
  });
  describe("vi.fn", () => {
    test("vi.fn should be called", () => {
      let mock = vi.fn();
      mock();
      expect(mock).toHaveBeenCalled();
    });
  });
  describe("vi.spyOn", () => {
    test("spyOn func should be called", () => {
      let obj = {
        getInfo: () => "info",
      };
      let func = vi.spyOn(obj, "getInfo");
      obj.getInfo();
      expect(func).toHaveBeenCalled();
    });
  });
  describe("vi.useFakeTimers", () => {
    test("time should be faked", async () => {
      let count = 0;
      vi.useFakeTimers();
      let time = setInterval(() => {
        count++;
        if (count === 5) {
          clearInterval(time);
        }
      }, 500);
      vi.advanceTimersByTime(3000);
      vi.useRealTimers();
      expect(count).toBe(5);
    });
  });
  describe("vi.advanceTimersByTime", () => {
    test("time should be faked", async () => {
      function callAfterOneSecond(callback) {
        setTimeout(() => {
          callback && callback();
        }, 2000);
      }
      const func = vi.fn();
      vi.useFakeTimers();
      callAfterOneSecond(func);

      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(2000);
      expect(func).toHaveBeenCalled();
    });
  });
});
