<template>
  <img :src="`src/assets/img/${url}`" alt="" />
</template>

<script setup>
import { defineProps, watch, ref } from "vue";
let { url } = defineProps({
  url: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  margin: 10px 0;
}
</style>
