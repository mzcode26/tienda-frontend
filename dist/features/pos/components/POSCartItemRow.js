"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSCartItemRow = POSCartItemRow;
var lucide_react_1 = require("lucide-react");
var utils_1 = require("../../../lib/utils");
function POSCartItemRow(_a) {
    var item = _a.item, onIncrease = _a.onIncrease, onDecrease = _a.onDecrease, onRemove = _a.onRemove, onPriceChange = _a.onPriceChange, onDiscountChange = _a.onDiscountChange;
    return (<div className="rounded-xl border bg-white p-3 space-y-3">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">
            {item.productName}
          </p>

          <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
            {item.sku && (<span>
                SKU: {item.sku}
              </span>)}

            <span>
              Cantidad: {item.quantity}
            </span>
          </div>
        </div>

        <button onClick={function () {
            return onRemove(item.variantId);
        }} className="rounded-lg p-1 text-red-500 hover:bg-red-50">
          <lucide_react_1.Trash2 className="h-4 w-4"/>
        </button>
      </div>

      {/* PRICE / DISCOUNT */}
      <div className="grid grid-cols-2 gap-3">
        {/* PRICE */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Precio
          </label>

          <input type="number" min={0} step="0.01" value={item.unitPrice} onChange={function (e) {
            return onPriceChange === null || onPriceChange === void 0 ? void 0 : onPriceChange(item.variantId, Number(e.target.value));
        }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        {/* DISCOUNT */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Descuento
          </label>

          <input type="number" min={0} step="0.01" value={item.discountAmount} onChange={function (e) {
            return onDiscountChange === null || onDiscountChange === void 0 ? void 0 : onDiscountChange(item.variantId, Number(e.target.value));
        }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        {/* QUANTITY */}
        <div className="flex items-center gap-2">
          <button onClick={function () {
            return onDecrease(item.variantId);
        }} className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-gray-50">
            <lucide_react_1.Minus className="h-4 w-4"/>
          </button>

          <span className="min-w-[28px] text-center text-sm font-medium">
            {item.quantity}
          </span>

          <button onClick={function () {
            return onIncrease(item.variantId);
        }} className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-gray-50">
            <lucide_react_1.Plus className="h-4 w-4"/>
          </button>
        </div>

        {/* TOTAL */}
        <div className="text-right">
          <p className="text-xs text-gray-500">
            Subtotal
          </p>

          <p className="text-sm font-semibold text-gray-900">
            {(0, utils_1.formatCurrency)(item.total)}
          </p>
        </div>
      </div>
    </div>);
}
