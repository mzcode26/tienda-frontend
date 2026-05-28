"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDetailModal = CustomerDetailModal;
var useCustomers_1 = require("../hooks/useCustomers");
var utils_1 = require("../../../lib/utils");
var EmptyState = function (_a) {
    var text = _a.text;
    return <p className="text-gray-400 text-sm">{text}</p>;
};
function CustomerDetailModal(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    var customer = _a.customer, isOpen = _a.isOpen, onClose = _a.onClose, onEdit = _a.onEdit;
    var customerId = (_b = customer === null || customer === void 0 ? void 0 : customer.id) !== null && _b !== void 0 ? _b : '';
    var _s = (0, useCustomers_1.useCustomer)(customerId, isOpen), customerData = _s.data, isCustomerLoading = _s.isLoading;
    var _t = (0, useCustomers_1.useCustomerStats)(customerId, isOpen), stats = _t.data, isStatsLoading = _t.isLoading;
    if (!isOpen || !customer)
        return null;
    var detail = (customerData !== null && customerData !== void 0 ? customerData : customer);
    var sales = (_c = detail.sales) !== null && _c !== void 0 ? _c : [];
    var totalSpent = (_d = stats === null || stats === void 0 ? void 0 : stats.totalSpent) !== null && _d !== void 0 ? _d : 0;
    var totalPurchases = (_g = (_e = stats === null || stats === void 0 ? void 0 : stats.totalPurchases) !== null && _e !== void 0 ? _e : (_f = detail._count) === null || _f === void 0 ? void 0 : _f.sales) !== null && _g !== void 0 ? _g : sales.length;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-lg font-bold">
              {detail.firstName} {detail.lastName}
            </h2>
            <p className="text-xs text-gray-500">Detalle del cliente</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ✕
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Compras</p>
              <p className="mt-1 text-2xl font-semibold">{isStatsLoading ? '—' : totalPurchases}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Total gastado</p>
              <p className="mt-1 text-2xl font-semibold">{isStatsLoading ? '—' : (0, utils_1.formatCurrency)(totalSpent)}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Promedio</p>
              <p className="mt-1 text-2xl font-semibold">
                {isStatsLoading ? '—' : (0, utils_1.formatCurrency)((_h = stats === null || stats === void 0 ? void 0 : stats.averageOrderValue) !== null && _h !== void 0 ? _h : 0)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-sm">
            <div>
              <span className="text-gray-500">Email:</span> <span className="ml-1">{(_j = detail.email) !== null && _j !== void 0 ? _j : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Teléfono:</span> <span className="ml-1">{(_k = detail.phone) !== null && _k !== void 0 ? _k : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Ciudad:</span> <span className="ml-1">{(_l = detail.city) !== null && _l !== void 0 ? _l : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Provincia:</span> <span className="ml-1">{(_m = detail.province) !== null && _m !== void 0 ? _m : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Dirección:</span> <span className="ml-1">{(_o = detail.address) !== null && _o !== void 0 ? _o : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Código postal:</span> <span className="ml-1">{(_p = detail.postalCode) !== null && _p !== void 0 ? _p : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Tax ID:</span> <span className="ml-1">{(_q = detail.taxId) !== null && _q !== void 0 ? _q : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Nacimiento:</span>{' '}
              <span className="ml-1">{detail.birthDate ? (0, utils_1.formatDate)(detail.birthDate) : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Género:</span> <span className="ml-1">{(_r = detail.gender) !== null && _r !== void 0 ? _r : '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">Estado:</span>{' '}
              <span className="ml-1">{detail.isActive ? 'Activo' : 'Inactivo'}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-700">Historial de compras</h3>
            {isCustomerLoading ? (<div className="space-y-2">
                {Array.from({ length: 3 }).map(function (_, i) { return (<div key={i} className="h-10 animate-pulse rounded bg-gray-100"/>); })}
              </div>) : sales.length === 0 ? (<EmptyState text="Sin compras registradas"/>) : (<div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-3 py-2 text-left">N° Venta</th>
                      <th className="px-3 py-2 text-left">Total</th>
                      <th className="px-3 py-2 text-left">Estado</th>
                      <th className="px-3 py-2 text-left">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sales.map(function (sale) { return (<tr key={sale.id}>
                        <td className="px-3 py-2 font-mono">{sale.saleNumber}</td>
                        <td className="px-3 py-2 font-medium">{(0, utils_1.formatCurrency)(sale.total)}</td>
                        <td className="px-3 py-2">{sale.status}</td>
                        <td className="px-3 py-2 text-gray-500">{(0, utils_1.formatDate)(sale.createdAt)}</td>
                      </tr>); })}
                  </tbody>
                </table>
              </div>)}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t p-6">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
            Cerrar
          </button>
          <button onClick={function () {
            onEdit(detail);
            onClose();
        }} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            Editar
          </button>
        </div>
      </div>
    </div>);
}
