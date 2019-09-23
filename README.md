![](https://github.com/thalesfsp/key-renamer/workflows/Node%20CI/badge.svg) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# key-renamer

Since: 06/04/2015
Author: Thales Pinheiro

## Overview

A JS library to deep rename object keys based on a map.

## Features

- Deep structure renamer
- Blazing fast (**~2ms and ~5,737 ops/sec**)!
- Low footprint (**~1KB**)

## Installation

`npm install key-renamer --save`

## Usage

Given this sample object:

```javascript
const data = {
  a: 1,
  b: 'John',
  c: 34,
  d: 500000,
  e: {
    f: 10
  },
  active: true
};
```

and this sample map object:

```javascript
const map = {
  a: 'id',
  b: 'name',
  c: 'age',
  d: '{project: {value: {total: $value}}}',
  e: 'git',
  f: '{repository: {url: $value}}'
};
```

running:

```javascript
const keyRenamer = require("key-renamer");
console.log(keyRenamer(data, map));
```

the output transformed object should be:

```javascript
const updatedObject = {
  id: 1,
  name: 'John',
  age: 34,
  project: {
    value: {
      total: 500000
    }
  },
  git: {
    repository: {
      url: 10
    }
  },
  active: true
};
```

## Benchmark and Tests

1. Clone this repository
2. `npm install`
3. To test `npm run test`
4. To benchmark `npm run benchmark`
