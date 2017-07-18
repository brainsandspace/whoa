const tokenizeRevision = require('./tokenizers/revision.js');
const tokenizeRedaction = require('./tokenizers/redaction.js');
const tokenizeEllipsis = require('./tokenizers/ellipsis.js');
const tokenizeWordChoice = require('./tokenizers/wordChoice.js');
const tokenizeTangent = require('./tokenizers/tangent.js');
const tokenizeNormative = require('./tokenizers/normative.js');
const tokenizeSearch = require('./tokenizers/search.js');

function whoa() {
  var Parser = this.Parser;
  var inlineTokenizers = Parser.prototype.inlineTokenizers;
  var inlineMethods = Parser.prototype.inlineMethods;

  inlineTokenizers.revision = tokenizeRevision;
  inlineTokenizers.redaction = tokenizeRedaction;
  inlineTokenizers.ellipsis = tokenizeEllipsis;
  inlineTokenizers.wordChoice = tokenizeWordChoice;
  inlineTokenizers.tangent = tokenizeTangent;
  inlineTokenizers.normative = tokenizeNormative;
  inlineTokenizers.search = tokenizeSearch;

  /* Run my tokenizers just before `text`. */
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'revision');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'redaction');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'ellipsis');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'wordChoice');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'normative');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'tangent');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'search');
}

module.exports = whoa;
