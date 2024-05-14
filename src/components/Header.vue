<template>
  <div class="Header">
    <div class="left-placement"></div>
    <div class="menu-list">
      <div :class="['menu-item', activeMenu === menu.value ? 'active-menu' : '']" v-for="menu in menuList"
        :key="menu.value" @click="changeMenu(menu.value)">
        {{ menu.label }}
      </div>
    </div>
    <div class="right-buttons">
      <div class="change-color" v-click-outside="closeColorDialog">
        <div class="icon-paint-format" @click="colorDialogShow = true"></div>
        <div class="color-list" v-if="colorDialogShow">
          <div class="icon-arrow_drop_up"></div>
          <div class="color-item" v-for="color in colorList" :key="color" :title="color"
            :style="{ 'background-color': `rgb(${color})` }" @click="changeColor(color)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineModel } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store } from '@/store/store.js'
const router = useRouter();
const route = useRoute();

const menuList = ref([
  {
    label: "Vitest简介",
    value: "vitestIntro",
  },
  {
    label: "用例执行与调试",
    value: "debug",
  },
  {
    label: "用例编写",
    value: "basicGrammar",
  },
  {
    label: "vue-test-utils",
    value: "vueTestUtils",
  },
  {
    label: "其他",
    value: "other",
  },
]);

const colorList = [
  "80, 110, 16",
  "246, 88, 136",
  "121, 125, 248",
  "83, 172, 228",
  "251, 140, 85",
  "244, 81, 74",
];
let colorDialogShow = ref(false);

let color = "black";

const vClickOutside = {
  mounted(el, binding) {
    el._clickOutsideHandler = (event) => {
      if (el !== event.target && !el.contains(event.target)) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el._clickOutsideHandler);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el._clickOutsideHandler);
  },
};

function closeColorDialog() {
  colorDialogShow.value = false;
}

function changeColor(color) {
  document.documentElement.style.setProperty("--mainColor", color);
  store.mainColor = color

}

const activeMenu = ref(route.name);

function changeMenu(menu) {
  activeMenu.value = menu;
  router.push({
    name: menu,
  });
}
</script>

<style lang="scss" scoped>
.Header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-placement {
    width: 200px;
  }

  .menu-list {
    display: flex;

    .menu-item {
      padding: 9px 15px;
      margin: 0 3px;
      cursor: pointer;
      font-size: 12px;
      border-radius: 15px;
      user-select: none;

      &:hover {
        background-color: getColor(0.1);
      }

      &.active-menu {
        background-color: getColor(0.1);
      }
    }
  }

  .right-buttons {
    width: 200px;

    .change-color {
      position: relative;
      z-index: 1;

      .icon-paint-format {
        color: $text;
        font-size: 14px;
        cursor: pointer;
      }

      .icon-arrow_drop_up {
        position: absolute;
        left: 0;
        top: -14px;
        font-size: 24px;
        color: $text;
      }

      .color-list {
        position: absolute;
        top: 24px;
        left: -6px;
        display: flex;
        align-items: center;
        background-color: $text;
        border-radius: 5px;
        padding: 15px;

        .color-item {
          width: 20px;
          height: 20px;
          border-radius: 3px;
          cursor: pointer;
          margin-right: 5px;

          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
