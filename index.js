import callsites from 'callsites';

export default function callerCallsite(options = {}) {
	const {depth = 0} = options ?? {};

	// Handle invalid depth values
	if (!Number.isInteger(depth) || depth < 0) {
		return undefined;
	}

	const sites = callsites();

	// Skip Node.js internal modules and collect valid callsites
	const validSites = sites.filter(site => {
		const fileName = site.getFileName();
		return fileName && !fileName.startsWith('node:');
	});

	// Skip the first site (which is callerCallsite itself)
	// Skip the second site (which is the function that called callerCallsite)
	// Return the caller at the requested depth
	// depth 0 = immediate caller, depth 1 = caller's caller, etc.
	return validSites[depth + 2];
}
