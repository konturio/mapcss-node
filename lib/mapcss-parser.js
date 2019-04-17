'use strict';

const nearley = require("nearley");

const grammar = require("./grammar.js");

function parse(text) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(text.trim());

  if (!parser.results) {
    throw "Unexpected end of file"
  }

  if (parser.results.length != 1) {
    throw new Error("Ambiguous grammar detected. This error most likely indicates an error in MapCSS grammar. Please report an issue to the library developers.");
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
