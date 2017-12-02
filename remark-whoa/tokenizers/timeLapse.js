/**
 * A time lapse is a statement like ...{}
 */
function tokenizeTimeLapse(eat, value, silent) {
  var match = /\.\.\.{(.*)}/.exec(value);
  var index = 0;

  character = value.charAt(index);

  // if (character !== '.' || value.charAt(++index) !== character) {
  //   return;
  // }

  if (match) {
    if (character === '.' && match.index === 0)
      if (silent) {
        return true;
      }
    const now = eat.now();

    return eat(match[0])({
      type: 'timeLapse',
      children: [
        {
          value: `${match[1]}`,
          type: 'text',
        },
      ],
    });
  }
}

function locateTimeLapse(value, fromIndex) {
  return value.indexOf('...{', fromIndex);
}

tokenizeTimeLapse.locator = locateTimeLapse;

module.exports = tokenizeTimeLapse;
