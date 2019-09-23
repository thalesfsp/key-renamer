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

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const keyRenamer = require('./bin/key-renamer');

// Sample (original) object
const originalObject = {
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
const sampleMap = {
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
const timer = function (name) {
  const start = new Date();

  return {
    stop: function () {
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.log(name, time, 'ms');
    }
  };
};

// Speed test (in ms)
const t = timer('Benchmark #0 (in ms)');
keyRenamer(originalObject, sampleMap, false);
t.stop();

// Speed test (in ops/sec)
// Run 5 benchmark tests
suite.add('Benchmark #1 (in ops/sec)', function () {
    keyRenamer(originalObject, sampleMap, false);
  })
  .add('Benchmark #2 (in ops/sec)', function () {
    keyRenamer(originalObject, sampleMap, false);
  })
  .add('Benchmark #3 (in ops/sec)', function () {
    keyRenamer(originalObject, sampleMap, false);
  })
  .add('Benchmark #4 (in ops/sec)', function () {
    keyRenamer(originalObject, sampleMap, false);
  })
  .add('Benchmark #5 (in ops/sec)', function () {
    keyRenamer(originalObject, sampleMap, false);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  // run async
  .run();