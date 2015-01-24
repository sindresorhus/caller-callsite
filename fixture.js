'use strict';

function foo() {
	return require('./')();
}

module.exports = function () {
	return foo();
};
