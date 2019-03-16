const fs = require('fs-extra');
const path = require('path');
require('colors');
const diff = require('diff');

const format = require('../lib/formatter').format;
const parser = require('../lib/mapcss-parser');

const tests_path = path.join('test', 'auto');

async function run() {
  var files = process.argv.filter((f) => f.match(/\.mapcss$/));
  if (files.length == 0) {
    files = (await fs.readdir(tests_path))
      .filter((f) => f.match(/\.mapcss$/))
      .map((f) => path.join(tests_path, f));
  }

  files.reduce((promise, file) =>
    promise.then((result) => runSuite(file)
      .then(Array.prototype.concat.bind(result))
      .catch((e) => {
        console.error(("Cannot run test " + file + "\n ").red, e)
        return [];
      })
    )
  , Promise.resolve([]))
    .then((results) => {
      const succeed = results.filter((x) => x).length;
      const failed = results.filter((x) => !x).length;
      console.log(
        "Succeed: " + succeed.toString().green +
        (failed ? " Failed: " + failed.toString().red : '')
      );
    });
}

async function runSuite(file) {
  const css = (await fs.readFile(file)).toString();
  const suite = file;
  var rows = css.split(/^\s*\/\/\s*@Test(.*$)/im)
    .map((r) => r.trim())
    .filter((r) => r);

  if (rows.length == 1) {
    rows = [file, rows[0]];
  } else if (rows.length % 2) {
    throw "Cannot read tests from " + file;
  }

  //var succeed = 0, failed = 0, errors = 0;
  var tasks = [];
  for (var i = 0; i < rows.length; i += 2) {
    const test = rows[i];
    const css = rows[i + 1];

    tasks.push(() => runTest(suite, test, css));
  }

  console.log(suite.yellow)
  return tasks.reduce((promise, task) =>
    promise.then((result) => task().then(Array.prototype.concat.bind(result))),
  Promise.resolve([])
  ).then((results) => {
    const succeed = results.filter((x) => x).length;
    const failed = results.filter((x) => !x).length;
    console.log(
      "Succeed: " + succeed.toString().green +
      (failed ? ", Failed: " + failed.toString().red : '') +
      "\n"
    );
    return results;
  });



  // const suite = file;
}

async function runTest(suite, test, css) {
  const parts = css.split(/^\/\/\s*@Expected.*$/m);
  var expectation;
  if (parts.length > 1) {
    css = parts[0].trim();
    expectation = parts[1].trim();
  } else {
    expectation = css.trim();
  }

  try {
    const ast = parser.parse(css);
    //console.log(JSON.stringify(ast))
    const res = format(ast);
    return compareIgnoreSpace(test, expectation, res);
  } catch (e) {
    console.log(("ERROR: " + test).red)
    console.log(e)
    return false;
  }
}

function compareIgnoreSpace(test, expected, actual) {
  const a = expected
    .replace(/\s*/g, "")
    .trim();

  const b = actual
  // Drop comments
    .replace(/\s*/g, "")
    .trim();
  if (a == b) {
    console.log(("  OK: " + test).green)
    return true;
  }

  console.log(("  FAILED: " + test).red)
  var d = diff.diffWords(expected, actual);
  d.forEach(function(part) {
    // green for additions, red for deletions
    // grey for common parts
    var color = part.added ? 'green' :
      part.removed ? 'red' : 'grey';
    process.stdout.write(part.value[color]);
  });
  process.stdout.write("\n");

  return false;
}

run();
