"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersTable = CustomersTable;
var utils_1 = require("../../../lib/utils");
function CustomersTable(_a) {
    var customers = _a.customers, isLoading = _a.isLoading, onEdit = _a.onEdit, onDelete = _a.onDelete, onView = _a.onView, pagination = _a.pagination;
    if (isLoading) {
        return (<div className="space-y-2">
        {Array.from({ length: 5 }).map(function (_, i) { return (<div key={i} className="h-12 bg-gray-100 rounded animate-pulse"/>); })}
      </div>);
    }
    if (!customers.length) {
        return <div className="text-center py-12 text-gray-500">No hay clientes registrados</div>;
    }
    var totalPages = Math.max(1, pagination.totalPages);
    return (<div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              {['Nombre', 'Email', 'Teléfono', 'Ciudad', 'Ventas', 'Estado', ''].map(function (h) { return (<th key={h} className="px-4 py-3 text-left">
                  {h}
                </th>); })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map(function (customer) {
            var _a, _b, _c, _d, _e;
            return (<tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">
                  {customer.firstName} {customer.lastName}
                  <div className="text-xs text-gray-400">{(0, utils_1.formatDate)(customer.createdAt)}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">{(_a = customer.email) !== null && _a !== void 0 ? _a : '—'}</td>
                <td className="px-4 py-3 text-gray-600">{(_b = customer.phone) !== null && _b !== void 0 ? _b : '—'}</td>
                <td className="px-4 py-3 text-gray-600">{(_c = customer.city) !== null && _c !== void 0 ? _c : '—'}</td>
                <td className="px-4 py-3">{(_e = (_d = customer._count) === null || _d === void 0 ? void 0 : _d.sales) !== null && _e !== void 0 ? _e : 0}</td>
                <td className="px-4 py-3">
                  <span className={"px-2 py-1 rounded-full text-xs font-medium ".concat(customer.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600')}>
                    {customer.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={function () { return onView(customer); }} className="text-blue-600 hover:underline text-xs">
                      Ver
                    </button>
                    <button onClick={function () { return onEdit(customer); }} className="text-gray-600 hover:underline text-xs">
                      Editar
                    </button>
                    <button onClick={function () { return onDelete(customer); }} className="text-red-600 hover:underline text-xs">
                      Eliminar
                    </button>
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
