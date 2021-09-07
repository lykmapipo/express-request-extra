# express-request-extra

[![Build Status](https://app.travis-ci.com/lykmapipo/express-request-extra.svg?branch=master)](https://app.travis-ci.com/lykmapipo/express-request-extra)
[![Dependencies Status](https://david-dm.org/lykmapipo/express-request-extra.svg)](https://david-dm.org/lykmapipo/express-request-extra)
[![Coverage Status](https://coveralls.io/repos/github/lykmapipo/express-request-extra/badge.svg?branch=master)](https://coveralls.io/github/lykmapipo/express-request-extra?branch=master)
[![GitHub License](https://img.shields.io/github/license/lykmapipo/express-request-extra)](https://github.com/lykmapipo/express-request-extra/blob/master/LICENSE)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/@lykmapipo/express-request-extra)](https://www.npmjs.com/package/@lykmapipo/express-request-extra)

Handy helpers for express request.

*Note: Make sure you use body-parser for desired behaviour*


## Requirements

- NodeJS v9.3.0+
- body-parser

## Install
```sh
$ npm install --save @lykmapipo/express-request-extra
```

## Usage

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import '@lykmapipo/express-request-extra';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('/:id?', (request, response) => {
  const all = request.all(); // get all inputs
  const inputs = request.input(); // get all inputs if key not specified
  const name = request.input('name', 'John Doe'); // get name or default
  const only = request.only('name', 'level'); // get only specified inputs
  const except = request.except('age', 'point'); // get all except specified input
  const exists = request.exists('name'); // check name for existence
  const has = request.has('name'); // check name for existence
  const merged = request.merge({level: 14}); // merge to input
});
```

## API

### `request.all():Object`
Retrieve all request input  data

Example
```js

const all = request.all();

```

### `request.input([key], [default]):Object`
Retrieve an input item from the request input data

Example
```js

const name = request.input('name', 'John Doe');

const all = request.input();

```

### `request.only(...keys):Object`
Retrieve a subset of items of specified keys from request input data

Example
```js

const point = request.only('longitute', 'latitude');

const point = request.only(['longitute', 'latitude']);

```

### `request.except(...keys):Object`
Retrieve request input data except of specified keys

Example
```js

const product = request.except('price', 'owner');

const product = request.except(['price', 'owner']);

```

### `request.merge(Object):Object`
Retrieve request input damerge new input into the current request's input data

Example
```js

const user = request.merge({level: 1});

```

### `request.defaults(Object):Object`
merge new input into the current request's input data without overriding existing

Example: use password quest if request has no password input
```js

const user = request.defaults({password: 'guest'});

```

### `request.exists(key):Boolean`
Determine if the request contains a given input item key

Example
```js

const hasName = request.exists('name');

```

### `request.has(key):Boolean`
Determine if the request contains a given input item key

Example
```js

const hasName = request.has('name');

```




## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```
* Then run test
```sh
$ npm test
```

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence
The MIT License (MIT)

Copyright (c) lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
