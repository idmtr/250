import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

// Simplified plugin to remove first h1
function remarkRemoveTitle() {
  return (tree: any) => {
    let foundTitle = false;
    visit(tree, "heading", (node, index, parent) => {
      if (!foundTitle && node.depth === 1) {
        parent.children.splice(index, 1);
        foundTitle = true;
        return [visit.SKIP, index];
      }
    });
  };
}

export async function processMarkdown(content: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRemoveTitle)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      passThrough: ['h2', 'h3', 'h4', 'h5', 'h6']
    })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return file.toString();
}
