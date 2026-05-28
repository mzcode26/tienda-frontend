"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetailModal = SaleDetailModal;
var useSales_1 = require("../hooks/useSales");
var STATUS_LABELS = {
    COMPLETED: { label: 'Completada', className: 'bg-green-100 text-green-800' },
    CANCELLED: { label: 'Cancelada', className: 'bg-red-100 text-red-800' },
    REFUNDED: { label: 'Reembolsada', className: 'bg-yellow-100 text-yellow-800' },
    PENDING: { label: 'Pendiente', className: 'bg-gray-100 text-gray-800' },
};
var PAYMENT_LABELS = {
    CASH: 'Efectivo',
    CARD: 'Tarjeta',
    TRANSFER: 'Transferencia',
    OTHER: 'Otro',
    CARD_DEBIT: 'Débito',
    CARD_CREDIT: 'Crédito',
    QR: 'QR',
};
var formatMoney = function (value) { return Number(value !== null && value !== void 0 ? value : 0).toFixed(2); };
function SaleDetailModal(_a) {
    var _b, _c, _d, _e;
    var saleId = _a.saleId, isOpen = _a.isOpen, onClose = _a.onClose;
    var _f = (0, useSales_1.useSale)(saleId !== null && saleId !== void 0 ? saleId : ''), sale = _f.data, isLoading = _f.isLoading;
    if (!isOpen || !saleId)
        return null;
    var status = (_c = STATUS_LABELS[(_b = sale === null || sale === void 0 ? void 0 : sale.status) !== null && _b !== void 0 ? _b : 'PENDING']) !== null && _c !== void 0 ? _c : {
        label: (_d = sale === null || sale === void 0 ? void 0 : sale.status) !== null && _d !== void 0 ? _d : '—',
        className: 'bg-gray-100 text-gray-800',
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">Venta #{(_e = sale === null || sale === void 0 ? void 0 : sale.saleNumber) !== null && _e !== void 0 ? _e : saleId.slice(0, 8)}</h2>
            <p className="text-sm text-gray-500">
              {(sale === null || sale === void 0 ? void 0 : sale.createdAt) ? new Date(sale.createdAt).toLocaleString('es-AR') : '—'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={"px-2 py-1 text-xs rounded-full font-medium ".concat(status.className)}>
              {status.label}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
              ×
            </button>
          </div>
        </div>

        {isLoading && (<div className="space-y-3">
            <div className="h-12 rounded bg-gray-100 animate-pulse"/>
            <div className="h-32 rounded bg-gray-100 animate-pulse"/>
            <div className="h-20 rounded bg-gray-100 animate-pulse"/>
          </div>)}

        {!isLoading && sale && (<>
            {sale.customer && (<div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 mb-1">Cliente</p>
                <p className="text-sm font-medium">
                  {sale.customer.firstName} {sale.customer.lastName}
                </p>
                {sale.customer.email && <p className="text-xs text-gray-500">{sale.customer.email}</p>}
                {sale.customer.phone && <p className="text-xs text-gray-500">{sale.customer.phone}</p>}
              </div>)}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs uppercase text-gray-500">Subtotal</p>
                <p className="font-semibold">${formatMoney(sale.subtotal)}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs uppercase text-gray-500">Descuento</p>
                <p className="font-semibold">${formatMoney(sale.discountAmount)}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs uppercase text-gray-500">Impuestos</p>
                <p className="font-semibold">${formatMoney(sale.taxAmount)}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs uppercase text-gray-500">Total</p>
                <p className="font-semibold text-indigo-600">${formatMoney(sale.total)}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">Productos</p>
              <div className="space-y-2">
                {sale.items.map(function (item) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                var productName = (_c = (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'Producto';
                var sku = (_e = (_d = item.variant) === null || _d === void 0 ? void 0 : _d.sku) !== null && _e !== void 0 ? _e : item.variantId;
                var size = (_f = item.variant) === null || _f === void 0 ? void 0 : _f.size;
                var color = (_g = item.variant) === null || _g === void 0 ? void 0 : _g.color;
                var itemDiscount = (_j = (_h = item.discountAmount) !== null && _h !== void 0 ? _h : item.discount) !== null && _j !== void 0 ? _j : 0;
                return (<div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{productName}</p>
                        <p className="text-xs text-gray-500">
                          SKU: {sku} · x{item.quantity}
                          {size ? " \u00B7 Talle: ".concat(size) : ''}
                          {color ? " \u00B7 Color: ".concat(color) : ''}
                        </p>
                        {itemDiscount > 0 && (<p className="text-xs text-gray-400">Descuento: ${formatMoney(itemDiscount)}</p>)}
                      </div>
                      <p className="text-sm font-semibold">${formatMoney(item.subtotal)}</p>
                    </div>);
            })}
              </div>
            </div>

            {sale.payments.length > 0 && (<div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Pagos</p>
                {sale.payments.map(function (p) {
                    var _a;
                    return (<div key={p.id} className="flex justify-between text-sm py-1">
                    <span className="text-gray-600">{(_a = PAYMENT_LABELS[p.method]) !== null && _a !== void 0 ? _a : p.method}</span>
                    <span className="font-medium">${formatMoney(p.amount)}</span>
                  </div>);
                })}
              </div>)}

            {sale.notes && (<div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Notas</p>
                <p className="text-sm text-gray-700">{sale.notes}</p>
              </div>)}

            {(sale.cancelReason || sale.cancelledAt) && (<div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-xs font-medium text-red-600 uppercase mb-1">Cancelación</p>
                {sale.cancelReason && <p className="text-sm text-red-700">{sale.cancelReason}</p>}
                {sale.cancelledAt && (<p className="text-xs text-red-500 mt-1">
                    {new Date(sale.cancelledAt).toLocaleString('es-AR')}
                  </p>)}
              </div>)}
          </>)}

        <div className="border-t pt-3 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">
            Cerrar
          </button>
        </div>
      </div>
    </div>);
}
