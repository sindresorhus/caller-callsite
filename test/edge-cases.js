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
			callerCallsite(null), // Null options
			callerCallsite(undefined), // Undefined options
		];
	}

	const [normal, withNull, withUndefined] = testCaller();

	// All should work the same way - return this test function as the caller
	t.truthy(normal);
	t.truthy(withNull);
	t.truthy(withUndefined);

	// Should all return the same filename
	t.is(normal?.getFileName(), withNull?.getFileName());
	t.is(normal?.getFileName(), withUndefined?.getFileName());
});
