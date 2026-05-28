"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementsModal = MovementsModal;
var react_1 = require("react");
function getMovementLabel(type) {
    switch (type) {
        case 'PURCHASE':
            return 'Compra';
        case 'SALE':
            return 'Venta';
        case 'RETURN':
            return 'Devolución';
        case 'ADJUSTMENT':
            return 'Ajuste';
        case 'ADJUSTMENT_IN':
            return 'Ajuste +';
        case 'ADJUSTMENT_OUT':
            return 'Ajuste -';
        case 'TRANSFER_IN':
            return 'Transferencia +';
        case 'TRANSFER_OUT':
            return 'Transferencia -';
        case 'INITIAL':
            return 'Inicial';
        default:
            return type;
    }
}
function getMovementBadgeClass(type) {
    if (type === 'SALE' || type === 'TRANSFER_OUT' || type === 'ADJUSTMENT_OUT') {
        return 'bg-red-100 text-red-700';
    }
    if (type === 'PURCHASE' || type === 'RETURN' || type === 'TRANSFER_IN' || type === 'ADJUSTMENT_IN' || type === 'INITIAL') {
        return 'bg-green-100 text-green-700';
    }
    return 'bg-gray-100 text-gray-700';
}
function MovementsModal(_a) {
    var _b, _c;
    var open = _a.open, item = _a.item, movements = _a.movements, _d = _a.isLoading, isLoading = _d === void 0 ? false : _d, onClose = _a.onClose;
    var title = (0, react_1.useMemo)(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (!item)
            return 'Movimientos';
        return "".concat((_e = (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.productName) !== null && _b !== void 0 ? _b : (_d = (_c = item.variant) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : 'Producto', " \u2014 ").concat((_l = (_j = (_g = (_f = item.variant) === null || _f === void 0 ? void 0 : _f.variantName) !== null && _g !== void 0 ? _g : (_h = item.variant) === null || _h === void 0 ? void 0 : _h.name) !== null && _j !== void 0 ? _j : (_k = item.variant) === null || _k === void 0 ? void 0 : _k.sku) !== null && _l !== void 0 ? _l : 'Sin variante');
    }, [item]);
    if (!open || !item)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Movimientos</h3>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-sm text-gray-500">
              {(_c = (_b = item.store) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'Sucursal'} — Stock actual: {item.quantity}
            </p>
          </div>

          <button type="button" onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
            Cerrar
          </button>
        </div>

        {isLoading ? (<div className="rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500">
            Cargando movimientos...
          </div>) : movements.length === 0 ? (<div className="rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500">
            No hay movimientos para mostrar.
          </div>) : (<div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Cantidad
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Previo
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actual
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Usuario
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Referencia
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Observación
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {movements.map(function (movement) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return (<tr key={movement.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(movement.createdAt).toLocaleString('es-AR')}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <span className={"inline-flex rounded-full px-2 py-1 text-xs font-medium ".concat(getMovementBadgeClass(movement.type))}>
                          {getMovementLabel(movement.type)}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                        {movement.quantity}
                      </td>

                      <td className="px-4 py-3 text-right text-sm text-gray-600">
                        {(_a = movement.previousQuantity) !== null && _a !== void 0 ? _a : '-'}
                      </td>

                      <td className="px-4 py-3 text-right text-sm text-gray-600">
                        {(_b = movement.newQuantity) !== null && _b !== void 0 ? _b : '-'}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-600">
                        {(_f = (_d = (_c = movement.user) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : (_e = movement.user) === null || _e === void 0 ? void 0 : _e.email) !== null && _f !== void 0 ? _f : '-'}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-600">
                        {(_g = movement.referenceId) !== null && _g !== void 0 ? _g : '-'}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-600">
                        {(_h = movement.reason) !== null && _h !== void 0 ? _h : '-'}
                      </td>
                    </tr>);
            })}
                </tbody>
              </table>
            </div>
          </div>)}
      </div>
    </div>);
}
