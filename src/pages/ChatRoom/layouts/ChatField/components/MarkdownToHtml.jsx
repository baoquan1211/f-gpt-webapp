import hljs from "highlight.js";
import markdownIt from "markdown-it";
import "./MarkdownToHtml.css";

const MarkdownToHtml = ({ value }) => {
  const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            `<pre language="${lang}"><code>` +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch (error) {
          console.log(error);
        }
      }

      return ""; // use external default escaping
    },
  });
  const html = md.render(value);

  return (
    <div
      className="chat-container"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default MarkdownToHtml;
