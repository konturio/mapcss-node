'use strict';

const nearley = require("nearley");

const fs = require('fs');

const grammar = require("./grammar.js");

function parse(text) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(text.trim());

  if (!parser.results) {
    throw "Unexpected end of file"
  }

  if (parser.results.length != 1) {
    throw "Ambiguous grammar: " + JSON.stringify(parser.results, 2, 2)
  }

  return parser.results[0];
}

const parser = {
  parse: parse
}

if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
  module.exports = parser;
} else {
  window.MapCSSParser = parser;
}
