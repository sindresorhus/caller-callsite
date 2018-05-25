'use strict';
const callsites = require('callsites');

module.exports = () => {
	for (const callsite of callsites()) {
		const hasReceiver = callsite.getTypeName() !== null && callsite.getFileName() !== null;
		if (hasReceiver) {
			return callsite;
		}
	}
};
