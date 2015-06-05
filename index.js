//jscs:disable requireCapitalizedComments
/* jshint strict: false */

/**
 * @author Thales Pinheiro
 * @since 06/04/2015
 * @copyright Thales Pinheiro
 * @see https://github.com/thalesfsp/key-renamer
 * @description A JS library to deep rename object keys based on a map.
 * @requires util
 * @todo Add tests
 * @todo Test cross-OS
 * @todo Improve and refactoring the code
 * @todo Add JSPerf
 * @todo Add quality of the code
 */

var util = require('util');


/**
 * Recursively merge properties of two objects
 * @see http://goo.gl/g4wKju
 */
function mergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor == Object) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }

  return obj1;
}

/**
 * Output the keyRenamer process
 * @param {Object} originalKey the original key
 * @param {Object} newKey  the new renamed/generated key
 * @param {Boolean} value the key value
 */
var logDebug = function(originalKey, newKey, value) {
  console.log('Original key: ', originalKey);

  console.log('New key: ', util.inspect(newKey, {
    showHidden: true, depth: 3
  }));

  console.log('Key value: ', value);

  // Vertical space for a beautiful format
  console.log('');
};

/**
 * Deep rename the keys of a given object
 * @todo discover if there's a better way then use `eval`
 * @param {Object} originalObject the original object (source)
 * @param {Object} map an object containing the mapping keys
 * @param {Boolean} debug if true, will output the process
 * @returns {Object} the object with the rename keys
 */
var keyRenamer = function(originalObject, map, debug) {
  var updatedObject = {};
  var newKey;
  var value;

  if (debug) {
    console.log('Original object:', util.inspect(originalObject, {
      showHidden: true,
      depth: 10,
      colors: true
    }));

    // Vertical space for a beautiful format
    console.log('');

    console.log('Map object:', util.inspect(map, {
      showHidden: true, depth: 3
    }));

    // Vertical space for a beautiful format
    console.log('');
  }

  Object.keys(originalObject).forEach(function(key) { // jshint ignore:line
    // Buffer
    var tempKey = {};

    // Get the destination key
    newKey = map[key] || key;

    // Check if the newKey is a template
    if (newKey.indexOf(':') !== -1 && newKey.indexOf('$value') !== -1) {
      // Get the value
      value = originalObject[key];

      // Deal with type evaluation
      if (value) {
        if (value.constructor.name !== 'Number' &&
          value.constructor.name !== 'Boolean') {
          value = JSON.stringify(value);
        }
      }

      // Update the value
      newKey = newKey.replace('$value', value);

      // Danger, but here is a case to use
      // @see http://goo.gl/MQb3sf
      eval('var tempKey = ' + newKey); // jshint ignore:line

      // If this is an object, recurse
      if (value) {
        if (value.constructor.name === 'Object') {
          value = keyRenamer(value, map);
        }
      }

      if (debug) {
        logDebug(key, tempKey, value);
      }

      // Merge it
      // lodash.merge(updatedObject, tempKey);
      mergeRecursive(updatedObject, tempKey);
    } else {
      // Get the value
      value = originalObject[key];

      if (debug) {
        logDebug(key, newKey, value);
      }

      // If this is an object, recurse
      if (value) {
        if (value.constructor.name === 'Object') {
          value = keyRenamer(value, map);
        }
      }

      // Set it on the result using the destination key
      updatedObject[newKey] = value;
    }
  });

  return updatedObject;
};

// Export module
module.exports = keyRenamer;
