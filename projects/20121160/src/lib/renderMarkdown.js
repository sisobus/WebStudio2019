import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import frontmatter from 'remark-frontmatter'
import jsYaml from 'js-yaml'

export const processor = unified()
  .use(remarkParse)
  .use(remarkStringify)
  .use(frontmatter, ['yaml'])
  .use(parseRemarkYaml)
  .use(remarkRehype, {
    allowDangerousHTML: true
  })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeHighlight)
  .use(rehypeStringify)

function parseRemarkYaml() {
  return function(node, file) {
    if (node.children[0] && node.children[0].type === 'yaml') {
      file.data.yaml = jsYaml.load(node.children[0].value)
    }

    console.log(file.data.yaml)
  }
}

export default function renderMarkdown(input) {
  return processor.processSync(input).toString()
}
