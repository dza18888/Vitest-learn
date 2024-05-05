<template>
  <div class="vi-button" ref="viButton" @click="initCircle">
    <span class="text"><slot></slot></span>
    <div class="wave" :style="{ width: waveWidth, height: waveWidth }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const viButton = ref(null);
let waveWidth = ref("100px");
const emit = defineEmits(["click"]);

function initCircle(e) {
  emit("click");
  let x = e.offsetX;
  let y = e.offsetY + e.target.offsetTop;

  let circle = document.createElement("span");
  circle.setAttribute("class", "circle");
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  e.currentTarget.appendChild(circle);
  setTimeout(() => {
    circle.remove();
  }, 1000);
}

onMounted(() => {
  waveWidth.value = `${viButton.value.clientWidth + 40}px`;
});
</script>

<style lang="scss" scoped>
.vi-button {
  width: fit-content;
  padding: 15px 40px;
  cursor: pointer;
  position: relative;
  display: block;
  text-decoration: none;
  overflow: hidden;
  border-radius: 23px;

  &:hover {
    .wave {
      top: -100px;
    }
  }

  .text {
    position: relative;
    z-index: 1;
    color: white;
    font-size: 16px;
    font-weight: bold;
    pointer-events: none;
  }

  .wave {
    background-image: $mainLinear;
    position: absolute;
    left: 0;
    top: 0px;
    transition: 1s;

    &::before,
    &::after {
      width: 200%;
      height: 200%;
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -75%);
    }

    &::before {
      border-radius: 45%;
      background-color: $text;
      animation: wave 5s linear infinite;
    }

    &::after {
      border-radius: 40%;
      background-color: $text;
      animation: wave 10s linear infinite;
    }
  }
}

@keyframes wave {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
</style>

<style lang="scss">
.circle {
  position: absolute;
  background-color: rgba($color: white, $alpha: 0.4);
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: circle-enlarge 1s linear infinite;
}

@keyframes circle-enlarge {
  0% {
    width: 0px;
    height: 0px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
</style>
