'use strict';
const callsites = require('callsites');

module.exports = () => {
	const c = callsites();
	let caller;

	for (let i = 0; i < c.length; i++) {
		const typeName = c[i].getTypeName();
		const hasReceiver = typeName !== null && typeName !== 'global';

		if (hasReceiver) {
			caller = i;
			break;
		}
	}

	return c[caller];
};
