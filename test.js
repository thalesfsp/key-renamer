'use strict';

/**
 * @author Thales Pinheiro
 * @since 06/04/2015
 * @copyright Thales Pinheiro
 * @see https://github.com/thalesfsp/key-renamer
 * @description A very simple and basic way to test
 * @requires key-renamer
 * @requires util
 */

var keyRenamer = require('./index');
var util = require('util');

var metadata = {
  a: true,
  b: 'John',
  c: 10.123,
  d: 10123,
  e: undefined,
  f: null,
  g: [],
  h: {},
  i: 'composite object',
  j: {
    l: undefined
  },
  m: {
    a: true,
    b: 'John',
    c: 10.123,
    d: 10123,
    e: undefined,
    f: null,
    g: [],
    h: {},
    i: 'composite object',
    j: {
      l: undefined
    }
  }
};

var map = {
  a: 'boolean',
  b: 'string',
  c: 'float',
  d: 'number',
  e: 'undefined',
  f: 'null',
  g: 'array',
  h: 'object',
  i: '{project: {value: {total: $value}}}',
  j: 'compositeObjectWithUndefinedValue',
  l: '{repository: {url: $value}}',
  m: 'nestedObject'
};

// @debug
console.log(util.inspect(keyRenamer(metadata, map, false), {
  showHidden: true,
  depth: 3,
  colors: true
}));
