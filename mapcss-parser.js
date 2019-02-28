const nearley = require("nearley");
const compile = require("nearley/lib/compile");
const generate = require("nearley/lib/generate");
const nearleyGrammar = require("nearley/lib/nearley-language-bootstrapped");
const fs = require('fs');

function compileGrammar(sourceCode) {
    // Parse the grammar source into an AST
    const grammarParser = new nearley.Parser(nearleyGrammar);
    grammarParser.feed(sourceCode);
    const grammarAst = grammarParser.results[0]; // TODO check for errors

    // Compile the AST into a set of rules
    const grammarInfoObject = compile(grammarAst, {});
    // Generate JavaScript code from the rules
    const grammarJs = generate(grammarInfoObject, "grammar");

    // Pretend this is a CommonJS environment to catch exports from the grammar.
    const module = { exports: {} };
    eval(grammarJs);

    return module.exports;
}

function MapcssParser(grammar) {
  this.grammar = grammar;
}

MapcssParser.prototype.parse = function(text) {
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

module.exports = new Promise(function(resolve, reject){
    fs.readFile("mapcss.ne", {}, function (err, data) {
      if (err) {
        return reject(err);
      }

      const grammar = compileGrammar(data);
      resolve(new MapcssParser(grammar));
    });
});
