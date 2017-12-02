/**
 * A time lapse is a statement like ...{}
 */
function tokenizeTimeLapse(eat, value, silent) {
  // parts of this are copies directly from https://github.com/wooorm/remark/blob/master/packages/remark-parse/lib/tokenize/thematic-break.js
  // and I doubt this is very stable
  var length = value.length + 1;
  var index = -1;
  var character;
  var subvalue = '';

  while (++index < length) {
    character = value.charAt(index);

    subvalue += character;
  }

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

    return eat(subvalue)({
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

module.exports = tokenizeTimeLapse;
