const chai = require('chai');
const expect = chai.expect;

const pg = require('../mapcss-parser')
var parser;

describe("Grammar", () => {
  before(async function() {
    parser = await pg;
  });
//   it("simple selector", () => {
//     const ast = parser(`
// way {
//   color: red;
// }
//     `);
//     console.log(JSON.stringify(ast, 2, 2));
//   })
//
  it("simple zoom", () => {
    const ast = parser(`
way | z10 {
}
    `);
    console.log(JSON.stringify(ast, 2, 2));
  })
});
