'use strict';
var callsites = require('callsites');

module.exports = function () {
	var c = callsites();
	var caller;

	for (var i = 0; i < c.length; i++) {
		if (c[i].receiver !== undefined) {
			caller = i;
			break;
		}
	}

	return c[caller];
};
