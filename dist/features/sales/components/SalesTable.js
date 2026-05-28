"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesTable = SalesTable;
var utils_1 = require("../../../lib/utils");
var statusConfig = {
    PENDING: { label: 'Pendiente', className: 'bg-blue-100 text-blue-700' },
    COMPLETED: { label: 'Completada', className: 'bg-green-100 text-green-700' },
    CANCELLED: { label: 'Cancelada', className: 'bg-red-100 text-red-700' },
    REFUNDED: { label: 'Reembolsada', className: 'bg-yellow-100 text-yellow-700' },
};
var methodLabels = {
    CASH: 'Efectivo',
    CARD: 'Tarjeta',
    TRANSFER: 'Transferencia',
    OTHER: 'Otro',
    CARD_DEBIT: 'Débito',
    CARD_CREDIT: 'Crédito',
    QR: 'QR',
};
function SalesTable(_a) {
    var sales = _a.sales, isLoading = _a.isLoading, onView = _a.onView, onCancel = _a.onCancel, pagination = _a.pagination;
    if (isLoading) {
        return (<div className="space-y-2">
        {Array.from({ length: 5 }).map(function (_, i) { return (<div key={i} className="h-12 bg-gray-100 rounded animate-pulse"/>); })}
      </div>);
    }
    if (!sales.length) {
        return <div className="text-center py-12 text-gray-500">No hay ventas registradas</div>;
    }
    var totalPages = Math.max(1, pagination.totalPages);
    return (<div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              {['N° Venta', 'Cliente', 'Items', 'Total', 'Pago', 'Estado', 'Fecha', ''].map(function (h) { return (<th key={h} className="px-4 py-3 text-left">
                  {h}
                </th>); })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sales.map(function (sale) {
            var _a, _b, _c, _d, _e, _f;
            var status = (_a = statusConfig[sale.status]) !== null && _a !== void 0 ? _a : {
                label: sale.status,
                className: 'bg-gray-100 text-gray-700',
            };
            var method = (_c = (_b = sale.payments) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.method;
            return (<tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-medium">{sale.saleNumber}</td>
                  <td className="px-4 py-3">
                    {sale.customer ? ("".concat(sale.customer.firstName, " ").concat(sale.customer.lastName)) : (<span className="text-gray-400">Sin cliente</span>)}
                  </td>
                  <td className="px-4 py-3">{(_e = (_d = sale._count) === null || _d === void 0 ? void 0 : _d.items) !== null && _e !== void 0 ? _e : 0}</td>
                  <td className="px-4 py-3 font-medium">{(0, utils_1.formatCurrency)(sale.total)}</td>
                  <td className="px-4 py-3">{method ? (_f = methodLabels[method]) !== null && _f !== void 0 ? _f : method : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={"px-2 py-1 rounded-full text-xs font-medium ".concat(status.className)}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{(0, utils_1.formatDate)(sale.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={function () { return onView(sale); }} className="text-blue-600 hover:underline text-xs">
                        Ver
                      </button>
                      {(sale.status === 'PENDING' || sale.status === 'COMPLETED') && (<button onClick={function () { return onCancel(sale); }} className="text-red-600 hover:underline text-xs">
                          Cancelar
                        </button>)}
                    </div>
                  </td>
                </tr>);
        })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (<div className="flex justify-end gap-2">
          {Array.from({ length: totalPages }).map(function (_, i) { return (<button key={i} onClick={function () { return pagination.onPageChange(i + 1); }} className={"px-3 py-1 rounded text-sm ".concat(pagination.page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100')}>
              {i + 1}
            </button>); })}
        </div>)}
    </div>);
}
