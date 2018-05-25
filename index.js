'use strict';
const callsites = require('callsites');

module.exports = () => {
	const c = callsites();
	let caller;

	for (let i = 0; i < c.length; i++) {
		const hasReceiver = c[i].getTypeName() !== null && c[i].getFileName() !== null;

		if (hasReceiver) {
			caller = i;
			break;
		}
	}

	return c[caller];
};
