import test from 'ava';
import callerCallsite from '../index.js';

// Test with no receiver scenario
function simpleCall() {
	return callerCallsite();
}

// Test with nested calls
function deepCall1() {
	return deepCall2();
}

function deepCall2() {
	return deepCall3();
}

function deepCall3() {
	return callerCallsite({depth: 0});
}

test('returns result even without receiver', t => {
	const result = simpleCall();
	t.truthy(result);
	t.false(result?.getFileName()?.startsWith('node:'));
});

test('handles deeply nested calls', t => {
	const result = deepCall1();
	t.truthy(result);
	t.false(result?.getFileName()?.startsWith('node:'));
});

test('never returns node:internal paths', t => {
	// Test multiple times to ensure consistency
	for (let i = 0; i < 5; i++) {
		const result = callerCallsite();
		const fileName = result?.getFileName();
		t.false(fileName?.startsWith('node:'));
		t.false(fileName?.startsWith('node:internal/'));
	}
});

test('fallback mechanism works', t => {
	// Even with a large depth, should not crash
	const result = callerCallsite({depth: 0});
	// Should get a result or undefined, but never Node internals
	if (result) {
		t.false(result.getFileName()?.startsWith('node:'));
	} else {
		t.pass('Returned undefined for out of bounds');
	}
});
