<template>
  <div class="tip">
    <div class="tip-title">
      TIP
    </div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script setup>
import { defineProps, watch, ref } from "vue";
let { content } = defineProps({
  content: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.tip {
  .tip-title {
    color: getColor(1);
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  margin: 10px 0;
  width: 100%;
  background-color: getColor(0.2);
  padding: 15px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 16px;
}
</style>
