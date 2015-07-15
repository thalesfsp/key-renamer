# key-renamer
A JS library to deep rename object keys based on a map.

Given this object:

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

and this map object:

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

the output object will be:

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

Installation:

`npm install key-renamer`

More to come, PR are welcome!
