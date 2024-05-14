<template>
  <div class="html-content" v-html="html"></div>
</template>

<script setup>
import { defineProps } from "vue";
let { html } = defineProps({
  html: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.html-content {
  line-height: 24px;
  font-size: 14px;
  margin: 8px 0;

  :deep(code) {
    background-color: getColor(0.1);
    color: getColor(1);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    padding: 2px 10px;
  }

  :deep(a) {
    color: getColor(1);
    text-decoration: underline;
    cursor: pointer;
  }

  :deep(b) {
    font-weight: bold;
  }
}
</style>
