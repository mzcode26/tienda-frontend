"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModal = PaymentModal;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var cart_store_1 = require("../../stores/cart.store");
var useSales_1 = require("../../hooks/useSales");
var sonner_1 = require("sonner");
var PAYMENT_METHODS = [
    { value: 'CASH', label: 'Efectivo', icon: <lucide_react_1.Banknote className="h-5 w-5"/> },
    { value: 'CARD', label: 'Tarjeta', icon: <lucide_react_1.CreditCard className="h-5 w-5"/> },
    { value: 'TRANSFER', label: 'Transferencia', icon: <lucide_react_1.Smartphone className="h-5 w-5"/> },
];
function PaymentModal(_a) {
    var _this = this;
    var isOpen = _a.isOpen, customerId = _a.customerId, storeId = _a.storeId, onClose = _a.onClose, onSuccess = _a.onSuccess;
    var _b = (0, react_1.useState)('CASH'), paymentMethod = _b[0], setPaymentMethod = _b[1];
    var _c = (0, react_1.useState)(''), cashReceived = _c[0], setCashReceived = _c[1];
    var _d = (0, cart_store_1.useCartStore)(), items = _d.items, getTotal = _d.getTotal, clearCart = _d.clearCart;
    var createSale = (0, useSales_1.useCreateSale)();
    var total = getTotal();
    var change = paymentMethod === 'CASH' ? Math.max(0, Number(cashReceived) - total) : 0;
    if (!isOpen)
        return null;
    var handleConfirm = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, createSale.mutateAsync({
                            storeId: storeId,
                            customerId: customerId !== null && customerId !== void 0 ? customerId : undefined,
                            items: items.map(function (i) { return ({ productVariantId: i.variantId, quantity: i.quantity, unitPrice: i.unitPrice }); }),
                            payments: [{ method: paymentMethod, amount: total }],
                        })];
                case 1:
                    _b.sent();
                    clearCart();
                    sonner_1.toast.success('Venta registrada exitosamente');
                    onSuccess();
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    sonner_1.toast.error('Error al procesar la venta');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Confirmar Pago</h2>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{items.length} producto(s)</span>
            <span>{items.reduce(function (a, i) { return a + i.quantity; }, 0)} unidades</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-indigo-600">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Método de pago</p>
          <div className="grid grid-cols-3 gap-2">
            {PAYMENT_METHODS.map(function (m) { return (<button key={m.value} onClick={function () { return setPaymentMethod(m.value); }} className={"flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-colors ".concat(paymentMethod === m.value
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600')}>
                {m.icon}
                <span className="text-xs font-medium">{m.label}</span>
              </button>); })}
          </div>
        </div>

        {paymentMethod === 'CASH' && (<div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Efectivo recibido</label>
            <input type="number" value={cashReceived} onChange={function (e) { return setCashReceived(e.target.value); }} placeholder={"M\u00EDnimo $".concat(total.toFixed(2))} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            {Number(cashReceived) >= total && (<p className="text-sm text-green-600 mt-1 font-medium">
                Vuelto: ${change.toFixed(2)}
              </p>)}
          </div>)}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border rounded-lg text-sm hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={handleConfirm} disabled={createSale.isPending || (paymentMethod === 'CASH' && Number(cashReceived) < total)} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">
            {createSale.isPending ? 'Procesando...' : 'Confirmar Venta'}
          </button>
        </div>
      </div>
    </div>);
}
