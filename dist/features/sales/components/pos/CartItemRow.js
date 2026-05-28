"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRow = CartItemRow;
var lucide_react_1 = require("lucide-react");
function CartItemRow(_a) {
    var item = _a.item, onUpdateQuantity = _a.onUpdateQuantity, onRemove = _a.onRemove;
    return (<div className="flex items-center gap-3 py-3 border-b last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
        <p className="text-xs text-gray-500">
          SKU: {item.sku}
          {item.size && " \u00B7 ".concat(item.size)}
          {item.color && " \u00B7 ".concat(item.color)}
        </p>
        <p className="text-xs text-indigo-600 font-medium">${item.unitPrice.toFixed(2)} c/u</p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={function () { return onUpdateQuantity(item.variantId, item.quantity - 1); }} className="h-6 w-6 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40" disabled={item.quantity <= 1}>
          <lucide_react_1.Minus className="h-3 w-3"/>
        </button>
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        <button onClick={function () { return onUpdateQuantity(item.variantId, item.quantity + 1); }} className="h-6 w-6 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40" disabled={item.quantity >= item.stock}>
          <lucide_react_1.Plus className="h-3 w-3"/>
        </button>
      </div>
      <div className="text-right min-w-[60px]">
        <p className="text-sm font-semibold">${(item.unitPrice * item.quantity).toFixed(2)}</p>
      </div>
      <button onClick={function () { return onRemove(item.variantId); }} className="text-red-400 hover:text-red-600">
        <lucide_react_1.Trash2 className="h-4 w-4"/>
      </button>
    </div>);
}
