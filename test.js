const fs = require('fs-extra');
const path = require('path');
require('colors');
const diff = require('diff');

const format = require('./formatter').format;

const tests_path = path.join('tests', 'auto');
async function run() {
  const files = (await fs.readdir(tests_path))
    .filter((f) => f.match(/\.mapcss$/))
    .map((f) => path.join(tests_path, f));

  files.forEach(runSuite);
}

async function runSuite(file) {
  const css = (await fs.readFile(file)).toString();

  const rows = css.split(/^\s*\/\/\s*(.*$)/m)
      .map((r) => r.trim())
      .filter((r) => r);

  if (rows.length % 2) {
    throw "Invalid number of tests for file " + file;
  }

  for (var i = 0; i < rows.length; i += 2) {
    const desc = rows[i];
    const test = rows[i + 1];

    const pg = require('./mapcss-parser');
    const parser = await pg;

    try {
      const ast = parser.parse(test);
      const res = format(ast);
      compareIgnoreSpace(desc, test, res);
    } catch (ex) {
      console.log(("FAILED: " + desc).red)
      console.log(ex);
    }
    //console.log(JSON.stringify(ast, 2, 2))
  }
}

function compareIgnoreSpace(test, expected, actual) {
  if (expected.replace(/\s*/g, "").trim() == actual.replace(/\s*/g, "").trim()) {
    console.log(("OK: " + test).green)
  } else {
    console.log(("FAILED: " + test).red)
    var d = diff.diffWords(expected, actual);
    d.forEach(function(part) {
      // green for additions, red for deletions
      // grey for common parts
      var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
  }
}

run();
