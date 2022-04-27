const Titles = require('../models/titles.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Titles', () => {
  it('should throw an error if no "title" arg', () => {
    const dep = new Titles({});
    dep.validate(err => {
      expect(err.errors.title).to.exist;
    });
  });
  it('should throw an error if "title" is not a string', () => {
    const cases = [{}, []];
    for(let title of cases) {
      const dep = new Titles({ title });
      dep.validate(err => {
        expect(err.errors.title).to.exist;
      });
    }
  });
});

after(() => {
  mongoose.models = {};
});