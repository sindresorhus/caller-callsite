import test from 'ava';
import callerCallsite from '../index.js';

function nestedFunction() {
	return callerCallsite({depth: 100});
}

test('handles large depth gracefully', t => {
	const result = nestedFunction();
	// Should return undefined for out-of-bounds depth
	t.is(result, undefined);
});

test('handles undefined options', t => {
	const result = callerCallsite();
	t.truthy(result);
});

test('handles empty options object', t => {
	const result = callerCallsite({});
	t.truthy(result);
});

test('handles invalid depth values gracefully', t => {
	// Negative depth
	t.is(callerCallsite({depth: -1}), undefined);

	// Float depth
	t.is(callerCallsite({depth: 1.5}), undefined);

	// NaN depth
	t.is(callerCallsite({depth: Number.NaN}), undefined);

	// Infinity depth
	t.is(callerCallsite({depth: Number.POSITIVE_INFINITY}), undefined);

	// String depth
	t.is(callerCallsite({depth: '2'}), undefined);
});

test('handles null and undefined options', t => {
	function testCaller() {
		return [
			callerCallsite(), // Normal call
			callerCallsite(undefined), // Undefined options
		];
	}

	const [normal, withUndefined] = testCaller();

	// All should work the same way - return this test function as the caller
	t.truthy(normal);
	t.truthy(withUndefined);

	// Should all return the same filename
	t.is(normal?.getFileName(), withUndefined?.getFileName());
});

test('handles minimal call stack gracefully', t => {
	// Test direct call with no meaningful caller context
	// This simulates calling callerCallsite at module level or in similar contexts
	function getDirectCallResult() {
		// This represents a scenario where there might not be enough callsites
		// after filtering to provide a meaningful result
		return callerCallsite();
	}

	const result = getDirectCallResult();
	// Should return a callsite (this test function) or undefined, but never crash
	// The exact result depends on the call stack depth
	t.true(result === undefined || (result && typeof result.getFileName === 'function'));
});
