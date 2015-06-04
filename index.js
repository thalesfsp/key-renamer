//jscs:disable requireCapitalizedComments
/* jshint strict: false */

/**
 * @author Thales Pinheiro
 * @since 06/04/2015
 * @copyright Thales Pinheiro
 * @see https://github.com/thalesfsp/key-renamer
 * @description A JS library to deep rename object keys based on a map.
 * @requires util
 * @requires lodash
 * @todo Add tests
 * @todo Test cross-OS
 * @todo Improve and refactoring the code
 * @todo Add JSPerf
 * @todo Add quality of the code
 */

var util = require('util');
var lodash = require('lodash');

/**
 * Output the renameKeys process
 * @param {String} originalKey the original key
 * @param {String|Object} newKey the new renamed/generated key
 * @param {Boolean} value the key value
 */
var logDebug = function(originalKey, newKey, value) {
  console.log('Original key: ', originalKey);

  console.log('New key: ', util.inspect(newKey, {
    showHidden: true, depth: 3
  }));

  console.log('Key value: ', value);

  // Add vertical space for a beautiful format
  console.log('');
};

/**
 * A JS library to deep rename object keys based on a map.
 * @param {Object} originalObject the original object (source)
 * @param {Object} map an object containing the mapping keys
 * @param {Boolean} debug if true, will output the process
 * @returns {Object} the updated object with the renamed keys
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

    // Add vertical space for a beautiful format
    console.log('');

    console.log('Map object:', util.inspect(map, {
      showHidden: true, depth: 3
    }));

    // Vertical space for a beautiful format
    console.log('');
  }

  Object.keys(originalObject).forEach(function(key) { // jshint ignore:line
    // Temporary variable
    var tempKey = {};

    // Get the destination key
    newKey = map[key] || key;

    // Check if the value should be an object
    if (newKey.indexOf(':') !== -1) {
      // Store the value
      value = originalObject[key];

      // Apply the value to the new key
      newKey = newKey.replace('$value', value);

      // Danger, but here is a case to use
      // @see http://goo.gl/MQb3sf
      eval('var tempKey = ' + newKey); // jshint ignore:line

      // If this is an object, recurse
      if (typeof value === 'object') {
        value = keyRenamer(value, map);
      }

      if (debug) {
        logDebug(key, tempKey, value);
      }

      // Merge it
      lodash.merge(updatedObject, tempKey);
    } else {
      // Store the value
      value = originalObject[key];

      if (debug) {
        logDebug(key, newKey, value);
      }

      // If this is an object, recurse
      if (typeof value === 'object') {
        value = keyRenamer(value, map);
      }

      // Update the key name
      updatedObject[newKey] = value;
    }
  });

  return updatedObject;
};

// Export module
module.exports = keyRenamer;
