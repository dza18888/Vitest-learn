<template>
  <div class="VitestIntro">
    <MainContent :document="document"></MainContent>
  </div>
</template>

<script setup>
import MainContent from "@/components/MainContent.vue";
import VitestIntro from "./documentation/VitestIntro.js";
import { ref } from "vue";

const document = ref(VitestIntro);
</script>

<style lang="scss" scoped>
</style>
