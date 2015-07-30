'use strict';

/**
 * @author Thales Pinheiro
 * @since 10/07/2011
 * @copyright Thales Pinheiro
 * @requires assert
 * @requires lodash
 * @requires key-renamer
 * Key-renamer benchmark
 */

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var keyRenamer = require('./lib/key-renamer');

// Sample (original) object
var originalObject = {
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

// Sample map
var sampleMap = {
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

// Basic crono
var timer = function(name) {
  var start = new Date();

  return {
    stop: function() {
      var end  = new Date();
      var time = end.getTime() - start.getTime();
      console.log(name, time, 'ms');
    }
  };
};

// Speed test (in ms)
var t = timer('Benchmark #0 (in ms)');
keyRenamer(originalObject, sampleMap, false);
t.stop();

// Speed test (in ops/sec)
var suite = new Benchmark.Suite;

// Run 5 benchmark tests
suite.add('Benchmark #1 (in ops/sec)', function() {
  keyRenamer(originalObject, sampleMap, false);
})
.add('Benchmark #2 (in ops/sec)', function() {
  keyRenamer(originalObject, sampleMap, false);
})
.add('Benchmark #3 (in ops/sec)', function() {
  keyRenamer(originalObject, sampleMap, false);
})
.add('Benchmark #4 (in ops/sec)', function() {
  keyRenamer(originalObject, sampleMap, false);
})
.add('Benchmark #5 (in ops/sec)', function() {
  keyRenamer(originalObject, sampleMap, false);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
// run async
.run();
