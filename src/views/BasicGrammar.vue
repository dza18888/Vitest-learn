<template>
  <div class="BasicGrammar">
    <MainContent :document="document"></MainContent>
  </div>
</template>

<script setup>
import MainContent from "@/components/MainContent.vue";
import Grammar from "./documentation/Grammar.js";
import { ref } from "vue";

const document = ref(Grammar);
</script>

<style lang="scss" scoped>
.BasicGrammar {
  width: 100%;
  max-width: 1920px;
}
</style>