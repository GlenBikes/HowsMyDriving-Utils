import { DateDiffStr } from '../src/util/datehelper';
import { log } from '../src/logging';

var assert = require('assert');
const time_delta = require('../lib/time-delta');

const td = time_delta.create();

export {};

describe('Date diffs', function() {
  describe('Diff equal dates', function() {
    it('should return 1 second', function() {
      let d1 = new Date();
      let d2 = new Date(d1);
      var result = DateDiffStr(d1, d2);

      assert.equal(result, '1 second');
    });
  });

  describe('Diff dates 1 day apart', function() {
    it('should return 1 day', function() {
      let d1 = new Date();
      let d2 = new Date(d1);
      d2.setDate(d2.getDate() + 1);
      var result = DateDiffStr(d1, d2);

      assert.equal(result, '1 day');
    });
  });

  describe('Diff dates crossing a month boundary', function() {
    it('should return 3 days', function() {
      let d1 = new Date('2020-01-30T06:00:00');
      let d2 = new Date(d1);
      d2.setDate(d2.getDate() + 3);
      var result = DateDiffStr(d1, d2);

      assert.equal(result, '3 days');
    });
  });

  describe('Diff dates crossing a year boundary', function() {
    it('should return 1 month', function() {
      let d1 = new Date('2020-12-15T12:00:00');
      let d2 = new Date(d1);
      d2.setDate(d2.getDate() + 30);
      var result = DateDiffStr(d1, d2);

      assert.equal(result, '1 month');
    });
  });

  describe('Diff dates a week apart', function() {
    it('should return 1 week', function() {
      let d1 = new Date('2020-01-15T12:00:00');
      let d2 = new Date(d1);
      d2.setDate(d2.getDate() + 7);
      var result = DateDiffStr(d1, d2);

      assert.equal(result, '1 week');
    });
  });

  describe('Diff dates 8 days apart', function() {
    it('should return 1 week, 1 day', function() {
      let d1 = new Date('2020-01-15T12:00:00');
      let d2 = new Date(d1);
      d2.setDate(d2.getDate() + 8);
      var result = DateDiffStr(d1, d2);

      assert.equal(result, '1 week, 1 day');
    });
  });

  describe('Diff dates across February boundary', function() {
    it('should return 1 month', function() {
      let d1 = new Date('2020-02-27T12:00:00');
      let d2 = new Date(d1);
      d2.setDate(d2.getDate() + 30);
      var result = DateDiffStr(d1, d2);

      assert.equal(result, '1 month');
    });
  });

  describe('Diff dates a year apart', function() {
    it('should return 1 year', function() {
      let d1 = new Date('2019-01-12T12:00:00');
      let d2 = new Date(d1);
      d2.setDate(d2.getDate() + 365);
      var result = DateDiffStr(d1, d2);

      assert.equal(result, '1 year');
    });
  });
});
