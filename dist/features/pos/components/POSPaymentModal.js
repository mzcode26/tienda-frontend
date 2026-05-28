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
exports.POSPaymentModal = POSPaymentModal;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var utils_1 = require("../../../lib/utils");
var useSales_1 = require("../../sales/hooks/useSales");
var pos_cart_store_1 = require("../stores/pos-cart.store");
var PAYMENT_METHODS = [
    {
        value: 'CASH',
        label: 'Efectivo',
        icon: <lucide_react_1.Banknote className="h-4 w-4"/>,
    },
    {
        value: 'CARD_DEBIT',
        label: 'Tarjeta débito',
        icon: <lucide_react_1.CreditCard className="h-4 w-4"/>,
    },
    {
        value: 'CARD_CREDIT',
        label: 'Tarjeta crédito',
        icon: <lucide_react_1.CreditCard className="h-4 w-4"/>,
    },
    {
        value: 'TRANSFER',
        label: 'Transferencia',
        icon: <lucide_react_1.ArrowRightLeft className="h-4 w-4"/>,
    },
    {
        value: 'QR',
        label: 'QR',
        icon: <lucide_react_1.ArrowRightLeft className="h-4 w-4"/>,
    },
    {
        value: 'OTHER',
        label: 'Otro',
        icon: <lucide_react_1.ArrowRightLeft className="h-4 w-4"/>,
    },
];
function POSPaymentModal(_a) {
    var _this = this;
    var isOpen = _a.isOpen, storeId = _a.storeId, onClose = _a.onClose, onSuccess = _a.onSuccess;
    var _b = (0, pos_cart_store_1.usePOSCartStore)(), items = _b.items, customer = _b.customer, total = _b.total, clearCart = _b.clearCart, setCustomer = _b.setCustomer;
    var createSale = (0, useSales_1.useCreateSale)();
    var _c = (0, react_1.useState)('CASH'), paymentMethod = _c[0], setPaymentMethod = _c[1];
    var _d = (0, react_1.useState)(''), cashReceived = _d[0], setCashReceived = _d[1];
    var _e = (0, react_1.useState)(''), reference = _e[0], setReference = _e[1];
    var receivedAmount = Number(cashReceived || 0);
    var change = (0, react_1.useMemo)(function () {
        return Math.max(0, receivedAmount - total);
    }, [receivedAmount, total]);
    var resetForm = function () {
        setPaymentMethod('CASH');
        setCashReceived('');
        setReference('');
    };
    var handleClose = function () {
        resetForm();
        onClose();
    };
    var handleConfirm = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!storeId) {
                        sonner_1.toast.error('Selecciona una sucursal');
                        return [2 /*return*/];
                    }
                    if (items.length === 0) {
                        sonner_1.toast.error('El carrito está vacío');
                        return [2 /*return*/];
                    }
                    if (paymentMethod === 'CASH' && receivedAmount < total) {
                        sonner_1.toast.error('El efectivo recibido es insuficiente');
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, createSale.mutateAsync({
                            storeId: storeId,
                            customerId: (_a = customer === null || customer === void 0 ? void 0 : customer.id) !== null && _a !== void 0 ? _a : undefined,
                            items: items.map(function (item) {
                                var _a;
                                return ({
                                    variantId: item.variantId,
                                    quantity: item.quantity,
                                    unitPrice: item.unitPrice,
                                    discountAmount: (_a = item.discountAmount) !== null && _a !== void 0 ? _a : 0,
                                });
                            }),
                            payments: [
                                {
                                    method: paymentMethod,
                                    amount: total,
                                    reference: reference.trim() || undefined,
                                },
                            ],
                        })];
                case 2:
                    _b.sent();
                    sonner_1.toast.success('Venta registrada correctamente');
                    clearCart();
                    setCustomer(null);
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                    handleClose();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1);
                    sonner_1.toast.error('No se pudo registrar la venta');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Cobrar venta</h2>
            <p className="text-sm text-gray-500">Selecciona el método de pago</p>
          </div>

          <button onClick={handleClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" aria-label="Cerrar">
            <lucide_react_1.X className="h-5 w-5"/>
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Items</span>
                <span>{items.length}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Total unidades</span>
                <span>{items.reduce(function (acc, item) { return acc + item.quantity; }, 0)}</span>
              </div>

              <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-blue-600">{(0, utils_1.formatCurrency)(total)}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Método de pago</p>

            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map(function (method) {
            var active = paymentMethod === method.value;
            return (<button key={method.value} type="button" onClick={function () { return setPaymentMethod(method.value); }} className={"flex items-center gap-2 rounded-xl border px-3 py-3 text-sm transition ".concat(active
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50')}>
                    {method.icon}
                    <span>{method.label}</span>
                  </button>);
        })}
            </div>
          </div>

          {paymentMethod === 'CASH' && (<div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Efectivo recibido
              </label>

              <input type="number" min={0} step="0.01" value={cashReceived} onChange={function (e) { return setCashReceived(e.target.value); }} className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={(0, utils_1.formatCurrency)(total)}/>

              {receivedAmount >= total && (<p className="mt-1 text-sm text-green-600">
                  Vuelto: {(0, utils_1.formatCurrency)(change)}
                </p>)}
            </div>)}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Referencia / comprobante
            </label>

            <input type="text" value={reference} onChange={function (e) { return setReference(e.target.value); }} className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Opcional"/>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <button onClick={handleClose} className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Cancelar
          </button>

          <button onClick={handleConfirm} disabled={createSale.isPending} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300">
            {createSale.isPending ? 'Procesando...' : 'Confirmar venta'}
          </button>
        </div>
      </div>
    </div>);
}
