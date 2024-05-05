<script>
import { h } from "vue";
import CodeBlock from "./CodeBlock.vue";

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
      let reg = /<code>.*?<\/code>|<a href=".*?">.*?<\/a>/g;
      let basicTextList = text.split(reg);
      let codeList = text.match(reg);
      let textList = [];

      for (let i = 0; i < basicTextList.length; i++) {
        if (basicTextList[i]) {
          textList.push(basicTextList[i]);
        }
        if (codeList && codeList.length) {
          if (/<code>.*?<\/code>/.test(codeList[0])) {
            textList.push(
              renderInlineCode(codeList[0].replace(/<code>(.*?)<\/code>/, "$1"))
            );
          } else {
            textList.push(
              renderLink(
                codeList[0].replace(/<a href="(.*?)">(.*?)<\/a>/, "$1"),
                codeList[0].replace(/<a href="(.*?)">(.*?)<\/a>/, "$2")
              )
            );
          }

          codeList.splice(0, 1);
        }
      }
      return h(
        "p",
        {
          class: "basic-content",
          style: item.style,
        },
        textList
      );
    }
    function renderInlineCode(code) {
      return h(
        "span",
        {
          class: "inline-code",
        },
        code
      );
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
    function renderLink(link, text) {
      return h(
        "a",
        {
          href: link,
          class: "link",
          target: "_blank",
        },
        text
      );
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

  .basic-content {
    line-height: 24px;
    font-size: 14px;

    .inline-code {
      background-color: getColor(0.1);
      color: getColor(1);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        "Liberation Mono", "Courier New", monospace;
      padding: 2px 10px;
    }

    .link {
      color: getColor(1);
    }
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
