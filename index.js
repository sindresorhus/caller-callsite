'use strict';
const callsites = require('callsites');

module.exports = ({depth = 0} = {}) => {
	const callers = [];
	const callerFileSet = new Set();

	for (const callsite of callsites()) {
		const typeName = callsite.getTypeName();
		const fileName = callsite.getFileName();
		const hasReceiver = typeName !== null && typeName !== 'global' && fileName !== null;

		if (!callerFileSet.has(fileName)) {
			callerFileSet.add(fileName);
			callers.unshift(callsite);
		}

		if (hasReceiver) {
			return callers[depth];
		}
	}
};
