"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRelativeTime = exports.formatDate = exports.formatCurrency = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
var cn = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
};
exports.cn = cn;
var formatCurrency = function (amount, currency) {
    if (currency === void 0) { currency = 'ARS'; }
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};
exports.formatCurrency = formatCurrency;
var formatDate = function (date) {
    var d = new Date(date);
    return d.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
exports.formatDate = formatDate;
var formatRelativeTime = function (date) {
    var now = new Date();
    var d = new Date(date);
    var diffInMs = now.getTime() - d.getTime();
    var diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    var diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays > 0) {
        return "hace ".concat(diffInDays, " d\u00EDa").concat(diffInDays > 1 ? 's' : '');
    }
    if (diffInHours > 0) {
        return "hace ".concat(diffInHours, " hora").concat(diffInHours > 1 ? 's' : '');
    }
    return 'hace menos de una hora';
};
exports.formatRelativeTime = formatRelativeTime;
