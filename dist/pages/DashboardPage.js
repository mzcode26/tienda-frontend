"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
var useDashboard_1 = require("../features/dashboard/hooks/useDashboard");
var StatsGrid_1 = require("../features/dashboard/components/StatsGrid");
var RecentSalesTable_1 = require("../features/dashboard/components/RecentSalesTable");
var StockAlertsPanel_1 = require("../features/dashboard/components/StockAlertsPanel");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
function DashboardPage() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, useDashboard_1.useDashboardStats)(), statsData = _a.data, loadingStats = _a.isLoading;
    var _b = (0, useDashboard_1.useRecentSales)(5), salesData = _b.data, loadingSales = _b.isLoading;
    var _c = (0, useDashboard_1.useStockAlerts)(5), alertsData = _c.data, loadingAlerts = _c.isLoading;
    return (<div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button onClick={function () { return navigate('/pos'); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
          <lucide_react_1.ShoppingBag className="w-4 h-4"/>
          Ir al POS
        </button>
      </div>

      {/* Stats */}
      <StatsGrid_1.StatsGrid stats={statsData === null || statsData === void 0 ? void 0 : statsData.data} isLoading={loadingStats}/>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentSalesTable_1.RecentSalesTable sales={salesData === null || salesData === void 0 ? void 0 : salesData.data} isLoading={loadingSales}/>
        </div>
        <div>
          <StockAlertsPanel_1.StockAlertsPanel alerts={alertsData === null || alertsData === void 0 ? void 0 : alertsData.data} isLoading={loadingAlerts}/>
        </div>
      </div>
    </div>);
}
