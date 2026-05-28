"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockAlertsPanel = StockAlertsPanel;
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
function StockAlertsPanel(_a) {
    var alerts = _a.alerts, isLoading = _a.isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="bg-white border rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">Alertas de stock</h3>
        <button onClick={function () { return navigate('/inventory'); }} className="text-sm text-blue-600 hover:underline">
          Ver inventario →
        </button>
      </div>

      {isLoading ? (<div className="space-y-2">
          {Array.from({ length: 4 }).map(function (_, i) { return (<div key={i} className="h-12 bg-gray-100 rounded animate-pulse"/>); })}
        </div>) : !(alerts === null || alerts === void 0 ? void 0 : alerts.length) ? (<div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <lucide_react_1.AlertTriangle className="w-8 h-8 mb-2 text-gray-300"/>
          <p className="text-sm">Sin alertas de stock</p>
        </div>) : (<div className="space-y-2">
          {alerts.map(function (alert) { return (<div key={"".concat(alert.productId, "-").concat(alert.storeName)} className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-100">
              <div>
                <p className="text-sm font-medium text-gray-800">{alert.productName}</p>
                <p className="text-xs text-gray-400">{alert.sku} · {alert.storeName}</p>
              </div>
              <div className="text-right">
                <p className={"text-sm font-bold ".concat(alert.currentStock === 0 ? 'text-red-600' : 'text-orange-500')}>
                  {alert.currentStock === 0 ? 'Sin stock' : "".concat(alert.currentStock, " uds")}
                </p>
                <p className="text-xs text-gray-400">mín: {alert.minStock}</p>
              </div>
            </div>); })}
        </div>)}
    </div>);
}
