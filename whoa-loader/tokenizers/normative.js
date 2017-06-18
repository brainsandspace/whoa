/**
 * A normative―here―is a statement that begins with I should.
 */

function tokenizeNormative(eat, value, silent) {
  var match = /(I\sshould[^.]*\.)/.exec(value);
  var index = 0;
  character = value.charAt(index);
  index++;

  if (match) {
    if (character === 'I' && match.index === 0) {
      if (silent) {
        return true;
      }
      const now = eat.now();

      return eat(match[0])({
        type: 'normative',
        children: [
          { type: 'text', value: 'I should ' },
          ...this.tokenizeInline(match[1].replace('I should ', ''), now),
        ] /*[
          {
            value: match[1].trim(),
            type: 'text',
          },
        ],*/,
      });
    }
  }

  return;
}

function locateNormative(value, fromIndex) {
  var match = /(I\sshould[^.]*)\./.exec(value);
  // it seems that either of thse will work...why? What is locate____ doing?
  // return match ? match.index : -1;
  return value.indexOf('I should', fromIndex);
}

tokenizeNormative.locator = locateNormative;

module.exports = tokenizeNormative;
