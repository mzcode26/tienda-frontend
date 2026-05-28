"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSelector = StoreSelector;
function StoreSelector(_a) {
    var value = _a.value, onChange = _a.onChange, stores = _a.stores, _b = _a.loading, loading = _b === void 0 ? false : _b, _c = _a.label, label = _c === void 0 ? 'Sucursal' : _c, _d = _a.placeholder, placeholder = _d === void 0 ? 'Seleccionar sucursal' : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    return (<div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <select value={value} onChange={function (e) { return onChange(e.target.value); }} disabled={loading || disabled} className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700">
        <option value="">
          {loading ? 'Cargando sucursales...' : placeholder}
        </option>

        {stores.map(function (store) { return (<option key={store.id} value={store.id}>
            {store.name}
          </option>); })}
      </select>
    </div>);
}
