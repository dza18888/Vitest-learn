<template>
  <vi-button style="margin-bottom: 20px" @click="startGuide"
    >开启引导</vi-button
  >
  <div class="vscode-operation">
    <div class="top">
      <div class="menu-block-list">
        <img src="@/assets/img/vscode.svg" alt="" />
        <div class="menu-block"></div>
        <div class="menu-block"></div>
        <div class="menu-block"></div>
        <div class="menu-block"></div>
        <div class="menu-block"></div>
      </div>
      <div class="title">Visual Studio Code</div>
      <div class="operate-list">
        <div class="icon-chrome-minimize"></div>
        <div class="icon-chrome-maximize"></div>
        <div class="icon-chrome-close"></div>
      </div>
      <div
        class="select-debugger"
        v-show="selectDebuggerShow"
        v-click-outside="closeSelectDebugger"
      >
        <div class="debugger-input">
          <input type="text" placeholder="Select debugger" />
        </div>
        <div class="debugger-item" @click="chooseNodeJs" id="nodeJsSelector">
          Node.js
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="left-menu">
        <div class="icon-button icon-files"></div>
        <div class="icon-button icon-search1"></div>
        <div class="icon-button icon-source-control"></div>
        <div
          class="icon-button icon-debug-alt"
          @click="openDebugRun"
          title="Run and Debug"
          id="debugShowIcon"
        ></div>
        <div class="icon-button icon-extensions"></div>
      </div>
      <div class="debug-run-area" v-show="debugShow">
        <div class="launch-json-created" v-if="launchJsonShow">
          <img
            src="@/assets/img/debug-icon.png"
            id="startDebug"
            title="Start Debugging(F5)"
            alt=""
            @click="startDebugging"
          />
          Debug Current Test File
        </div>
        <div class="debug-init" v-else>
          <div class="run-debug-button">Run and Debug</div>
          <div class="debug-note">
            To customize Run and Debug
            <span id="createLaunch" @click.stop="openDebugSelector"
              >create a launch.json file</span
            >
          </div>
        </div>
      </div>
      <div class="content">
        <div class="icon-vscode-logo"></div>
        <div class="launch-json" v-show="launchJsonShow">
          <div class="tab">
            <div class="tab-item">
              launch.json
              <div
                class="icon-chrome-close"
                @click="launchJsonShow = false"
              ></div>
            </div>
          </div>
          <div class="code" ref="CodeBlockRef">
            <pre class="json">
              <code>{{ code }}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-tour
    v-model="guideOpen"
    :current="currentStep"
    :close-on-press-escape="false"
  >
    <el-tour-step target="#debugShowIcon" placement="right">
      <div style="width: 200px">点击Run & Debug菜单</div>
    </el-tour-step>
    <el-tour-step target="#createLaunch">
      <div style="width: 200px">创建一个launch.json文件</div>
    </el-tour-step>
    <el-tour-step target="#nodeJsSelector"
      ><div style="width: 150px">选择Node.js</div></el-tour-step
    >
    <el-tour-step target="#startDebug"
      ><div style="width: 120px">开始调测</div></el-tour-step
    >
  </el-tour>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
let debugShow = ref(false);
let selectDebuggerShow = ref(false);
let launchJsonShow = ref(false);
let guideOpen = ref(false);
let currentStep = ref(0);

import hljs from "highlight.js";

function closeSelectDebugger() {
  selectDebuggerShow.value = false;
}

let code = `{
  // 想了解更多的信息, 请访问：https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "\${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "\${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}`;

const CodeBlockRef = ref(null);
onMounted(() => {
  let highlightCode = CodeBlockRef.value.querySelectorAll("pre code");
  highlightCode.forEach((block) => {
    hljs.highlightElement(block);
  });
});

const startGuide = () => {
  currentStep.value = 0;
  guideOpen.value = true;
  debugShow.value = false;
  selectDebuggerShow.value = false;
  launchJsonShow.value = false;
};

const openDebugRun = () => {
  debugShow.value = !debugShow.value;
  nextTick(() => {
    currentStep.value = 1;
  });
};

const openDebugSelector = () => {
  selectDebuggerShow.value = true;
  nextTick(() => {
    currentStep.value = 2;
  });
};

