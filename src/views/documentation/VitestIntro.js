export default {
  title: "Vitest简介",
  content: [
    {
      title: "简介",
      value: "intro",
      content: [
        {
          type: "text",
          content: "Vitest /vi test/ 是由 Vite /vit/ 驱动的下一代测试框架。",
        },
        {
          type: "list",
          content: [
            "与 Vite 通用的配置、转换器、解析器和插件。",
            "使用与你的应用相同的设置来运行测试！",
            "智能文件监听模式，就像是测试的 HMR！",
            "支持对 Vue、React、Svelte、Lit等框架进行组件测试。",
            "开箱即用的 TypeScript / JSX 支持",
            "ESM 优先，支持模块顶级 await",
            "通过 Tinypool 使用 Worker 线程尽可能多地并发运行",
            "使用 Tinybench 来支持基准测试",
            "套件和测试的过滤、超时、并发配置",
            "支持 Workspace",
            "Jest 的快照功能",
            "内置 Chai 进行断言 + 与 Jest expect 语法兼容的 API",
            "内置用于对象模拟(Mock)的 Tinyspy",
            "使用 jsdom 或 happy-dom 用于 DOM 模拟",
            "通过 v8 or istanbul来输出代码测试覆盖率",
            "类似于 Rust 语言的 源码内联测试",
            "通过 expect-type 进行类型测试",
          ],
        },
      ],
    },
    {
      title: "Vitest特点与jest对比",
      value: "compareJest",
      collapse: false,
      children: [
        {
          title: "ESM 优先支持",
          value: "testingCapabilities",
          content: [
            {
              type: "text",
              content: "在过去的十年中，由于缺乏 JavaScript 的标准模块系统，CommonJS一直是 Node.js 和 NPM 包的工作方式。直到 2015 年，当 ECMAScript 模块最终作为标准解决方案出现时，社区开始逐渐迁移到原生 ESM。",
            },
            {
              type: 'codeBlock',
              language: 'javascript',
              content: `// CJS
const circle = require('./circle.js')

console.log(\`The area of a circle of radius 4 is \${circle.area(4)}\`)`
            },
            {
              type: 'codeBlock',
              language: 'javascript',
              content: `// ESM
import { area } from './circle.mjs'

console.log(\`The area of a circle of radius 4 is \${area(4)}\`)`
            },
            {
              type: 'text',
              content: 'ESM 支持命名导出、更好的静态分析、tree-shaking、浏览器本机支持，最重要的是，作为一个标准，它基本上是 JavaScript 的未来。<a href="https://antfu.me/posts/publish-esm-and-cjs" target="_blank">Ship ESM & CJS in one Package</a>',
            },
            {
              type: 'text',
              content: '目前很多的项目还是在使用 CJS，也有许多的项目正在开始向 ESM 进行迁移。而目前主流的测试框架 jest 对于 ESM 的支持还是有待改进的。',
            }
          ],
        },
        {
          title: 'Vite同步的配置文件',
          value: 'syncConfigFile',
          content: [
            {
              type: 'text',
              content: '对于本来使用 vite 作为构建工具的项目来说是个优点，因为这样本质上就可以复用一份配置文件了。当然如果想单独使用一份测试配置而不是和 vite 对应的构建配置共用一份，那么可以使用一个叫做 <code>vitest.config.js</code> 的配置文件，vitest 会以该文件为最高优先级配置。',
            }
          ]
        },
        {
          title: "内置 TypeScript 支持",
          value: "insideTypescript",
          content: [
            {
              type: "text",
              content: "一般来说， 使用 jest 测试框架，如果需要测试 ts 或者 tsx 的代码逻辑的话，会需要使用到 ts-jest ，项目中还需要增加一份配置，例如一份 jest.config.js 配置:",
            },
            {
              type: 'codeBlock',
              language: 'javascript',
              content: `module.exports = {
  transform: {
    '^.+\.(t|j)sx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: \`\${__dirname}/tsconfig.test.json\`,
    },
  },
};`
            },
            {
              type: 'text',
              content: '现在很多应用都使用 TS 来进行开发了，使用 jest 每次都要增加一些冗余配置以及额外的包引入，而如果使用 vitest 则支持开箱即用。',
            },
            {
              type: 'img',
              content: 'jest-config.png',
              style: 'width: 70%'
            }
          ],
        },
        {
          title: 'watch 模式',
          value: 'watchMode',
          content: [
            {
              type: 'text',
              content: '当你修改源代码或测试文件时，Vitest 智能搜索模块依赖树并只重新运行相关测试。',
            },
            {
              type: 'codeBlock',
              language: 'bash',
              content: `$ vitest`
            },
            {
              type: 'text',
              content: 'vitest 在开发环境下默认 启动时使用 监听模式。可以使用 <code>vitest watch</code> 或 <code>vitest run</code> 明确指定所需的模式。',
            }
          ]
        },
        {
          title: "用例执行速度",
          value: "speed",
          content: [
            {
              type: "text",
              content: "Vitest 是由 Vite 驱动的下一代测试框架。",
            },
          ],
        },
        {
          title: '社区完善与丰富度',
          value: 'community',
          content: [
            {
              type: 'text',
              content: '不可否认的是，Vitest作为近些年新出现的测试框架，社区的完善度和丰富度还和老牌jest测试框架存在一定差异。',
            },
            {
              type: 'text',
              content: '总体来说，如果你想给你的新项目使用 vitest 或者将旧项目的测试方案从 jest 迁移到 vitest, vitest都有其值得一试的优点：',
            },
            {
              type: 'list',
              content: [
                '拥抱 native esm',
                '开箱即用，配置简单直接不臃肿',
                'API高度相似，迁移成本低',
                '配合vite，将拥有可观的测试速度提升'
              ],
            },
            {
              type: 'text',
              content: '本质上 vitest 带来的性能提升除了 vitest 研发团队做的一些关于依赖图的优化，更大程度上还是来源于 esbuild 的高性能。而且 vitest 仅仅从配置的简洁以及一些现代化的工具(例如 TS、JSX、ESM)的开箱即用，本质上是要比臃肿的 jest 要灵活不少的。',
            },
            {
              type: 'text',
              content: '虽然目前 vitest 还处于一个初期迭代阶段，但由于 vite 本身的使用以及社区中的一些流行框架的使用，个人觉得 vitest 本身已经具备了在实际项目中使用的能力。',
            },
            {
              type: 'text',
              content: '<a href="https://www.51cto.com/article/715963.html" target="_bl;ank">Vitest：替代 Jest 的前端测试工具新选择</a>',
            }
          ]
        }
      ],
    },
  ],
};
