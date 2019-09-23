'use strict';

/**
 * @author Thales Pinheiro
 * @since 10/07/2011
 * @copyright Thales Pinheiro
 * @requires assert
 * @requires lodash
 * @requires key-renamer
 * 
 * Key-renamer basic unit test
 */

const assert = require('assert');
const lodash = require('lodash');
const keyRenamer = require('./bin/key-renamer');
let expectedObject, originalObject, sampleMap;

describe('Key-renamer test', function () {
  before(function () {
    // Expected result
    expectedObject = {
      boolean: true,
      string: 'John',
      float: 10.123,
      number: 10123,
      undefined: undefined,
      null: null,
      array: [],
      object: {},
      project: {
        value: {
          total: 'composite object'
        }
      },
      compositeObjectWithUndefinedValue: {
        repository: {
          url: undefined
        }
      },
      nestedObject: {
        boolean: true,
        string: 'John',
        float: 10.123,
        number: 10123,
        undefined: undefined,
        null: null,
        array: [],
        object: {},
        project: {
          value: {
            total: 'composite object'
          }
        },
        compositeObjectWithUndefinedValue: {
          repository: {
            url: undefined
          }
        }
      }
    };
  });

  beforeEach(function () {
    // Sample (original) object
    originalObject = {
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
    sampleMap = {
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
  });

  it('Should transform originalObject into expectedObject using the sampleMap', function () {
    assert.equal(lodash.isEqual(keyRenamer(originalObject, sampleMap, false), expectedObject), true);
  });
});