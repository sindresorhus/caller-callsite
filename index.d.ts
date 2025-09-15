import {CallSite} from 'callsites';

export interface Options {
	/**
	The callsite depth, meaning how many levels we follow back on the stack trace.

	@default 0

	@example
	```
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

	// bar.js
	import foo from './foo.js';

	export default function bar() {
		foo();
	}

	// foobar.js
	import bar from './bar.js';
	bar();
	```
	*/
	readonly depth?: number;
}

/**
Get the [callsite](https://github.com/sindresorhus/callsites#api) of the caller function.

@example
```js
// foo.js
import callerCallsite from 'caller-callsite';

export default function foo() {
	console.log(callerCallsite().getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/bar.js'
}

// bar.js
import foo from './foo.js';
foo();
```
*/
export default function callerCallsite(options?: Options): CallSite | undefined;

export {CallSite} from 'callsites';
