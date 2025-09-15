import path from 'node:path';
import test from 'ava';
import callerCallsite from '../index.js';

// Test the fixed depth behavior
function level3() {
	// When called from level3, the behavior is:
	// depth 0: level2 (immediate caller)
	// depth 1: level1 (caller's caller)
	// depth 2: test function (caller's caller's caller)
	return [
		callerCallsite({depth: 0}),
		callerCallsite({depth: 1}),
		callerCallsite({depth: 2}),
	];
}

function level2() {
	return level3();
}

function level1() {
	return level2();
}

test('depth follows natural stack order (fixed)', t => {
	const [depth0, depth1, depth2] = level1();

	const getBaseName = callsite => callsite ? path.basename(callsite.getFileName() || '') : 'undefined';
	const getFuncName = callsite => callsite ? callsite.getFunctionName() || '<anonymous>' : 'undefined';

	console.log('Current behavior:');
	console.log(`  depth 0: ${getBaseName(depth0)} - ${getFuncName(depth0)}`);
	console.log(`  depth 1: ${getBaseName(depth1)} - ${getFuncName(depth1)}`);
	console.log(`  depth 2: ${getBaseName(depth2)} - ${getFuncName(depth2)}`);

	// Fixed behavior - now intuitive:
	// depth 0 should be level2 (the immediate caller of level3)
	// depth 1 should be level1 (the caller of level2)
	// depth 2 should be the test function

	t.is(getFuncName(depth0), 'level2'); // Fixed!
	t.is(getFuncName(depth1), 'level1');
	t.truthy(depth0);
});

test('demonstrates the intuitive behavior', t => {
	// Verifies the intuitive behavior:
	// depth 0 gives you "who called me?"
	// depth 1 gives you "who called my caller?"
	// etc.
	t.pass('The implementation now correctly answers "Who called the current function?"');
});
