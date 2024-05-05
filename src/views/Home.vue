<template>
  <div class="Home">
    <div :class="{ 'vitest-logo': true, 'vitest-logo-min': !waveShow }">
      <div class="logo" @click="waveShow = true">
        <img src="@/assets/img/vitest-logo.svg" alt="" />
      </div>
      <div class="logo-text">
        <div class="vitest-text">Vitest</div>
        <div class="vitest-text-placement"></div>
        <div class="desc-text">Vitest前端测试用例编写经验分享</div>
        <div class="button-groups">
          <vi-button @click="goToDocument">开始</vi-button>
        </div>
      </div>
    </div>
    <Wave v-model="waveShow">
      <Documentation></Documentation>
    </Wave>
  </div>
</template>

<script setup>
import Wave from "@/components/Wave.vue";
import Documentation from "./Documentation.vue";
import { ref } from "vue";

let waveShow = ref(true);

function goToDocument() {
  waveShow.value = false;
}
</script>

<style lang="scss" scoped>
.Home {
  // background-color: getColor(0.2);
  overflow: hidden;
  min-width: 960px;
  .vitest-logo {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    transform-origin: top left;
    transition: all 1s ease;
    &.vitest-logo-min {
      left: 8px;
      top: 8px;
      transform: scale(0.2);
      .logo {
        transform: scale(0.5);
      }
      .logo-text {
        .vitest-text {
          top: 50%;
          left: -60px;
          transform: translateY(-50%);
          background: $text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .desc-text {
          opacity: 0;
        }
        .button-groups {
          opacity: 0;
        }
      }
    }
    .logo {
      width: 300px;
      height: 300px;
      transition: all 1s linear;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .logo-text {
      margin-left: 40px;
      position: relative;
      .vitest-text {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 80px;
        font-weight: bold;
        background: $mainLinear;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all 1s ease;
      }
      .vitest-text-placement {
        height: 70px;
      }
      .desc-text {
        width: 420px;
        font-weight: bold;
        font-size: 42px;
        margin-top: 20px;
        line-height: 60px;
        color: $text;
        transition: all 0.4s ease;
      }
      .button-groups {
        margin-top: 20px;
        transition: all 0.4s ease;
        .button {
          background-color: getColor(1);
          width: 80px;
          height: 40px;
          @include middle;
          color: white;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          &:hover {
            background-color: getColor(0.6);
          }
        }
      }
    }
  }
}
</style>
