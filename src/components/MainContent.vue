<template>
  <div class="MainContent">
    <SideBar
      v-model="activeMenu"
      :menuList="document.content"
      @changeMenu="changeMenu"
      ref="sideBarRef"
    ></SideBar>
    <RenderDocumentation
      :document="document"
      @scroll="scrollChange"
      ref="documentRef"
    ></RenderDocumentation>
  </div>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import RenderDocumentation from "@/components/RenderDocumentation.vue";
import { onMounted, ref } from "vue";
import { debounce } from "@/utils/utils.js";
const { document } = defineProps({
  document: {
    type: Object,
    default() {
      return {};
    },
  },
});
const documentRef = ref(null);
let activeMenu;
if (document.content) {
  if (document.content[0].children) {
    activeMenu = ref(document.content[0].children[0].value);
  } else {
    activeMenu = ref(document.content[0].value);
  }
}

const scrollChange = debounce((e) => {
  const titleList = [...e.target.children].filter(
    (child) =>
      (child.className === "title" && child.id) ||
      child.className === "sub-title"
  );
  for (let i = titleList.length - 1; i >= 0; i--) {
    let position =
      e.target.scrollTop > titleList[i].offsetTop - 100 ||
      Math.abs(
        e.target.scrollTop + e.target.clientHeight - e.target.scrollHeight
      ) < 10;
    if (position) {
      activeMenu.value = titleList[i].id;
      break;
    }
  }
}, 100);

function changeMenu() {
  const titleElement = documentRef.value.$el.querySelector(
    `#${activeMenu.value}`
  );
  documentRef.value.$el.scrollTo({
    behavior: "smooth",
    top: titleElement.offsetTop - 80,
  });
}
</script>

<style lang="scss" scoped>
.MainContent {
  display: flex;
  width: 100%;
  max-width: 1920px;
  height: calc(100vh - 80px);
}
</style>
