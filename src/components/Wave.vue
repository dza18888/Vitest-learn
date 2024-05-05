<template>
  <div class="hero_area">
    <div class="wave-area" :style="{ bottom: model ? '0px' : '100vh' }">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" :fill="`rgba(${mainColor}, 0.4)`" />
          <use xlink:href="#gentle-wave" x="48" y="3" :fill="`rgba(${mainColor}, 0.6)`" />
          <use xlink:href="#gentle-wave" x="48" y="5" :fill="`rgba(${mainColor}, 0.8)`" />
          <use xlink:href="#gentle-wave" x="48" y="7" :fill="`rgba(${mainColor}, 1)`" />
        </g>
      </svg>
    </div>
    <div class="content-area" :style="{ top: model ? '100vh' : '0px', 'background-color': `rgba(${mainColor}, 1)` }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { RGBAtoRGB } from '@/utils/utils.js'
import { store } from '@/store/store.js';

let model = defineModel();
let mainColor = ref(store.mainColor);

function update() {
  model.value = !model.value;
}

watch(
  () => store.mainColor,
  color => {
    mainColor.value = color
    updateMainColor()
  }
)

function updateMainColor() {
  let [r, g, b] = mainColor.value.split(',').filter(item => item)
  mainColor.value = RGBAtoRGB(r, g, b, 0.05)
}

onMounted(() => {
  updateMainColor()
});
</script>

<style lang="scss" scoped>
.hero_area {
  position: relative;
  height: 100vh;
  z-index: 0;
  background-color: getColor(0.3);

  .wave-area {
    height: 150px;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    transition: all ease 1.5s;

    .waves {
      width: 100%;
      height: 150px;
    }
  }

  .content-area {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 100vh;
    transition: all ease 1.5s;
  }
}

.parallax>use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax>use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax>use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax>use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax>use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/*Shrinking for mobile*/

@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
}
</style>
