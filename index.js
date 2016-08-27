'use strict';
var callsites = require('callsites');

module.exports = function () {
	var c = callsites();
	var caller;

	for (var i = 0; i < c.length; i++) {
		var hasReceiver;

		try {
			hasReceiver = c[i].getTypeName() !== null;
		} catch (err) {
			hasReceiver = c[i].receiver !== undefined;
		}

		if (hasReceiver) {
			caller = i;
			break;
		}
	}

	return c[caller];
};
