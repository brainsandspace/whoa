const tokenizeTimeLapse = require('./tokenizers/timeLapse.js');
const tokenizeRevision = require('./tokenizers/revision.js');
const tokenizeRedaction = require('./tokenizers/redaction.js');
const tokenizeWordChoice = require('./tokenizers/wordChoice.js');
const tokenizeTangent = require('./tokenizers/tangent.js');
const tokenizeNormative = require('./tokenizers/normative.js');
const tokenizeSearch = require('./tokenizers/search.js');

function whoa() {
  const Parser = this.Parser;

  const blockTokenizers = Parser.prototype.blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;

  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;

  blockTokenizers.timeLapse = tokenizeTimeLapse;

  inlineTokenizers.revision = tokenizeRevision;
  inlineTokenizers.redaction = tokenizeRedaction;
  inlineTokenizers.wordChoice = tokenizeWordChoice;
  inlineTokenizers.tangent = tokenizeTangent;
  inlineTokenizers.normative = tokenizeNormative;
  inlineTokenizers.search = tokenizeSearch;

  blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'timeLapse');

  /* Run my tokenizers just before `text`. */
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'revision');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'redaction');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'wordChoice');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'normative');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'tangent');
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'search');
}

module.exports = whoa;
