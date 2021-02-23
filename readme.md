# @piranna/caller-callsite

[![Build Status](https://travis-ci.org/piranna/caller-callsite.svg?branch=master)](https://travis-ci.org/piranna/caller-callsite)

Get the [callsite](https://github.com/sindresorhus/callsites#api) of the caller
function

This project is a fork of
[sindresorhus/caller-callsite](https://github.com/sindresorhus/caller-callsite)
with a different, more intuitive algorythm and returned data structure.

## Install

```sh
npm install caller-callsite
```


## Usage

```js
// foo.js
const callerCallsite = require('caller-callsite');

module.exports = () => {
  console.log(callerCallsite().getFileName());
  //=> '/Users/piranna/dev/unicorn/bar.js'
}
```

```js
// bar.js
const foo = require('./foo');
foo();
```


## API

### callerCallsite(options?)

Returns a [`callsite`](https://github.com/sindresorhus/callsites#api) object.

#### options

Type: `object`

##### depth

Type: `number`<br>
Default: `0`

The callsite depth, meaning how many levels we follow back on the stack trace.

For example:

```js
// foo.js
const callerCallsite = require('caller-callsite');

module.exports = () => {
  console.log(callerCallsite().getFileName());
  //=> '/Users/piranna/dev/unicorn/foobar.js'
  console.log(callerCallsite({depth: 1}).getFileName());
  //=> '/Users/piranna/dev/unicorn/bar.js'
  console.log(callerCallsite({depth: 2}).getFileName());
  //=> '/Users/piranna/dev/unicorn/foo.js'
}
```

```js
// bar.js
const foo = require('./foo');

module.exports = () => {
  foo();
}
```

```js
// foobar.js
const bar = require('./bar');
bar();
```
