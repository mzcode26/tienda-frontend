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
exports.InventoryFilters = InventoryFilters;
function InventoryFilters(_a) {
    var _b, _c, _d;
    var values = _a.values, onChange = _a.onChange, onReset = _a.onReset, _e = _a.isLoading, isLoading = _e === void 0 ? false : _e;
    function handleFieldChange(field, value) {
        var _a;
        onChange(__assign(__assign({}, values), (_a = {}, _a[field] = value, _a)));
    }
    return (<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Buscar
          </label>

          <input type="text" value={(_b = values.search) !== null && _b !== void 0 ? _b : ''} onChange={function (e) {
            return handleFieldChange('search', e.target.value || undefined);
        }} disabled={isLoading} placeholder="Producto, SKU o código" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500"/>
        </div>

        <div className="flex items-end gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={(_c = values.lowStock) !== null && _c !== void 0 ? _c : false} onChange={function (e) {
            return handleFieldChange('lowStock', e.target.checked);
        }} disabled={isLoading} className="h-4 w-4 rounded border-gray-300"/>
            Bajo stock
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={(_d = values.outOfStock) !== null && _d !== void 0 ? _d : false} onChange={function (e) {
            return handleFieldChange('outOfStock', e.target.checked);
        }} disabled={isLoading} className="h-4 w-4 rounded border-gray-300"/>
            Sin stock
          </label>
        </div>

        <div className="flex items-end justify-start md:justify-end">
          <button type="button" onClick={onReset} disabled={isLoading} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>);
}
