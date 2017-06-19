const frontmatter = require('front-matter');
const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkWhoa = require('./remark-whoa.js');

module.exports = function(content) {
  // this.cacheable();

  const fronted = frontmatter(content);

  return `module.exports = {
    attributes: ${JSON.stringify(fronted.attributes)},
    content: ${JSON.stringify(unified().use(remarkParse).use(remarkWhoa).parse(fronted.body))}
  }`;
};

