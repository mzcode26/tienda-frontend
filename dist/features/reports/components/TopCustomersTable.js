"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopCustomersTable = TopCustomersTable;
var utils_1 = require("../../../lib/utils");
function TopCustomersTable(_a) {
    var data = _a.data, isLoading = _a.isLoading;
    if (isLoading)
        return <div className="h-48 bg-gray-100 rounded-xl animate-pulse"/>;
    return (<div className="bg-white border rounded-xl p-4">
      <h3 className="font-semibold text-gray-700 mb-4">Top Clientes</h3>
      {!(data === null || data === void 0 ? void 0 : data.length) ? (<p className="text-gray-400 text-sm text-center py-8">Sin datos</p>) : (<table className="w-full text-sm">
          <thead className="text-xs text-gray-500 uppercase border-b">
            <tr>
              <th className="pb-2 text-left">#</th>
              <th className="pb-2 text-left">Cliente</th>
              <th className="pb-2 text-left">Email</th>
              <th className="pb-2 text-right">Compras</th>
              <th className="pb-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map(function (customer, index) { return (<tr key={customer.customerId} className="hover:bg-gray-50">
                <td className="py-2 text-gray-400">{index + 1}</td>
                <td className="py-2">
                  <div className="font-medium">{customer.fullName}</div>
                </td>
                <td className="py-2 text-gray-500">{customer.email}</td>
                <td className="py-2 text-right">{customer.totalOrders}</td>
                <td className="py-2 text-right font-medium">{(0, utils_1.formatCurrency)(customer.totalSpent)}</td>
              </tr>); })}
          </tbody>
        </table>)}
    </div>);
}
