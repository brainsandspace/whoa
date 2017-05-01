const tokenizeEllipsis = require('./tokenizers/ellipsis.js');
const tokenizeWordChoice = require('./tokenizers/wordChoice.js');
const tokenizeTangent = require('./tokenizers/tangent.js');
const tokenizeNormative = require('./tokenizers/normative.js');

function whoa() {
  var Parser = this.Parser;
  var tokenizers = Parser.prototype.inlineTokenizers;
  var methods = Parser.prototype.inlineMethods;

  tokenizers.ellipsis = tokenizeEllipsis;
  tokenizers.wordChoice = tokenizeWordChoice;
  tokenizers.tangent = tokenizeTangent;
  tokenizers.normative = tokenizeNormative;

  /* Run my tokenizers just before `text`. */
  methods.splice(methods.indexOf('text'), 0, 'ellipsis');
  methods.splice(methods.indexOf('text'), 0, 'wordChoice');
  methods.splice(methods.indexOf('text'), 0, 'normative');
  methods.splice(methods.indexOf('text'), 0, 'tangent');
}

module.exports = whoa;
