"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleFilters = SaleFilters;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var STATUS_OPTIONS = [
    { value: '', label: 'Todos los estados' },
    { value: 'COMPLETED', label: 'Completadas' },
    { value: 'CANCELLED', label: 'Canceladas' },
    { value: 'REFUNDED', label: 'Reembolsadas' },
    { value: 'PENDING', label: 'Pendientes' },
];
function SaleFilters(_a) {
    var _b, _c, _d, _e;
    var filters = _a.filters, onChange = _a.onChange;
    var _f = (0, react_1.useState)((_b = filters.search) !== null && _b !== void 0 ? _b : ''), search = _f[0], setSearch = _f[1];
    (0, react_1.useEffect)(function () {
        var timer = window.setTimeout(function () {
            onChange(__assign(__assign({}, filters), { search: search || undefined, page: 1 }));
        }, 300);
        return function () { return window.clearTimeout(timer); };
    }, [search, filters, onChange]);
    return (<div className="bg-white border rounded-xl p-4 flex flex-wrap gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
        <input value={search} onChange={function (e) { return setSearch(e.target.value); }} placeholder="Buscar por número o cliente..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
      </div>

      <select value={(_c = filters.status) !== null && _c !== void 0 ? _c : ''} onChange={function (e) {
            return onChange(__assign(__assign({}, filters), { status: e.target.value ? e.target.value : undefined, page: 1 }));
        }} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        {STATUS_OPTIONS.map(function (o) { return (<option key={o.value} value={o.value}>
            {o.label}
          </option>); })}
      </select>

      <input type="date" value={(_d = filters.dateFrom) !== null && _d !== void 0 ? _d : ''} onChange={function (e) { return onChange(__assign(__assign({}, filters), { dateFrom: e.target.value || undefined, page: 1 })); }} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>

      <input type="date" value={(_e = filters.dateTo) !== null && _e !== void 0 ? _e : ''} onChange={function (e) { return onChange(__assign(__assign({}, filters), { dateTo: e.target.value || undefined, page: 1 })); }} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
    </div>);
}