const chooseNodeJs = () => {
  launchJsonShow.value = true;
  selectDebuggerShow.value = false;
  currentStep.value = 3;
};

const startDebugging = () => {
  guideOpen.value = false;
  currentStep.value = 0;
};

const vClickOutside = {
  mounted(el, binding) {
    el._clickOutsideHandler = (event) => {
      if (el !== event.target && !el.contains(event.target)) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el._clickOutsideHandler);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el._clickOutsideHandler);
  },
};
</script>

<style lang="scss" scoped>
.vscode-operation {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #181818;
    color: #cccccc;
    height: 30px;
    padding-left: 10px;
    font-size: 13px;
    user-select: none;
    border-bottom: 1px solid #2b2b2b;
    position: relative;
    .menu-block-list {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
      .menu-block {
        width: 40px;
        height: 100%;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: calc(100% - 12px);
          height: 8px;
          border-radius: 4px;
          transform: translate(-50%, -50%);
          background-color: #cccccc;
        }
        &:hover {
          background-color: #2d2e2e;
        }
        &:nth-of-type(3) {
          width: 60px;
        }
        &:nth-of-type(5) {
          width: 28px;
        }
      }
    }
    .operate-list {
      display: flex;
      height: 100%;
      width: 30%;
      justify-content: flex-end;
      div {
        width: 42px;
        height: 100%;
        display: flex;
        justify-content: center;
        font-size: 15px;
        cursor: pointer;
        line-height: 30px;
        &:hover {
          background-color: #373737;
        }
      }
    }
    .select-debugger {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #222222;
      padding: 5px;
      border: 1px solid #313131;
      border-radius: 5px;
      z-index: 1;
      input {
        outline: none;
        border: 1px solid #0078d4;
        background-color: #313131;
        border-radius: 2px;
        width: 300px;
        height: 20px;
        color: #cccccc;
        font-size: 11px;
        padding-left: 10px;
      }
      .debugger-item {
        padding: 4px 10px;
        font-size: 12px;
        cursor: pointer;
        margin-top: 5px;
        color: #efffff;
        &:hover {
          background-color: #04395e;
        }
      }
    }
  }
  .main-content {
    width: 100%;
    height: 600px;
    display: flex;
    .left-menu {
      background-color: #181818;
      display: flex;
      flex-direction: column;
      width: 40px;
      flex-shrink: 0;
      border-right: 1px solid #2b2b2b;
      z-index: 1;
      .icon-button {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        cursor: pointer;
        &.icon-debug-alt {
          position: relative;
        }
        &:hover {
          &::before {
            color: #d7d7d7;
          }
        }
      }
    }
    .debug-run-area {
      width: 300px;
      height: 100%;
      background-color: #181818;
      border-right: 1px solid #2b2b2b;
      .launch-json-created {
        margin: 10px 15px;
        font-size: 12px;
        color: #cccccc;
        display: flex;
        align-items: center;
        background-color: #313131;
        img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .run-debug-button {
        background-color: #0078d4;
        color: white;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 7px;
        border-radius: 2px;
        margin: 15px;
        cursor: pointer;
        user-select: none;
        &:hover {
          opacity: 0.9;
        }
      }
      .debug-note {
        color: #cccccc;
        font-size: 11px;
        line-height: 16px;
        padding: 0 10px;
        span {
          color: #4daafc;
          cursor: pointer;
          user-select: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .content {
      background-color: #1f1f1f;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .icon-vscode-logo {
        font-size: 200px;
      }
      .launch-json {
        position: absolute;
        width: 100%;
        height: 100%;
        .tab {
          background-color: #181818;
          width: 100%;
          height: 32px;
          .tab-item {
            width: 120px;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 13px;
            color: #cccccc;
            background-color: #1f1f1f;
            border-top: 1px solid #0078d4;
            .icon-chrome-close {
              cursor: pointer;
            }
          }
        }
        .hljs {
          background-color: #1f1f1f;
          padding: 0;
          padding-left: 20px;
          font-size: 13px;
          line-height: 20px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        }
      }
    }
  }
}
.el-tour-buttons {
  display: none;
}
</style>
