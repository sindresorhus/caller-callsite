'use strict';
const callsites = require('callsites');

module.exports = () => {
	for (const callsite of callsites()) {
		const typeName = callsite.getTypeName();
		const hasReceiver = typeName !== null && typeName !== 'global' && callsite.getFileName() !== null;
		if (hasReceiver) {
			return callsite;
		}
	}
};
