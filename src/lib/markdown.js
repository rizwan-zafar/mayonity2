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

export function renderMarkdown(content) {
  const html = marked.parse(content || "", { async: false, renderer });
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "span"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title"],
      a: ["href", "name", "target", "rel"],
      h1: ["id"],
      h2: ["id"],
      h3: ["id"],
      h4: ["id"],
    },
  });
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
