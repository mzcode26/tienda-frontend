"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSItemModal = POSItemModal;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("../../../lib/utils");
function POSItemModal(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var isOpen = _a.isOpen, item = _a.item, onClose = _a.onClose, onConfirm = _a.onConfirm;
    var availableStock = Number((_b = item === null || item === void 0 ? void 0 : item.quantity) !== null && _b !== void 0 ? _b : 0);
    var baseProductName = (_j = (_g = (_e = (_d = (_c = item === null || item === void 0 ? void 0 : item.variant) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : (_f = item === null || item === void 0 ? void 0 : item.variant) === null || _f === void 0 ? void 0 : _f.productName) !== null && _g !== void 0 ? _g : (_h = item === null || item === void 0 ? void 0 : item.variant) === null || _h === void 0 ? void 0 : _h.variantName) !== null && _j !== void 0 ? _j : 'Producto';
    var sku = (_l = (_k = item === null || item === void 0 ? void 0 : item.variant) === null || _k === void 0 ? void 0 : _k.sku) !== null && _l !== void 0 ? _l : '';
    var _p = (0, react_1.useState)(1), quantity = _p[0], setQuantity = _p[1];
    var _q = (0, react_1.useState)(0), unitPrice = _q[0], setUnitPrice = _q[1];
    var _r = (0, react_1.useState)(0), discountAmount = _r[0], setDiscountAmount = _r[1];
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d;
        if (!item)
            return;
        setQuantity(1);
        setDiscountAmount(0);
        var fallbackPrice = Number((_d = (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : (_c = item.variant) === null || _c === void 0 ? void 0 : _c.salePrice) !== null && _d !== void 0 ? _d : 0);
        setUnitPrice(fallbackPrice);
    }, [item]);
    var subtotal = (0, react_1.useMemo)(function () {
        return quantity * unitPrice;
    }, [quantity, unitPrice]);
    var total = (0, react_1.useMemo)(function () {
        return Math.max(0, subtotal - discountAmount);
    }, [subtotal, discountAmount]);
    var handleConfirm = function () {
        if (!item)
            return;
        if (quantity <= 0)
            return;
        if (availableStock > 0 && quantity > availableStock)
            return;
        onConfirm({
            variantId: item.variantId,
            productName: baseProductName,
            sku: sku,
            quantity: quantity,
            unitPrice: unitPrice,
            discountAmount: discountAmount,
            inventoryItem: item,
        });
        onClose();
    };
    if (!isOpen || !item)
        return null;
    var isOutOfStock = availableStock <= 0;
    var isQuantityInvalid = quantity <= 0 || (availableStock > 0 && quantity > availableStock);
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Agregar a venta</h2>
            <p className="text-sm text-gray-500">Configura cantidad y precio</p>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" aria-label="Cerrar">
            <lucide_react_1.X className="h-5 w-5"/>
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-5 px-6 py-5">
          {/* PRODUCT INFO */}
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <lucide_react_1.Package className="h-5 w-5 text-blue-600"/>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {baseProductName}
                </p>

                <div className="mt-1 space-y-1 text-xs text-gray-500">
                  {sku && <div>SKU: {sku}</div>}
                  <div>Sucursal: {(_o = (_m = item.store) === null || _m === void 0 ? void 0 : _m.name) !== null && _o !== void 0 ? _o : '—'}</div>
                  <div>Stock disponible: {availableStock}</div>
                </div>
              </div>
            </div>
          </div>

          {/* FIELDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Cantidad
              </label>
              <input type="number" min={1} max={availableStock > 0 ? availableStock : undefined} value={quantity} onChange={function (e) { return setQuantity(Number(e.target.value)); }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {isOutOfStock && (<p className="mt-1 text-xs text-red-500">
                  Sin stock disponible
                </p>)}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Precio unitario
              </label>
              <input type="number" min={0} step="0.01" value={unitPrice} onChange={function (e) { return setUnitPrice(Number(e.target.value)); }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Descuento
              </label>
              <input type="number" min={0} step="0.01" value={discountAmount} onChange={function (e) { return setDiscountAmount(Number(e.target.value)); }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>

          {/* CALCULATION */}
          <div className="rounded-xl border bg-white p-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{(0, utils_1.formatCurrency)(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Descuento</span>
                <span>- {(0, utils_1.formatCurrency)(discountAmount)}</span>
              </div>

              <div className="flex items-center justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span className="text-blue-600">{(0, utils_1.formatCurrency)(total)}</span>
              </div>
            </div>
          </div>

          {isQuantityInvalid && (<p className="text-sm text-red-500">
              La cantidad seleccionada no es válida para el stock disponible.
            </p>)}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <button onClick={onClose} className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Cancelar
          </button>

          <button onClick={handleConfirm} disabled={isQuantityInvalid} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300">
            Agregar
          </button>
        </div>
      </div>
    </div>);
}
