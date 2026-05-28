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
var utils_1 = require("../../lib/utils");
var Input = function (_a) {
    var label = _a.label, error = _a.error, className = _a.className, props = __rest(_a, ["label", "error", "className"]);
    return (<label className="block text-sm text-slate-300">
    {label ? <span className="mb-2 block text-slate-300">{label}</span> : null}
    <input className={(0, utils_1.cn)('w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-slate-600 focus:ring-2 focus:ring-slate-700', error ? 'border-red-500 focus:border-red-400 focus:ring-red-500/30' : '', className)} {...props}/>
    {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
  </label>);
};
exports.default = Input;
