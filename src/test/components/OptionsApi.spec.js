import OptionsApi from "@/components/OptionsApi.vue";
import { shallowMount } from "@vue/test-utils";
import ElementPlus from 'element-plus'

describe("OptionsApi", () => {
  describe("changeTest", () => {
    test("test should be changed", () => {
      const mockData = {
        test: "",
      };
      OptionsApi.methods.changeTest.call(mockData, "res");
      expect(mockData.test).toBe("res");
    });
  });
  describe("changeTest", () => {
    test("test should be changed", () => {
      const mockData = {
        test: "",
      };
      OptionsApi.methods.changeTest.call(mockData, "res");
      expect(mockData.test).toBe("res");
    });
  });
  describe("setData", () => {
    test("data should be changed", async () => {
      const wrapper = shallowMount(OptionsApi)
      await wrapper.setData({
        test: 'abc'
      })
      expect(wrapper.vm.test).toBe("abc");
    });
  });
  describe("optionData", () => {
    test("test data should be changed", async () => {
      const wrapper = shallowMount(OptionsApi, {
        data() {
          return {
            test: '123'
          }
        },
      })
      expect(wrapper.vm.test).toBe("123");
    });
  });
  describe("optionData", () => {
    test("test prop should be changed", async () => {
      const wrapper = shallowMount(OptionsApi, {
        props: {
          testProp: 'abcd'
        }
      })
      expect(wrapper.vm.testProp).toBe('abcd');
    });
  });
});
