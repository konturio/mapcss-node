const chai = require('chai');
const expect = chai.expect;

const pg = require('../mapcss-parser')

var parser;
describe("Grammar", () => {
  before(async function() {
    parser = await pg;
  });

  it("should be exported", () =>
    expect(parser).to.exist
  )
});
