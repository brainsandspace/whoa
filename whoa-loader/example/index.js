const unified = require('unified');
const remarkParse = require('remark-parse');
const html = require('remark-html');
const remark = require('remark');
const react = require('react')
const remarkReact = require('remark-react');
const fm = require('front-matter');

const remarkWhoa = require('../remark-whoa.js');

const rawMarkup = `---
title: Just hack'n
description: Nothing to see here
---

# Whoa
**whoah**

*All Markdown should work.*

Because Markdown is **dope**.

So EXPRESSIVE AND {fast, easy, readable}(?)

And here's onemore(?).

Let's see...those dots should have appeared one by one.

@David

\`\`\`
const foo = (bar) => { 
  console.log(bar);
};
\`\`\`

🔎etymology of jot🔍

**Just** is a weird word.

Let's explore its etymology.


So is **token**.

I should make this normative thing work. (It works.)


|- A tangent is in here -|

let's put some words later too.
`;

const rawContainer = document.querySelector('.raw-container');
const whoaContainer = document.querySelector('.whoa-container');

const fronted = fm(rawMarkup);

// const ast = unified().use(remarkParse).use(remarkWhoa).parse(body); // .use(html)
// console.log(ast);

// render output to DOM
remark().use(remarkWhoa).use(html).process(rawMarkup, (err, file) => {
  console.log(file);
  // console.log(String(file));

  rawContainer.innerText = String(file);
  whoaContainer.innerHTML = String(file);

  console.log(fronted)
});

