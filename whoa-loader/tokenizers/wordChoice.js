function tokenizeWordChoice(eat, value, silent) {
  // var match = /^@(\w+)/.exec(value);
  var match = /{(.*)}\(\?\)|^(\w*)\(\?\)/.exec(value);

  var index = 0;
  character = value.charAt(index);
  index++;

  /**
   * Two cases: 
   * (1) you give multiple words surrounded by curly brackets, followed by (?), 
   * (2) you just put (?) at the end of a single word
   * 
   */

  if (match) {
    if (character === '{' && match.index === 0) {
      if (silent) {
        return true;
      }

      return eat(match[0])({
        type: 'wordChoice',
        children: [...match[1].split(', ').map(word => {
            return {
              type: 'text',
              value: word,
            };
          })],
      });
    }

    if (match.index === 0) {
      if (silent) {
        return true;
      }

      return eat(match[0])({
        type: 'wordChoice',
        children: [
          {
            type: 'text',
            value: match[2],
          },
        ],
      });
    }
  }

  return;
}

function locateWordChoice(value, fromIndex) {
  var match = /{(.*)}\(\?\)|(\w*)\(\?\)/.exec(value);
  return match ? match.index : -1;

  // return value.indexOf('(?)', fromIndex);
}

// tokenizeMention.notInLink = true;
tokenizeWordChoice.locator = locateWordChoice;

module.exports = tokenizeWordChoice;
