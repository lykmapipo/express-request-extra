'use strict';

const lodash = require('lodash');
const autoParse = require('auto-parse');
const express = require('express');

const { request } = express;

/**
 * @name all
 * @type {Function}
 * @description retrieve all request input data
 * @returns {object} merged request params, body and query
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.all = function all() {
  let data = lodash.merge({}, this.params, this.query, this.body);
  data = autoParse(data);
  return data;
};

/**
 * @name input
 * @type {Function}
 * @description retrieve an input item from the request input data
 * @returns {*} found input item or default value. default to null
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.input = function input(key, defaultValue) {
  const data = lodash.merge({}, this.all());
  const value = key ? lodash.get(data, key, defaultValue) : data;
  return value;
};

/**
 * @name only
 * @type {Function}
 * @description retrieve a subset of items of specified keys from request input data
 * @returns {*} found subset items.
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.only = function only(...keys) {
  const itemKeys = [].concat(...keys);
  const data = lodash.merge({}, this.all());
  const items = lodash.merge({}, lodash.pick(data, itemKeys));
  return items;
};

/**
 * @name except
 * @type {Function}
 * @description retrieve request input data except of specified keys
 * @returns {*} request input items.
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.except = function except(...keys) {
  const itemKeys = [].concat(...keys);
  const data = lodash.merge({}, this.all());
  const items = lodash.merge({}, lodash.omit(data, itemKeys));
  return items;
};

/**
 * @name merge
 * @type {Function}
 * @description merge new input into the current request's input data.
 * @returns {*} merged request input data.
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.merge = function merge(items = {}) {
  const data = lodash.merge({}, this.all());
  const merged = lodash.merge({}, data, items);
  return merged;
};

/**
 * @name defaults
 * @type {Function}
 * @description merge new input into the current request's input data without
 *              overriding existing
 * @returns {*} merged request input data.
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.defaults = function defaults(items = {}) {
  const data = lodash.merge({}, this.all());
  const merged = lodash.defaults({}, data, items);
  return merged;
};

/**
 * @name exists
 * @type {Function}
 * @description determine if the request contains a given input item key.
 * @returns {boolean} whether request input data contain item or not
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.has = function exists(key) {
  const data = lodash.merge({}, this.all());
  const exist = key ? lodash.has(data, key) : false;
  return exist;
};
request.exists = request.has;

module.exports = express;
