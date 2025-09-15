import path from 'node:path';
import test from 'ava';
import callerCallsite from '../index.js';

// Simple test across different functions in the same file
function level4() {
	return callerCallsite({depth: 0});
}

function level3() {
	return level4();
}

function level2() {
	return level3();
}

function level1() {
	return level2();
}

test('returns immediate caller', t => {
	// When level4 calls callerCallsite(), it should return level3
	const result = level1();
	t.is(result?.getFunctionName(), 'level3');
});

test('returns caller at specified depth', t => {
	function testDepth() {
		return [
			callerCallsite({depth: 0}), // Should be this test function
			callerCallsite({depth: 1}), // Should be AVA's callFn or similar
		];
	}

	const [depth0, depth1] = testDepth();

	// Depth 0 should be the test function that called testDepth
	t.truthy(depth0);
	t.false(depth0?.getFileName()?.startsWith('node:'));

	// Depth 1 should be something from the test runner
	t.truthy(depth1);
	t.false(depth1?.getFileName()?.startsWith('node:'));
});

test('handles out of bounds depth gracefully', t => {
	function simple() {
		return callerCallsite({depth: 100});
	}

	const result = simple();
	t.is(result, undefined);
});

test('basic functionality', t => {
	function caller() {
		return callerCallsite();
	}

	const result = caller();
	// Should return this test function as the caller
	t.truthy(result);
	t.is(path.basename(result.getFileName()), 'main.js');
});
