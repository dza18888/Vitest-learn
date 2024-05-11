<template>
  <el-steps :active="activeStep" simple>
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>
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
        <div class="debugger-item">Node.js</div>
      </div>
    </div>
    <div class="main-content">
      <div class="left-menu">
        <div class="icon-button icon-files"></div>
        <div class="icon-button icon-search1"></div>
        <div class="icon-button icon-source-control"></div>
        <div
          class="icon-button icon-debug-alt"
          @click="debugShow = !debugShow"
        ></div>
        <div class="icon-button icon-extensions"></div>
      </div>
      <div class="debug-run-area" v-show="debugShow">
        <div class="run-debug-button">Run and Debug</div>
        <div class="debug-note">
          To customize Run and Debug
          <span @click.stop="selectDebuggerShow = true"
            >create a launch.json file</span
          >
        </div>
      </div>
      <div class="content">
        <div class="icon-vscode-logo"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
let activeStep = ref(0);
let debugShow = ref(false);
let selectDebuggerShow = ref(false);

function closeSelectDebugger() {
  selectDebuggerShow.value = false;
}

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
      .icon-button {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        cursor: pointer;
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
      .icon-vscode-logo {
        font-size: 200px;
      }
    }
  }
}
</style>
