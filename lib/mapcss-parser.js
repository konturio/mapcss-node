'use strict';

const nearley = require("nearley");

const fs = require('fs');

const compile = require("./compiler.js");

function MapCSSParser() {
  this.grammar = null;
}

MapCSSParser.prototype.initFromFile = function(file) {
  var self = this;

  return new Promise(function(resolve, reject) {
    fs.readFile(file, {}, function (err, data) {
      if (err) {
        return reject(err);
      }

      self.grammar = compile(file, data);
      resolve();
    });
  });
}

MapCSSParser.prototype.init = function(grammar) {
  var self = this;

  return new Promise(function(resolve, reject) {
    self.grammar = grammar;
    resolve();
  });
}

MapCSSParser.prototype.parse = function(text) {
  if (!this.grammar) {
    throw "Parser is not initialized"
  }

  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(this.grammar));

  parser.feed(text.trim());

  if (!parser.results) {
    throw "Unexpected end of file"
  }

  if (parser.results.length != 1) {
    throw "Ambiguous grammar: " + JSON.stringify(parser.results, 2, 2)
  }

  return parser.results[0];
}

if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
  module.exports = MapCSSParser;
} else {git
  window.MapCSSParser = MapCSSParser;
}
