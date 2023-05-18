"use strict";
module.exports = function (thenFn) { return function (req, res, next) {
    Promise.resolve(thenFn(req, res, next)).catch(next);
}; };
