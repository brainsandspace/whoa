#!/usr/bin/env node
'use strict';

const importJsx = require('import-jsx');
const {h, render} = require('ink');
const meow = require('meow');

const Ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ whoa-cli [input]

	Options
	  --name  Lorem ipsum [Default: false]

	Examples
	  $ whoa-cli
	  I love Ink
	  $ whoa-cli --name=ponies
	  I love ponies
`);

render(h(Ui, cli.flags));
