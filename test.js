'use strict';
var path = require('path');
var test = require('ava');
var fixture = require('./fixture');
var fixture2 = require('./fixture2');
var fixture3 = require('./fixture3');

test(function (t) {
	t.assert(path.basename(fixture().getFileName()) === 'test.js');
	t.assert(path.basename(fixture2().getFileName()) === 'test.js');
	t.assert(path.basename(fixture3().getFileName()) === 'test.js');
	t.end();
});
