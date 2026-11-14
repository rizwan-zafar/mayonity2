import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const renderer = new marked.Renderer();
renderer.heading = ({ text, depth }) => {
  const id = String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};

const TABLE_TAGS = ["table", "thead", "tbody", "tr", "th", "td"];

export function renderMarkdown(content) {
  let html = marked.parse(content || "", { async: false, renderer });
  html = html.replace(/<table>/g, '<div class="table-scroll"><table>');
  html = html.replace(/<\/table>/g, "</table></div>");
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "span", "div", ...TABLE_TAGS]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title"],
      a: ["href", "name", "target", "rel"],
      h1: ["id"],
      h2: ["id"],
      h3: ["id"],
      h4: ["id"],
      div: ["class"],
      th: ["align"],
      td: ["align"],
    },
  });
}

function faqAnswerPlain(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) =>
      line
        .replace(/^[-*+]\s+/, "")
        .replace(/^\d+\.\s+/, "")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    )
    .join(" ")
    .trim();
}

/** FAQ pairs from a "## Frequently asked questions" section with ### questions. */
export function extractFaqFromMarkdown(content) {
  const lines = String(content || "").split("\n");
  let inFaq = false;
  let question = null;
  const answerLines = [];
  const faqs = [];

  const flush = () => {
    if (!question) return;
    const answer = faqAnswerPlain(answerLines.join("\n"));
    if (answer) faqs.push({ question, answer });
    answerLines.length = 0;
  };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)\s*$/);
    if (h2) {
      const title = h2[1].trim();
      if (/^frequently asked questions$/i.test(title)) {
        inFaq = true;
        flush();
        question = null;
        continue;
      }
      if (inFaq) {
        flush();
        break;
      }
      continue;
    }
    if (!inFaq) continue;

    const h3 = line.match(/^###\s+(.+)\s*$/);
    if (h3) {
      flush();
      question = h3[1].trim();
      continue;
    }
    if (question) answerLines.push(line);
  }
  flush();
  return faqs;
}

export function extractHeadings(content) {
  return String(content || "")
    .split("\n")
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { text, id };
    });
}
