import path from 'path';
import test from 'ava';
import fixture from './fixture';
import fixture2 from './fixture2';
import fixture3 from './fixture3';

test('main', t => {
	t.is(path.basename(fixture().getFileName()), 'test.js');
	t.is(path.basename(fixture2().getFileName()), 'test.js');
	t.is(path.basename(fixture3().getFileName()), 'test.js');
});
