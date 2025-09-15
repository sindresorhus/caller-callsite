import test from 'ava';
import callerCallsite from '../index.js';

function moduleFunction() {
	return callerCallsite();
}

test('does not return Node.js internals', t => {
	const result = moduleFunction();
	const fileName = result?.getFileName();

	// Should not be a Node.js internal module
	t.false(fileName?.startsWith('node:'));

	// Should not be null/undefined
	t.truthy(fileName);

	// Should be a valid file path
	t.true(fileName?.includes('.js'));
});
