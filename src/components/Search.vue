<template>
  <div class="search">
    <div class="icon-search"></div>
    <div class="search-wrap">
      <div class="search-mask"></div>
      <div class="search-box">
        <div class="search-input">
          <div class="icon-search"></div>
          <input
            v-model="keyword"
            type="text"
            placeholder="Search"
            @input="debounceSearchKeyWord(keyword)"
          />
        </div>
        <div class="search-list" v-if="searchResult.length">
          <div
            class="search-item"
            v-for="(res, index) in searchResult"
            :key="index"
          >
            <div class="layer">
              <span
                v-for="(layerItem, layerIndex) in res.layer"
                :key="layerIndex"
              >
                <span v-html="layerItem"></span>
                <div
                  class="icon-arrow_drop_down"
                  v-if="layerIndex !== res.layer.length - 1"
                ></div>
              </span>
            </div>
            <div class="content" v-if="res.content" v-html="res.content"></div>
          </div>
        </div>
        <div class="empty-data" v-else>
          无搜索结果
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { debounce } from "@/utils/utils.js";

import Debug from "@/views/documentation/Debug.js";
import Grammar from "@/views/documentation/Grammar.js";
import VitestIntro from "@/views/documentation/VitestIntro.js";

let keyword = ref("");
let searchResult = ref([]);
const searchKeyWord = (keyword, documentation, layer) => {
  if (documentation.title) {
    if (documentation.title.indexOf(keyword) !== -1) {
      searchResult.value.push({
        layer: [
          ...layer,
          `<span class="highlight-text">${documentation.title}</span>`,
        ],
      });
    }
    if (documentation.content) {
      documentation.content.forEach((contentItem) => {
        searchKeyWord(keyword, contentItem, [...layer, documentation.title]);
      });
    }
    if (documentation.children) {
      documentation.children.forEach((contentItem) => {
        searchKeyWord(keyword, contentItem, [...layer, documentation.title]);
      });
    }
  } else {
    if (documentation.content) {
      if (
        documentation.type === "text" &&
        filterText(documentation.content).indexOf(keyword) !== -1
      ) {
        searchResult.value.push({
          layer,
          content: sliceRelateStr(keyword, filterText(documentation.content)),
        });
      } else if (
        documentation.type === "list" &&
        filterText(documentation.content.join(",")).indexOf(keyword) !== -1
      ) {
        searchResult.value.push({
          layer,
          content: sliceRelateStr(
            keyword,
            filterText(documentation.content.join(","))
          ),
        });
      }
    }
  }

  console.log(searchResult);
};
const debounceSearchKeyWord = debounce((keyword) => {
  searchResult.value = [];
  searchKeyWord(keyword, Debug, []);
  searchKeyWord(keyword, Grammar, []);
  searchKeyWord(keyword, VitestIntro, []);
}, 1000);

const filterText = (text) => {
  return text
    .replace("<code>", "")
    .replace("</code>", "")
    .replace(/<a.*?>/, "")
    .replace("</a>", "");
};

const sliceRelateStr = (keyword, text) => {
  if (!text) {
    return "";
  }
  let index = text.indexOf(keyword);
  let str = "";
  if (index !== -1) {
    if (index - 20 > 0) {
      str += `...${text.slice(index - 20, index)}`;
    } else {
      str += `${text.slice(0, index)}`;
    }
    if (index + 50 > text.length) {
      str += `${text.slice(index)}`;
    } else {
      str += `${text.slice(index, index + 50)}...`;
    }
  }
  str = str.replace(keyword, `<span class="highlight-text">${keyword}</span>`);
  return str;
};
</script>

<style lang="scss" scoped>
.search {
  margin-left: 10px;
  .icon-search {
    font-size: 14px;
    color: $text;
    cursor: pointer;
    &:hover {
      color: getColor(0.8);
    }
  }
  .search-wrap {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    .search-mask {
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: rgba($color: #000000, $alpha: 0.4);
    }
    .search-box {
      position: absolute;
      top: 20vh;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      padding: 10px;
      border-radius: 10px;
      .search-input {
        position: relative;
        input {
          outline: none;
          width: 600px;
          height: 36px;
          border: 1px solid lightgray;
          font-size: 14px;
          padding-left: 15px;
          padding-right: 30px;
          position: relative;
          border-radius: 5px;
          color: $text;
          box-sizing: border-box;
        }
        .icon-search {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }
      }
      .search-list {
        max-height: 50vh;
        overflow-y: auto;
        .search-item {
          margin-top: 10px;
          border-radius: 5px;
          background-color: getColor(0.05);
          :deep(.highlight-text) {
            background-color: getColor(0.3);
          }
          .layer {
            display: flex;
            font-size: 14px;
            border: 2px solid getColor(0.5);
            border-radius: 5px;
            padding: 10px;
            background-color: white;
            span {
              display: flex;
              align-items: center;
            }
            .icon-arrow_drop_down {
              transform: rotate(-90deg);
              font-size: 20px;
              color: getColor(0.8);
            }
          }
          .content {
            padding: 10px;
            font-size: 13px;
          }
        }
      }
      .empty-data {
        display: flex;
        align-items: center;
        justify-content: center;
        color: $text;
        font-size: 13px;
        padding: 30px 0 20px 0;
      }
    }
  }
}
</style>
