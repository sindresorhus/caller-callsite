import {CallSite as CallSiteInterface} from 'callsites';

declare namespace callerCallsite {
	type CallSite = CallSiteInterface;
}

/**
Get the [callsite](https://github.com/sindresorhus/callsites#api) of the caller function.

@example
```js
// foo.ts
import callerCallsite = require('caller-callsite');

export default () => {
	console.log(callerCallsite().getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/bar.ts'
}

// bar.ts
import foo from './foo';
foo();
```
*/
declare function callerCallsite(): callerCallsite.CallSite | undefined;

export = callerCallsite;
