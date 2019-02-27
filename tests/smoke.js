const chai = require('chai');
chai.use(require('chai-string'));

const expect = chai.expect;

const pg = require('../mapcss-parser')
const f = require('../formatter')
var parser;

describe("Grammar", () => {
  before(async function() {
    parser = await pg;
  });
//   it("simple rule", () => {
//     const css = `
// way {}
//     `
//     const ast = parser(css);
//     expect(f.format(ast)).to.equalIgnoreSpaces(css);
//   });

  it("multiple rules", () => {
    const css = `
way {}
node {}
    `
    const ast = parser(css);
    console.log(css, JSON.stringify(ast, 2, 2), ast.length);
    //expect(f.format(ast)).to.equalIgnoreSpaces(css);
  });

//   it("multiple selectors", () => {
//     const css = `
// node, way, relation {}
//     `
//     const ast = parser(css);
//     expect(f.format(ast)).to.equalIgnoreSpaces(css);
//   });

//console.log(JSON.stringify(ast, 2, 2), ast.length);
//
//   it("simple zoom", () => {
//     const ast = parser(`
// way | z10 {
// }
//     `);
//     console.log(JSON.stringify(ast, 2, 2));
//   })
});
