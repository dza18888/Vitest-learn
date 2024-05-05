<template>
  <div class="Debug">
    <MainContent :document="document"></MainContent>
  </div>
</template>

<script setup>
import MainContent from "@/components/MainContent.vue";
import Debug from "./documentation/Debug.js";
import { ref } from "vue";

const document = ref(Debug);
</script>

<style lang="scss" scoped>
</style>