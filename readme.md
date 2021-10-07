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

export default function foo() {
	foo();
}
```

```js
// foobar.js
import bar from './bar.js';
bar();
```

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-caller-callsite?utm_source=npm-caller-callsite&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
