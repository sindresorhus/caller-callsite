import path from 'path';
import test from 'ava';
import fixture from './fixture';
import fixture2 from './fixture2';
import fixture3 from './fixture3';

test('main', t => {
	t.is(path.basename(fixture().getFileName()), 'fixture.js');
	t.is(path.basename(fixture2().getFileName()), 'fixture.js');
	t.is(path.basename(fixture3().getFileName()), 'fixture.js');
	t.is(path.basename(fixture3({depth: 1}).getFileName()), 'fixture2.js');
	t.is(path.basename(fixture3({depth: 2}).getFileName()), 'fixture3.js');
	t.is(path.basename(fixture3({depth: 3}).getFileName()), 'test.js');
	t.is(path.basename(fixture3({depth: 4}).getFileName()), 'test.js'); // Ava
	t.is(fixture3({depth: 5}), undefined);
});
