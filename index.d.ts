import {CallSite} from 'callsites';

export interface Options {
	/**
	The callsite depth, meaning how many levels we follow back on the stack trace from the caller.

	@default 0

	@example
	```
	// foo.js
	import callerCallsite from 'caller-callsite';

	export default function foo() {
		console.log(callerCallsite().getFileName());
		//=> '/Users/sindresorhus/dev/unicorn/bar.js'
		console.log(callerCallsite({depth: 1}).getFileName());
		//=> '/Users/sindresorhus/dev/unicorn/foobar.js'
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
```
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
