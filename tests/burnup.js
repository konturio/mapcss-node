const chai = require('chai');
const expect = chai.expect;

const grammar = require('../mapcss');

describe("Grammar", () =>
  it("should be exported", () =>
    expect(grammar).to.exist
  )
);
