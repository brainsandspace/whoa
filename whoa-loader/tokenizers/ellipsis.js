function tokenizeEllipsis(eat, value, silent) {
  var match = /(\.\.\.)/.exec(value);

  var index = 0;
  character = value.charAt(index);

  if (character !== '.' || value.charAt(++index) !== character) {
    return;
  }

  if (match) {
    if (silent) {
      return true;
    }

    return eat(match[0])({
      type: 'ellipsis',
      children: [
        {
          value: `${match[0]}`,
          type: 'text',
        },
      ],
    });
  }
}

function locateEllipsis(value, fromIndex) {
  console.log(value.indexOf('...', fromIndex))
  return value.indexOf('...', fromIndex);
}

// tokenizeMention.notInLink = true;
tokenizeEllipsis.locator = locateEllipsis;

module.exports = tokenizeEllipsis;
