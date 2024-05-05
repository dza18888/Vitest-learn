<template>
  <div class="CodeBlock" ref="CodeBlockRef">
    <pre :class="language">
      <code>
{{ code }}
      </code>
    </pre>
    <div class="language">
      {{ language }}
    </div>
    <div
      :class="[copied ? 'icon-checkmark' : 'icon-copy']"
      @click="copyCode"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const CodeBlockRef = ref(null);
let { code, language } = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  let highlightCode = CodeBlockRef.value.querySelectorAll("pre code");
  highlightCode.forEach((block) => {
    hljs.highlightElement(block);
  });
});
let copied = ref(false);
function copyCode() {
  navigator.clipboard.writeText(code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<style lang="scss" scoped>
.CodeBlock {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  position: relative;

  &:hover {
    .icon-copy,
    .icon-checkmark {
      display: flex;
    }
  }

  .hljs {
    padding: 0 20px;
    line-height: 18px;
    font-size: 13px;
    text-align: left;
    border-radius: 20px;
  }

  .language {
    position: absolute;
    bottom: 42px;
    right: 12px;
    color: gray;
    font-size: 12px;
    font-family: "Chinese Quotes", Inter, ui-sans-serif, system-ui, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", "Noto Color Emoji";
  }
  .icon-copy,
  .icon-checkmark {
    position: absolute;
    top: 25px;
    right: 10px;
    width: 20px;
    height: 20px;
    font-size: 12px;
    border-radius: 5px;
    color: getColor(1);
    background-color: #fff;
    @include middle;
    cursor: pointer;
    display: none;
    z-index: 1;

    &:hover {
      opacity: 0.8;
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: getColor(0.1);
      left: 0;
      top: 0;
      border-radius: 5px;
      z-index: -1;
    }
  }
}
</style>
