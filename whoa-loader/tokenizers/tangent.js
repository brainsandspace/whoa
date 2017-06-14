function tokenizeTangent(eat, value, silent) {
  var match = /\|-(.*)-\|/.exec(value);
  var index = 0;
  character = value.charAt(index);
  index++;

  if (match) {
    if (character === '|' && match.index === 0) {
      if (silent) {
        return true;
      }
      console.log('match 1', match[1]);
      return eat(match[0])({
        type: 'tangent',
        children: this.tokenizeInline(match[1], eat.now()),
        /*[
          {
            type: 'text',
            value: match[1].trim(),
          },
        ],*/
      });
    }
  }

  return;
}

function locateTangent(value, fromIndex) {
  var match = /\|-(.*)-\|/.exec(value);

  // it seems that either of thse will work...why? What is locate____ doing?
  // return match ? match.index : -1;
  return value.indexOf('|-', fromIndex);
}

tokenizeTangent.locator = locateTangent;

module.exports = tokenizeTangent;
