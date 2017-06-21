/**
 * A redaction is  a statement that begins with I should.
 */
const shortid = require('shortid');

function tokenizeRedaction(eat, value, silent) {
  var match = /🕵{(.*)}/.exec(value);
  var index = 0;
  // value.charAt(index) was not working with emoji...
  character = value.slice(index, 2);
  index++;

  if (match) {
    if (character === '🕵' && match.index === 0) {
      if (silent) {
        return true;
      }
      const now = eat.now();

      return eat(match[0])({
        type: 'redaction',
        id: `redaction-${shortid.generate()}`,
        children: [...this.tokenizeInline(match[1], now)],
      });
    }
  }

  return;
}

function locateRedaction(value, fromIndex) {
  return value.indexOf('🕵{', fromIndex);
}

tokenizeRedaction.locator = locateRedaction;

module.exports = tokenizeRedaction;
