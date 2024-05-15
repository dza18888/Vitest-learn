<template>
  <div class="SideBar">
    <div class="menu-list">
      <div class="menu-item" v-for="menu in menuList" :key="menu.value">
        <div
          :class="[
            'menu-info',
            menu.children ? 'child-menu-title' : '',
            model === menu.value ? 'active-menu' : '',
          ]"
          @click="changeMenu(menu)"
        >
          {{ menu.title }}
          <div
            :class="['icon-arrow_drop_down', menu.collapse ? 'arrow-up' : '']"
            v-if="menu.children"
          ></div>
        </div>

        <div
          class="child-menu-list"
          :style="{
            'max-height': !menu.collapse
              ? `${menu.children.length * 36}px`
              : '0px',
          }"
          v-if="menu.children"
        >
          <div
            class="child-menu-item"
            v-for="childMenu in menu.children"
            :key="childMenu.value"
          >
            <div
              :class="[
                'menu-info',
                model === childMenu.value ? 'active-menu' : '',
              ]"
              @click="changeMenu(childMenu)"
            >
              {{ childMenu.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineModel } from "vue";

let model = defineModel();
const emit = defineEmits(["changeMenu"]);

const { menuList } = defineProps({
  menuList: {
    type: Array,
    default() {
      return [];
    },
  },
});

function changeMenu(menu) {
  if (menu.children) {
    menu.collapse = !menu.collapse;
    return;
  }
  model.value = menu.value;
  emit("changeMenu");
}
</script>

<style lang="scss" scoped>
.SideBar {
  width: 250px;
  flex-shrink: 0;
  padding: 0 20px;

  .menu-list {
    .menu-item {
      .menu-info {
        padding: 8px 30px;
        margin: 4px 0px;
        width: 100%;
        border-radius: 20px;
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;

        &:not(.child-menu-title):hover {
          background-color: getColor(0.1);
        }

        .icon-arrow_drop_down {
          transition: all 0.5s ease;
        }

        .arrow-up {
          transform: rotate(180deg);
        }

        &.active-menu {
          background-color: getColor(0.1);
        }
      }

      display: flex;
      flex-direction: column;
      justify-content: center;

      .child-menu-list {
        overflow: hidden;
        transition: all 0.4s ease;

        .child-menu-item {
          .menu-info {
            padding-left: 45px;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
