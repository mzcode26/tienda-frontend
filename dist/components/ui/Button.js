"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("../../lib/utils");
var variantStyles = {
    primary: 'bg-slate-100 text-slate-950 hover:bg-white',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
};
var Button = function (_a) {
    var className = _a.className, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, props = __rest(_a, ["className", "variant"]);
    return (<button className={(0, utils_1.cn)('inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400', variantStyles[variant], className)} {...props}/>);
};
exports.default = Button;
