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
