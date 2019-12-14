import {CompareNumericStrings} from '../src/util/string_utils';
import {log} from '../src/logging';

export {};

var assert = require('assert'),
    log4js = require('log4js'),
    mocha = require('mocha'),
    sinon = require('sinon');

describe('Numeric string compare', function() {
  describe('Test strings with a < b', function() {
    it('return < 0', () => {
      assert(CompareNumericStrings('1196720038423617536', '1196727525382049792') < 0);
    });
  });
  
  describe('Test strings with a < b, a shorter', function() {
    it('return < 0', () => {
      assert(CompareNumericStrings('99', '1196727525382049792') < 0);
    });
  });
  
  describe('Test strings with a > b, a shorter', function() {
    it('return > 0', () => {
      assert(CompareNumericStrings('1196727525382049792', '99') > 0);
    });
  });
  
  describe('Test strings with a > b, a shorter', function() {
    it('return > 0', () => {
      assert(CompareNumericStrings('1196727525382049792', '1196720038423617536') > 0);
    });
  });
  
  describe('Test strings with a == b', function() {
    it('return == 0', () => {
      assert(CompareNumericStrings('1196727525382049792', '1196727525382049792') == 0);
    });
  });
  
  describe('Test two empty strings', function() {
    it('return == 0', () => {
      assert(CompareNumericStrings('', '') == 0);
    });
  });
  
  describe('Test empty string < number', function() {
    it('return < 0', () => {
      assert(CompareNumericStrings('', '1') < 0);
    });
  });
  
  describe('Test number > empty string', function() {
    it('return > 0', () => {
      assert(CompareNumericStrings('1', '') > 0);
    });
  });
});

