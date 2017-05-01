const unified = require('unified');
const remark = require('remark');
const react = require('react');
const remarkParse = require('remark-parse');
const remarkReact = require('remark-react');
const remarkWhoa = require('./remark-whoa.js');
// const html = require('rehype-stringify');

module.exports = function(content) {
  this.cacheable();

  return `module.exports = ${JSON.stringify(unified().use(remarkParse).use(remarkWhoa).parse(content))}`;
  // return `module.exports = ${remark()/*use(remarkWhoa)*/.use(remarkReact).processSync(content).contents}`;
};

