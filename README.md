# express-request-extra

[![Build Status](https://travis-ci.org/lykmapipo/express-request-extra.svg?branch=master)](https://travis-ci.org/lykmapipo/express-request-extra)
[![Dependency Status](https://img.shields.io/david/lykmapipo/express-request-extra.svg?style=flat)](https://david-dm.org/lykmapipo/express-request-extra)
[![npm version](https://badge.fury.io/js/%40lykmapipo%2Fexpress-request-extra.svg)](https://badge.fury.io/js/@lykmapipo/express-request-extra)


handy helpers for express request.

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
const express = require('@lykmapipo/express-request-extra');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/:id?', function(request, response){
	const all = request.all(); // get all inputs
	const inputs = request.input(); // get all inputs if key not specified
	const only = request.only('name', 'level'); // get only specified inputs
	const except = request.except('age', 'point'); // get all except specified input
	const exist = request.exist('name'); //check name for existance
	const name = request.input('name', 'John Doe'); //get name or default
	const merged = request.merge({level: 14}); //merge to input
});
```

## API

- `request.all():Object` - Retrieve all request input  data

Example
```js

const all = request.all();

```

- `request.input([key], [default]):Object` - Retrieve an input item from the request input data

Example
```js

const name = request.input('name', 'John Doe');

const all = request.input();

```

- `request.only():Object` - Retrieve a subset of items of specified keys from request input data

Example
```js

const point = request.only('longitute', 'latitude');

const point = request.only(['longitute', 'latitude']);

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

Copyright (c) 2018 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 