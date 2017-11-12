const frontmatter = require('front-matter');
const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkWhoa = require('../remark-whoa/index.js');

module.exports = function(content) {
  // this.cacheable();

  const fronted = frontmatter(content);
  const readTime = content.split(' ').length/275;// medium does read time as about ~275 wpm, and they take into account images too, which I currently am not.

  const attributes = Object.assign({ readTime }, fronted.attributes)

  return `module.exports = {
    attributes: ${JSON.stringify(attributes)},
    content: ${JSON.stringify(unified().use(remarkParse).use(remarkWhoa).parse(fronted.body))}
  }`;
};

