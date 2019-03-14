#!/usr/bin/env node

'use strict';

/*
 * Compile mapcss.ne file into JS grammar
 */

const nearley = require("nearley");
const compile = require("nearley/lib/compile");
const generate = require("nearley/lib/generate");
const nearleyGrammar = require("nearley/lib/nearley-language-bootstrapped");

const fs = require("fs");

function compileFunc(filename, sourceCode) {
  // Parse the grammar source into an AST
  const grammarParser = new nearley.Parser(nearleyGrammar);
  grammarParser.feed(sourceCode);
  const grammarAst = grammarParser.results[0]; // TODO check for errors

  // Compile the AST into a set of rules
  const grammarInfoObject = compile(grammarAst, {args: [filename]});

  // Generate JavaScript code from the rules
  const grammarJs = generate(grammarInfoObject, "grammar");

  fs.writeFileSync("./lib/grammar.js", grammarJs);
}

const filename = "grammar/mapcss.ne";
const grammar = fs.readFileSync(filename);

compileFunc(filename, grammar);
