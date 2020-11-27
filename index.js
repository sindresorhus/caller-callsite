'use strict';
const callsites = require('callsites');

module.exports = ({depth = 0} = {}) => {
	let [site, ...sites] = callsites();

	let filename = site.getFileName();

	for (;;) {
		let fname;

		while ((site = sites.shift())) {
			fname = site.getFileName();

			if (fname !== filename && !fname.startsWith('node:')) {
				break;
			}
		}

		if (!(site && depth--)) {
			break;
		}

		filename = fname;
	}

	return site;
};
