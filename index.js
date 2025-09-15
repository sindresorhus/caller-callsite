import callsites from 'callsites';

export default function callerCallsite({depth = 0} = {}) {
	const callers = [];
	const callerFileSet = new Set();

	for (const callsite of callsites()) {
		const fileName = callsite.getFileName();

		// Skip Node.js internal modules
		if (fileName?.startsWith('node:')) {
			continue;
		}

		if (!callerFileSet.has(fileName)) {
			callerFileSet.add(fileName);
			callers.unshift(callsite);
		}

		// Stop at the first receiver (typeName is not null)
		if (callsite.getTypeName() !== null && fileName !== null) {
			return callers[depth];
		}
	}

	// Fallback: if no receiver found, return from collected callers
	return callers[depth];
}
