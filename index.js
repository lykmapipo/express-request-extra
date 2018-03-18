'use strict';


/**
 * @name extra
 * @description handy helpers for express request
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


//dependencies
const _ = require('lodash');
const autoParse = require('auto-parse');
const express = require('express');
const request = express.request;


/**
 * @name all
 * @type {Function}
 * @description retrieve all request input data
 * @return {Object} merged request params, body and query
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.all = function all() {
  let all = _.merge({}, this.params, this.query, this.body);
  all = autoParse(all);
  return all;
};


/**
 * @name input
 * @type {Function}
 * @description retrieve an input item from the request input data
 * @return {Mixed} found input item or default value. default to null
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.input = function input(key, defaultValue) {
  const all = _.merge({}, this.all());
  const input = key ? _.get(all, key, defaultValue) : all;
  return input;
};


/**
 * @name only
 * @type {Function}
 * @description retrieve a subset of items of specified keys from request input data
 * @return {Mixed} found subset items.
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.only = function only(...keys) {
  const itemKeys = [].concat(...keys);
  const all = _.merge({}, this.all());
  const items = _.merge({}, _.pick(all, itemKeys));
  return items;
};


/**
 * @name except
 * @type {Function}
 * @description retrieve request input data except of specified keys
 * @return {Mixed} request input items.
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.except = function except(...keys) {
  const itemKeys = [].concat(...keys);
  const all = _.merge({}, this.all());
  const items = _.merge({}, _.omit(all, itemKeys));
  return items;
};


/**
 * @name merge
 * @type {Function}
 * @description merge new input into the current request's input data.
 * @return {Mixed} merged request input data.
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.merge = function merge(items = {}) {
  const all = _.merge({}, this.all());
  const merged = _.merge({}, all, items);
  return merged;
};


/**
 * @name defaults
 * @type {Function}
 * @description merge new input into the current request's input data without
 *              overriding existing
 * @return {Mixed} merged request input data.
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.defaults = function merge(items = {}) {
  const all = _.merge({}, this.all());
  const merged = _.defaults({}, all, items);
  return merged;
};


/**
 * @name exists
 * @type {Function}
 * @description determine if the request contains a given input item key.
 * @return {Boolean} whether request input data contain item or not
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
request.exists = request.has = function exists(key) {
  const all = _.merge({}, this.all());
  const exist = key ? _.has(all, key) : false;
  return exist;
};


module.exports = exports = express;