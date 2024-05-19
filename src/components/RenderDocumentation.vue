<script>
import { h } from "vue";
import CodeBlock from "./CodeBlock.vue";
import VscodeStep from "./VscodeStep.vue";
import RenderHtml from "./RenderHtml.vue";
import RenderImg from "./RenderImg.vue";
import RenderTip from "./RenderTip.vue";

export default {
  props: ["document"],
  setup(props) {
    const doc = props.document;
    const functionMap = {
      renderWrap,
      renderMainTitle,
      renderContent,
      renderTitle,
      renderText,
      renderList,
      renderCodeBlock,
      renderVscodeStep,
      renderImg,
      renderTip,
    };
    function renderWrap(doc) {
      return h(
        "div",
        {
          class: "document-wrap",
        },
        [renderMainTitle(doc.title), renderContent(doc.content)]
      );
    }
    function renderMainTitle(title) {
      return h(
        "div",
        {
          class: "main-title",
        },
        title
      );
    }
    function renderContent(contentList, isSubTitle = false) {
      const contents = [];
      contentList.forEach((item) => {
        if (isSubTitle) {
          contents.push(renderSubTitle(item));
        } else {
          contents.push(renderTitle(item));
        }

        if (item.content) {
          item.content.forEach((item2) => {
            let renderFunc = `render${item2.type
              .slice(0, 1)
              .toUpperCase()}${item2.type.slice(1)}`;
            functionMap[renderFunc] &&
              contents.push(functionMap[renderFunc](item2));
          });
        }

        if (item.children) {
          contents.push(...renderContent(item.children, true));
        }
      });
      return contents;
    }
    function renderSubTitle(item) {
      return h(
        "div",
        {
          class: "sub-title",
          id: item.value,
        },
        item.title
      );
    }
    function renderTitle(item) {
      return h(
        "div",
        {
          class: "title",
          id: item.children ? "" : item.value,
        },
        item.title
      );
    }
    function renderText(item) {
      let text = item.content;

      return h(RenderHtml, {
        style: item.style,
        html: text,
      });
    }
    function renderList(item) {
      const liList = [];
      item.content.forEach((li) => {
        liList.push(
          h(
            "li",
            {
              class: "list-item",
            },
            renderText({ content: li })
          )
        );
      });
      return h(
        "ul",
        {
          class: "list",
          style: item.style,
        },
        liList
      );
    }
    function renderCodeBlock(item) {
      return h(CodeBlock, {
        code: item.content,
        language: item.language,
      });
    }
    function renderVscodeStep() {
      return h(VscodeStep, {});
    }
    function renderImg(item) {
      return h(RenderImg, {
        url: item.content,
        style: item.style,
      });
    }
    function renderTip(item) {
      return h(RenderTip, {
        content: item.content,
        style: item.style,
      });
    }
    return () => renderWrap(doc);
  },
};
</script>

<style lang="scss" scoped>
.document-wrap {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: auto;
  overflow-x: hidden;

  .main-title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 1px;
      background-color: $border;
    }
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    padding: 15px 0;
  }

  .sub-title {
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    padding: 10px 0;
  }

  .list {
    padding: 10px 0;

    .list-item {
      font-size: 13px;
      position: relative;
      padding-left: 15px;
      line-height: 24px;

      &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        left: 0;
        top: 8px;
        background-color: getColor(0.5);
      }
    }
  }
}
</style>
