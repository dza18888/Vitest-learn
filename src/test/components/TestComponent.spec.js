import TestComponent from "@/components/TestComponent.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { h } from "vue";
describe("TestComponent", () => {
  test("html should contain some words", () => {
    vi.mock("vue-router", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useRoute: vi.fn(() => {
          return {
            name: "testName",
          };
        }),
      };
    });
    const wrapper = mount(TestComponent);
    expect(wrapper.text()).toContain("Vitest前端测试用例编写经验分享");
  });
  test("waveShow should be changed", () => {
    vi.mock("vue-router", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useRoute: vi.fn(() => {
          return {
            name: "testName",
          };
        }),
      };
    });
    const wrapper = mount(TestComponent);
    wrapper.vm.goToDocument();
    expect(wrapper.vm.waveShow).toBe(false);
  });
  test("event should be emitted", () => {
    const wrapper = shallowMount(TestComponent);
    wrapper.vm.fireEvent("param1");
    expect(wrapper.emitted().fireEvent[0]).toEqual(["param1"]);
    wrapper.vm.fireEvent("param2");
    expect(wrapper.emitted().fireEvent.length).toBe(2);
  });
  test("wrapper text should contain vitest", () => {
    const wrapper = shallowMount(TestComponent);
    expect(wrapper.text()).toContain("Vitest");
  });
  test("prop data should changed", async () => {
    const wrapper = shallowMount(TestComponent, {
      props: {
        testProp: "res",
      },
    });
    expect(wrapper.vm.propMockSuccess).toBe(true);
  });
  test("slots should be inserted", async () => {
    const wrapper = mount(TestComponent, {
      slots: {
        default: "default text",
        specificSlot: h("h1", {}, "Named Slot"),
      },
    });
    expect(wrapper.html()).toContain("<h1>Named Slot</h1>default text");
  });
  test("elementPlus should be rendered", async () => {
    const wrapper = mount(TestComponent);
    console.log(wrapper.html());
  });
});
