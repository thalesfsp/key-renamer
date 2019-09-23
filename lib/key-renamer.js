//jscs:disable requireCapitalizedComments
/* jshint strict: false */

/**
 * @author Thales Pinheiro
 * @since 06/04/2015
 * @copyright Thales Pinheiro
 * @see https://github.com/thalesfsp/key-renamer
 * @description A JS library to deep rename object keys based on a map.
 * @requires util
 */

const util = require('util');

/**
 * Recursively merge properties of two objects
 * 
 * @see http://goo.gl/g4wKju
 */
const mergeRecursive = function (obj1, obj2) {
  for (let p in obj2) { // jshint ignore:line
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor === Object) {
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
};

/**
 * Output the keyRenamer process
 * 
 * @param {Object} originalKey the original key
 * @param {Object} newKey  the new renamed/generated key
 * @param {Boolean} value the key value
 */
const logDebug = function (originalKey, newKey, value) {
  console.log('Original key: ', originalKey);

  console.log('New key: ', util.inspect(newKey, {
    showHidden: true,
    depth: 3
  }));

  console.log('Key value: ', value);

  // Vertical space for a beautiful format
  console.log('');
};

/**
 * Deep rename the keys of a given object
 * 
 * TODO: discover if there's a better way then use `eval`
 * @param {Object} originalObject the original object (source)
 * @param {Object} map an object containing the mapping keys
 * @param {Boolean} debug if true, will output the process
 * @returns {Object} the object with the rename keys
 */
const keyRenamer = function (originalObject, map, debug) {
  let updatedObject = {};
  let newKey;
  let value;

  if (debug) {
    console.log('Original object:', util.inspect(originalObject, {
      showHidden: true,
      depth: 10,
      colors: true
    }));

    // Vertical space for a beautiful format
    console.log('');

    console.log('Map object:', util.inspect(map, {
      showHidden: true,
      depth: 3
    }));

    // Vertical space for a beautiful format
    console.log('');
  }

  try {
    Object.keys(originalObject).forEach(function (key) { // jshint ignore:line
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
  } catch (error) {
    throw new Error(`Failed to conform data:
Data: ${JSON.stringify(originalObject)}
Map: ${JSON.stringify(map)}`);

  }

  return updatedObject;
};

// Export module
module.exports = keyRenamer;