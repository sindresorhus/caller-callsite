# caller-callsite [![Build Status](https://travis-ci.org/sindresorhus/caller-callsite.svg?branch=master)](https://travis-ci.org/sindresorhus/caller-callsite)

> Get the [callsite](https://github.com/sindresorhus/callsites#api) of the caller function


## Install

```
$ npm install caller-callsite
```


## Usage

```js
// foo.js
const callerCallsite = require('caller-callsite');

module.exports = () => {
	console.log(callerCallsite().getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/bar.js'
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

The depth of callsite.

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
