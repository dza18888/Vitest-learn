<template>
  <div class="Documentation">
    <Header></Header>
    <div class="documentation-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import { ref } from "vue";
</script>

<style lang="scss" scoped>
</style>
