/**
 * Search components are wrapped with 🔎like this🔍.
 */

function tokenizeSearch(eat, value, silent) {
  var match = /🔎(.*)🔍/.exec(value);
  var index = 0;
  // character = value.charAt(index);
  // value.charAt(index) was not working with emoji...
  character = value.slice(index, 2);
  index++;

  if (match) {
    if (character === '🔎' && match.index === 0) {
      if (silent) {
        return true;
      }
      return eat(match[0])({
        type: 'search',
        children: [
          {
            value: match[1].trim(),
            type: 'text',
          },
        ],
      });
    }
  }

  return;
}

function locateSearch(value, fromIndex) {
  var match = /🔎(.*)🔍/.exec(value);
  return value.indexOf('🔎', fromIndex);
}

tokenizeSearch.locator = locateSearch;

module.exports = tokenizeSearch;
