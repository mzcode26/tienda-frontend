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
exports.ProductFilters = ProductFilters;
function ProductFilters(_a) {
    var _b, _c, _d;
    var filters = _a.filters, onChange = _a.onChange, categoryOptions = _a.categoryOptions, brandOptions = _a.brandOptions;
    var handleClear = function () {
        onChange({
            search: '',
            categoryId: '',
            brandId: '',
            isActive: undefined,
            page: 1,
            limit: 20,
        });
    };
    return (<div className="rounded-2xl border bg-white p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="grid gap-1">
          <label className="text-xs font-medium text-gray-500">Buscar</label>
          <input className="rounded-lg border px-3 py-2" placeholder="Nombre, SKU, slug..." value={(_b = filters.search) !== null && _b !== void 0 ? _b : ''} onChange={function (e) {
            return onChange(__assign(__assign({}, filters), { search: e.target.value, page: 1 }));
        }}/>
        </div>

        <div className="grid gap-1">
          <label className="text-xs font-medium text-gray-500">Categoría</label>
          <select className="rounded-lg border px-3 py-2" value={(_c = filters.categoryId) !== null && _c !== void 0 ? _c : ''} onChange={function (e) {
            return onChange(__assign(__assign({}, filters), { categoryId: e.target.value, page: 1 }));
        }}>
            <option value="">Todas</option>
            {categoryOptions.map(function (category) { return (<option key={category.id} value={category.id}>
                {category.name}
              </option>); })}
          </select>
        </div>

        <div className="grid gap-1">
          <label className="text-xs font-medium text-gray-500">Marca</label>
          <select className="rounded-lg border px-3 py-2" value={(_d = filters.brandId) !== null && _d !== void 0 ? _d : ''} onChange={function (e) {
            return onChange(__assign(__assign({}, filters), { brandId: e.target.value, page: 1 }));
        }}>
            <option value="">Todas</option>
            {brandOptions.map(function (brand) { return (<option key={brand.id} value={brand.id}>
                {brand.name}
              </option>); })}
          </select>
        </div>

        <div className="grid gap-1">
          <label className="text-xs font-medium text-gray-500">Estado</label>
          <select className="rounded-lg border px-3 py-2" value={filters.isActive === undefined
            ? ''
            : filters.isActive
                ? 'true'
                : 'false'} onChange={function (e) {
            return onChange(__assign(__assign({}, filters), { isActive: e.target.value === ''
                    ? undefined
                    : e.target.value === 'true', page: 1 }));
        }}>
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button type="button" onClick={handleClear} className="rounded-lg border px-4 py-2 text-sm">
          Limpiar filtros
        </button>
      </div>
    </div>);
}
