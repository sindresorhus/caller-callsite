import callerCallsite from './index.js';

function foo({depth = 0} = {}) {
	return callerCallsite({depth});
}

export default function fixture({depth = 0} = {}) {
	return foo({depth});
}
