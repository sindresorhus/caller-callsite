# caller-callsite

> Get the [callsite](https://github.com/sindresorhus/callsites#api) of the caller function

## Install

```sh
npm install caller-callsite
```

## Usage

```js
// foo.js
import callerCallsite from 'caller-callsite';

export default function foo() {
	console.log(callerCallsite().getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/bar.js'
}
```

```js
// bar.js
import foo from './foo.js';
foo();
```

## API

### callerCallsite(options?)

Returns a [`callsite`](https://github.com/sindresorhus/callsites#api) object.

#### options

Type: `object`

##### depth

Type: `number`\
Default: `0`

The callsite depth, meaning how many levels we follow back on the stack trace.

For example:

```js
// foo.js
import callerCallsite from 'caller-callsite';

export default function foo() {
	console.log(callerCallsite().getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/foobar.js'
	console.log(callerCallsite({depth: 1}).getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/bar.js'
	console.log(callerCallsite({depth: 2}).getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/foo.js'
}
```

```js
// bar.js
import foo from './foo.js';

export default function bar() {
	foo();
}
```

```js
// foobar.js
import bar from './bar.js';
bar();
```
