<template>
  <ul class="loading-frame" :style="arrowStyle">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </ul>
</template>
<script setup>
import { ref, defineProps, computed, onMounted } from "vue";
const { placement } = defineProps({
  placement: {
    type: String,
    default: "right",
  },
});

const arrowStyle = computed(() => {
  const styleObj = {};
  if (placement === "right") {
    styleObj.right = "-100px";
    styleObj.top = "50%";
    styleObj.transform = "translateY(-50%) rotate(180deg)";
  } else if (placement === "left") {
    styleObj.left = "-100px";
  }
  let styleStr = "";
  Object.keys(styleObj).forEach((key) => {
    styleStr += `${key}: ${styleObj[key]};`;
  });
  return styleStr;
});

onMounted(() => {
  console.log(arrowStyle);
});
</script>
<style lang="scss" scoped>
.loading-frame {
  position: absolute;
  width: 100px;
  height: 50px;
}
.circle {
  position: absolute;
  height: 8px;
  width: 8px;
  border-radius: 8px;
  background-color: #3fc380;
  animation: animate linear 2s infinite;
}
.circle:nth-child(1) {
  animation-delay: 0.9s;
  transform: translate(65px, 7px);
}
.circle:nth-child(2) {
  animation-delay: 1.1s;
  transform: translate(75px, 14px);
}
.circle:nth-child(3) {
  animation-delay: 1.3s;
  transform: translate(85px, 22px);
}
.circle:nth-child(4) {
  animation-delay: 1.1s;
  transform: translate(75px, 31px);
}
.circle:nth-child(5) {
  animation-delay: 0.9s;
  transform: translate(65px, 38px);
}
.circle:nth-child(6) {
  animation-delay: 0.9s;
  transform: translate(66px, 23px);
}
.circle:nth-child(7) {
  animation-delay: 0.7s;
  transform: translate(53px, 23px);
}
.circle:nth-child(8) {
  animation-delay: 0.5s;
  transform: translate(40px, 23px);
}
.circle:nth-child(9) {
  animation-delay: 0.3s;
  transform: translate(27px, 23px);
}
.circle:nth-child(10) {
  animation-delay: 0.1s;
  transform: translate(14px, 23px);
}
@keyframes animate {
  0%,
  100% {
    background-color: #3fc380;
  }
  50% {
    background-color: #fff;
  }
}
</style>
