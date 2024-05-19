<template>
  <div class="test-component">
    <div class="desc-text">Vitest前端测试用例编写经验分享</div>
    <!-- <Wave v-model="waveShow">
      <Documentation></Documentation>
    </Wave> -->
    <slot name="specificSlot"></slot>
    <slot></slot>
    <el-table :data="tableData">
      <el-table-column>
        <template v-slot="scope">
          {{ scope.row.column1 }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import Wave from "@/components/Wave.vue";
import Documentation from "@/views/Documentation.vue";
import { ref, watch } from "vue";
const emit = defineEmits(["fireEvent"]);

let propMockSuccess = false;
const props = defineProps({
  testProp: {
    type: String,
    default: "",
  },
});

watch(
  () => props.testProp,
  (newVal) => {
    if (newVal === "res") {
      propMockSuccess = true;
    }
  },
  { immediate: true }
);

let waveShow = ref(true);

function goToDocument() {
  waveShow.value = false;
}

function fireEvent(params) {
  emit("fireEvent", params);
}

let tableData = ref([
  {
    column1: "test1",
  },
  {
    column1: "test2",
  },
]);
</script>
