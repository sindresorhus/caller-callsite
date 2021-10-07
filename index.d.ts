import {CallSite} from 'callsites';

export interface Options {
	/**
	The callsite depth, meaning how many levels we follow back on the stack trace.

	@default 0

	@example
	```
	// foo.ts
	import callerCallsite from 'caller-callsite';

	export default function foo() {
		console.log(callerCallsite().getFileName());
		//=> '/Users/sindresorhus/dev/unicorn/foobar.ts'
		console.log(callerCallsite({depth: 1}).getFileName());
		//=> '/Users/sindresorhus/dev/unicorn/bar.ts'
		console.log(callerCallsite({depth: 2}).getFileName());
		//=> '/Users/sindresorhus/dev/unicorn/foo.ts'
	}

	// bar.ts
	import foo from './foo.js';

	export default function bar() {
		foo();
	}

	// foobar.ts
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
// foo.ts
import callerCallsite from 'caller-callsite';

export default function foo() {
	console.log(callerCallsite().getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/bar.ts'
}

// bar.ts
import foo from './foo.js';
foo();
```
*/
export default function callerCallsite(options?: Options): CallSite | undefined;

export {CallSite} from 'callsites';
