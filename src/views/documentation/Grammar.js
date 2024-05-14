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
          type: 'text',
          content: '运行这段代码，如果 sum 函数的实现不符合预期，equal 方法就会抛出一个 <code>AssertionError</code> 错误，并打印详细的错误原因。'
        },
        {
          type: 'text',
          content: 'Vitest 的 断言方法 与 Jest 的 expect 用法基本一致，直接调用一个方法进行断言：'
        },
        {
          type: 'codeBlock',
          language: 'javascript',
          content: `expect(2 + 2).toBe(4)
expect('How time flies').toContain('time')
expect({a: 1}).not.toEqual({b: 2})`
        },
        {
          type: 'text',
          content: '如上例所示，像 <code>toBe()</code>、<code>toEqual()</code>这类对待测内容的某个方面进行断言的方法，称为匹配器（Matcher）。 详见：<a>Vitest匹配器</a>'
        }
      ],
    },
  ],
};
