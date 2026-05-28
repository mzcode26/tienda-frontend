"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryProductsTable = InventoryProductsTable;
var lucide_react_1 = require("lucide-react");
function InventoryProductsTable(_a) {
    var items = _a.items, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, _c = _a.mode, mode = _c === void 0 ? 'inventory' : _c, onAdjust = _a.onAdjust, onTransfer = _a.onTransfer, onMovements = _a.onMovements, onSettings = _a.onSettings, onAddToSale = _a.onAddToSale, productNameByVariantId = _a.productNameByVariantId;
    var getProductName = function (item) {
        var _a, _b, _c, _d, _e, _f, _g;
        var fromMap = productNameByVariantId === null || productNameByVariantId === void 0 ? void 0 : productNameByVariantId.get(item.variantId);
        return ((_g = (_e = (_c = fromMap !== null && fromMap !== void 0 ? fromMap : (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : (_d = item.variant) === null || _d === void 0 ? void 0 : _d.productName) !== null && _e !== void 0 ? _e : (_f = item.variant) === null || _f === void 0 ? void 0 : _f.variantName) !== null && _g !== void 0 ? _g : 'Producto');
    };
    var getVariantLabel = function (item) {
        var _a, _b, _c, _d, _e, _f;
        return (_f = (_d = (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_c = item.variant) === null || _c === void 0 ? void 0 : _c.variantName) !== null && _d !== void 0 ? _d : (_e = item.variant) === null || _e === void 0 ? void 0 : _e.sku) !== null && _f !== void 0 ? _f : '—';
    };
    if (isLoading) {
        return (<div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-6 space-y-4">
          {Array.from({ length: 8 }).map(function (_, i) { return (<div key={i} className="h-12 rounded-lg bg-gray-100 animate-pulse"/>); })}
        </div>
      </div>);
    }
    if (!items.length) {
        return (<div className="bg-white rounded-xl border p-12 text-center">
        <lucide_react_1.Package className="mx-auto h-12 w-12 text-gray-300 mb-3"/>
        <p className="text-gray-500 font-medium">No hay productos para mostrar</p>
        <p className="text-sm text-gray-400 mt-1">
          Ajusta los filtros o selecciona otra sucursal
        </p>
      </div>);
    }
    return (<div className="bg-white rounded-xl border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Producto</th>
              <th className="px-4 py-3 text-left font-medium">SKU</th>
              <th className="px-4 py-3 text-left font-medium">Variante</th>
              <th className="px-4 py-3 text-center font-medium">Stock</th>
              <th className="px-4 py-3 text-center font-medium">Mínimo</th>
              <th className="px-4 py-3 text-center font-medium">Estado</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {items.map(function (item) {
            var _a, _b, _c, _d, _e;
            var productName = getProductName(item);
            var variantLabel = getVariantLabel(item);
            var quantity = Number((_a = item.quantity) !== null && _a !== void 0 ? _a : 0);
            var minStock = Number((_b = item.minStock) !== null && _b !== void 0 ? _b : 0);
            var isOutOfStock = quantity <= 0;
            var isLowStock = quantity > 0 && quantity <= minStock;
            return (<tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{productName}</p>
                      {((_c = item.store) === null || _c === void 0 ? void 0 : _c.name) && (<p className="text-xs text-gray-500 mt-0.5">{item.store.name}</p>)}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-mono text-xs">
                      {(_e = (_d = item.variant) === null || _d === void 0 ? void 0 : _d.sku) !== null && _e !== void 0 ? _e : '—'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>{variantLabel}</div>

                      {variantLabel === '—' && <div>—</div>}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={"inline-flex items-center justify-center min-w-[60px] rounded-full px-2.5 py-1 text-xs font-medium ".concat(isOutOfStock
                    ? 'bg-gray-100 text-gray-700'
                    : isLowStock
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700')}>
                      {quantity}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center text-gray-600">{minStock}</td>

                  <td className="px-4 py-3 text-center">
                    {isOutOfStock ? (<span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        Sin stock
                      </span>) : isLowStock ? (<span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                        Bajo
                      </span>) : (<span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        OK
                      </span>)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {mode === 'inventory' ? (<>
                          <button onClick={function () { return onAdjust === null || onAdjust === void 0 ? void 0 : onAdjust(item); }} className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-gray-50">
                            <lucide_react_1.Package className="h-3.5 w-3.5"/>
                            Ajustar
                          </button>

                          <button onClick={function () { return onTransfer === null || onTransfer === void 0 ? void 0 : onTransfer(item); }} className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-gray-50">
                            <lucide_react_1.ArrowUpDown className="h-3.5 w-3.5"/>
                            Transferir
                          </button>

                          <button onClick={function () { return onMovements === null || onMovements === void 0 ? void 0 : onMovements(item); }} className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-gray-50">
                            Movimientos
                          </button>

                          <button onClick={function () { return onSettings === null || onSettings === void 0 ? void 0 : onSettings(item); }} className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-gray-50">
                            <lucide_react_1.Settings className="h-3.5 w-3.5"/>
                          </button>
                        </>) : (<button onClick={function () { return onAddToSale === null || onAddToSale === void 0 ? void 0 : onAddToSale(item); }} disabled={quantity <= 0} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                          <lucide_react_1.Plus className="h-3.5 w-3.5"/>
                          Agregar
                        </button>)}
                    </div>
                  </td>
                </tr>);
        })}
          </tbody>
        </table>
      </div>
    </div>);
}
