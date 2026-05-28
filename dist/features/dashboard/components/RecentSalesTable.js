"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentSalesTable = RecentSalesTable;
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("../../../lib/utils");
var statusStyles = {
    COMPLETED: 'bg-green-100 text-green-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    CANCELLED: 'bg-red-100 text-red-600',
};
var statusLabels = {
    COMPLETED: 'Completada',
    PENDING: 'Pendiente',
    CANCELLED: 'Cancelada',
};
function RecentSalesTable(_a) {
    var sales = _a.sales, isLoading = _a.isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="bg-white border rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">Ventas recientes</h3>
        <button onClick={function () { return navigate('/sales'); }} className="text-sm text-blue-600 hover:underline">
          Ver todas →
        </button>
      </div>

      {isLoading ? (<div className="space-y-2">
          {Array.from({ length: 5 }).map(function (_, i) { return (<div key={i} className="h-10 bg-gray-100 rounded animate-pulse"/>); })}
        </div>) : !(sales === null || sales === void 0 ? void 0 : sales.length) ? (<p className="text-gray-400 text-sm text-center py-8">Sin ventas recientes</p>) : (<table className="w-full text-sm">
          <thead className="text-xs text-gray-500 uppercase border-b">
            <tr>
              <th className="pb-2 text-left">N° Venta</th>
              <th className="pb-2 text-left">Cliente</th>
              <th className="pb-2 text-right">Total</th>
              <th className="pb-2 text-left">Estado</th>
              <th className="pb-2 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sales.map(function (sale) {
                var _a, _b, _c;
                return (<tr key={sale.id} className="hover:bg-gray-50">
                <td className="py-2 font-mono text-xs">{sale.saleNumber}</td>
                <td className="py-2 text-gray-600">{(_a = sale.customerName) !== null && _a !== void 0 ? _a : 'Consumidor final'}</td>
                <td className="py-2 text-right font-medium">{(0, utils_1.formatCurrency)(sale.total)}</td>
                <td className="py-2">
                  <span className={"px-2 py-0.5 rounded-full text-xs font-medium ".concat((_b = statusStyles[sale.status]) !== null && _b !== void 0 ? _b : 'bg-gray-100 text-gray-600')}>
                    {(_c = statusLabels[sale.status]) !== null && _c !== void 0 ? _c : sale.status}
                  </span>
                </td>
                <td className="py-2 text-gray-400 text-xs">{(0, utils_1.formatDate)(sale.createdAt)}</td>
              </tr>);
            })}
          </tbody>
        </table>)}
    </div>);
}
