# key-renamer

Since: 06/04/2015   
Author: Thales Pinheiro   
[![build status](http://ci.audaci.us:8072/projects/4/status.png?ref=master)](http://ci.audaci.us:8072/projects/4?ref=master)

## Abstraction

A JS library to deep rename object keys based on a map.

## Features

- Deep structure renamer
- Blazing fast (**~2ms and ~5,737 ops/sec**)!
- Low footprint (**~1KB**)

## Installation

`npm install key-renamer --save`

## Utilization


Given this sample object:

```javascript
var metadata = {
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
var map = {
  a: 'id',
  b: 'name',
  c: 'age',
  d: '{project: {value: {total: $value}}}',
  e: 'git',
  f: '{repository: {url: $value}}'
};
```

the output transformed object will be:

```javascript
var updatedObject = {
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
