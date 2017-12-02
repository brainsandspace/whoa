/**
 * A revision is a statement like
 * ✍{statement}
 * or ✍{statement}(hint)
 *
 * ⚠️ hint cannot contain parentheses!
 */
const shortid = require('shortid');

function tokenizeRevision(eat, value, silent) {
  // ⚠ the order of the regex OR groups matters (the parts seperated by pipes)
  var match = /✍️{([^✍️]*)}\(([^\)]*)\)|✍️{([^✍️]*)}/.exec(value);
  var index = 0;
  // value.charAt(index) was not working with emoji...
  character = value.slice(index, 2);
  index++;

  if (match) {
    if (character.includes('✍️') && match.index === 0) {
      if (silent) {
        return true;
      }
      const now = eat.now();

      if (match[3]) {
        return eat(match[0])({
          type: 'revision',
          id: `revision-${shortid.generate()}`,
          children: [...this.tokenizeInline(match[3], now)],
        });
      }

      return eat(match[0])({
        type: 'revision',
        id: `revision-${shortid.generate()}`,
        children: [...this.tokenizeInline(match[1], now), match[2]],
      });
    }
  }

  return;
}

function locateRevision(value, fromIndex) {
  return value.indexOf('✍️{', fromIndex);
}

tokenizeRevision.locator = locateRevision;

module.exports = tokenizeRevision;
