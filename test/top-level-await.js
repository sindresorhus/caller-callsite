import test from 'ava';
import callerCallsite from '../index.js';

// These tests verify that callerCallsite works correctly in scenarios
// that might be affected by top-level await (issue #12)

test('basic depth handling', t => {
	function caller() {
		return callerCallsite();
	}

	const result = caller();

	// Should return this test function as the caller
	t.truthy(result);
	t.false(result?.getFileName()?.startsWith('node:'));
});

test('handles various depths correctly', t => {
	function testDepths() {
		return {
			depth0: callerCallsite({depth: 0}),
			depth1: callerCallsite({depth: 1}),
			depth100: callerCallsite({depth: 100}),
		};
	}

	const {depth0, depth1, depth100} = testDepths();

	// Depth 0 should be this test function
	t.truthy(depth0);
	t.false(depth0?.getFileName()?.startsWith('node:'));

	// Depth 1 should be something from test runner
	t.truthy(depth1);
	t.false(depth1?.getFileName()?.startsWith('node:'));

	// Depth 100 should be undefined (out of bounds)
	t.is(depth100, undefined);
});

test('nested function calls work correctly', t => {
	function level3() {
		return callerCallsite({depth: 0});
	}

	function level2() {
		return level3();
	}

	function level1() {
		return level2();
	}

	const result = level1();

	// Should return level2 as the immediate caller of level3
	t.is(result?.getFunctionName(), 'level2');
});
