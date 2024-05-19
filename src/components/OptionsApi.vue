<template>
  <el-button>abcs</el-button>
</template>
<script>
export default {
  data() {
    return {
      test: "",
    };
  },
  props: {
    testProp: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeTest(value) {
      this.test = value;
    },
  },
};
</script>
