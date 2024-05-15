export default {
  title: "用例编写",
  content: [
    {
      title: "断言",
      value: "asserttion",
      content: [
        {
          type: "text",
          content: "现在要测试如下这个函数：",
        },
        {
          type: "codeBlock",
          language: "javascript",
          content: `function sum(a, b) {
  return a + b
}`,
        },
        {
          type: "text",
          content:
            "比如输入 1 和 2，这个函数会输出 3。然后要让这个函数跑起来，传入 1 和 2，打印函数返回值看看是否为 3。于是可以写出以下这段测试代码：",
        },
        {
          type: "codeBlock",
          language: "javascript",
          content: `console.log(sum(1, 2))`,
        },
        {
          type: "text",
          content:
            "然后运行这段代码，检查打印结果是否为 3。这样，一个测试代码就完成了。当然，这个函数过于简单。而且，这段代码运行起来还需要人工观察运行结果来检验测试，这其实不属于自动化测试的范畴。",
        },
        {
          type: "text",
          content:
            "当类似的测试做多了之后我们就可以发现一个规律，大多数测试用例，都是设计一个或多个输入数据，以及对应的输出数据，通过传入这些输入数据时被测代码是否产生或返回这些输出数据来判断被测代码是否运行正常，这个判断的过程就叫作<b>断言（assertion）</b>。",
        },
        {
          type: "text",
          content:
            "Node 的 assert 模块就提供了进行断言的 API，比如使用 equal 方法对上述的 sum 函数进行断言",
        },
        {
          type: "codeBlock",
          language: "javascript",
          content: `assert.equal(sum(1, 2), 3)`,
        },
        {
          type: "text",
          content:
            "运行这段代码，如果 sum 函数的实现不符合预期，equal 方法就会抛出一个 <code>AssertionError</code> 错误，并打印详细的错误原因。",
        },
        {
          type: "text",
          content: "<b>Vitest中的断言</b>",
          style: "margin: 20px 0",
        },
        {
          type: "text",
          content:
            "Vitest 的 断言方法 与 Jest 的 expect 用法基本一致，直接调用一个方法进行断言：",
        },
        {
          type: "codeBlock",
          language: "javascript",
          content: `expect(2 + 2).toBe(4)
expect('How time flies').toContain('time')
expect({a: 1}).not.toEqual({b: 2})`,
        },
        {
          type: "text",
          content:
            "如上例所示，像 <code>toBe()</code>、<code>toEqual()</code>这类对待测内容的某个方面进行断言的方法，称为匹配器（Matcher）。 详见：<a>Vitest匹配器</a>",
        },
      ],
    },
    {
      title: "test()",
      value: "test()",
      content: [
        {
          type: "text",
          content:
            "<code>test()</code> 方法，用于声明一个测试用例。我们在写单元测试时基本上就是以测试用例为单位来组织测试。",
        },
        {
          type: "text",
          content:
            '它的第一个参数接受一个字符串，用于描述这个测试用例的内容，一般用"xx should xx"，这样可以清晰地表明这个测试用例的意图。',
        },
        {
          type: "text",
          content:
            "第二个参数是一个函数，包含了这个测试用例的主体内容，即断言。<b>一个测试用例可以包含多个断言</b>，但是所断言的内容应该符合这个测试用例的意图。",
        },
        {
          type: "text",
          content: "另外，该方法还有一个别名：<code>it()</code>",
        },
        {
          type: "codeBlock",
          language: "javascript",
          content: `test("should return the sum result", () => {
  expect(sum(1, 2)).toBe(3)
  expect(sum(2, 4)).toBe(6)
  expect(sum(10, 100)).toBe(110)
})`,
        },
      ],
    },
    {
      title: "describe()",
      value: "describe()",
      content: [
        {
          type: "text",
          content:
            "<code>describe()</code> 方法可以组织一个或多个测试用例，将多个相关的测试组合成一个块，这种块叫作测试套件（test suite）。使用 describe 来组织测试用例是一个推荐的写法，可以将测试内容与其他内容隔离，更有利于维护。",
        },
        {
          type: "text",
          content: "另外，<code>describe()</code> 方法可以嵌套使用。",
        },
        {
          type: "codeBlock",
          language: "javascript",
          content: `describe('test.js', () => {
  describe('function name', () => {
    test('should return the sum result', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });
});`,
        },
      ],
    },
    {
      title: "匹配器 (Matcher)",
      value: "matcher",
      content: [
        {
          type: "text",
          content:
            'Vitest使用匹配器 (Matcher)的机制让你可以使用各种方法进行测试。这里向你介绍一些常用的匹配器，全部匹配器可查看：<a href="https://cn.vitest.dev/api/expect.html" target="_blank">Vitest expect</a>',
        },
      ],
      children: [
        {
          title: "toBe",
          value: "toBe",
          content: [
            {
              type: "text",
              content:
                "<code>toBe</code> 可用于断言是否相等或对象共享相同的引用。它相当于调用 <code>expect(Object.is(variable, variable)).toBe(true)</code>",
            },
            {
              type:'codeBlock',
              language: 'javascript',
              content:`import { deepCopy } from "@/utils/utils.js";

describe("utils.js", () => {
  describe("test toBe", () => {
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
  })
  describe("deepCopy", () => {
    test("cloned obj should not be old obj", () => {
      const testObj = {
        arr: [
          {
            insideObj: "test",
          },
        ],
      };
      const deepClonedObj = deepCopy(testObj);
      expect(deepClonedObj.arr).not.toBe(testObj.arr);
    });
  });
});`
            }
          ],
        },
        {
          title: 'toEqual',
          value: 'toEqual',
          content:[
            {
              type:'text',
              content: '<code>toEqual</code> 断言实际值是否等于接收到的值，如果它是一个对象，则断言是否具有相同的结构（递归进行比较）。'
            },
            {
              type:'codeBlock',
              language: 'javascript',
              content: `import { deepCopy } from "@/utils/utils.js";

describe("utils.js", () => {
  describe("deepCopy", () => {
    test("cloned obj should not be equal to old obj", () => {
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
      // expect(testObj).toEqual(testObj2); 
      // expected { arr: [ { insideObj: 'test' } ] } to deeply equal { arr: [ { insideObj: 'test2' } ] }
    });
  });
});`
            }
          ]
        }
      ],
    },
  ],
};
