"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsGrid = StatsGrid;
var lucide_react_1 = require("lucide-react");
var utils_1 = require("../../../lib/utils");
var getCards = function (s) { return [
    {
        label: 'Ventas hoy',
        value: s.todaySales.toString(),
        sub: (0, utils_1.formatCurrency)(s.todayRevenue),
        icon: lucide_react_1.ShoppingCart,
        color: 'blue',
    },
    {
        label: 'Ingresos del mes',
        value: (0, utils_1.formatCurrency)(s.monthRevenue),
        sub: "Semana: ".concat((0, utils_1.formatCurrency)(s.weekRevenue)),
        icon: lucide_react_1.DollarSign,
        color: 'green',
    },
    {
        label: 'Clientes',
        value: s.totalCustomers.toString(),
        sub: "+".concat(s.newCustomersThisMonth, " este mes"),
        icon: lucide_react_1.Users,
        color: 'purple',
    },
    {
        label: 'Alertas de stock',
        value: s.lowStockCount.toString(),
        sub: "".concat(s.outOfStockCount, " sin stock"),
        icon: lucide_react_1.AlertTriangle,
        color: s.lowStockCount > 0 ? 'red' : 'gray',
    },
]; };
var colorMap = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600' },
    red: { bg: 'bg-red-50', icon: 'text-red-600' },
    gray: { bg: 'bg-gray-50', icon: 'text-gray-400' },
};
function StatsGrid(_a) {
    var stats = _a.stats, isLoading = _a.isLoading;
    if (isLoading)
        return (<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map(function (_, i) { return (<div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse"/>); })}
    </div>);
    if (!stats)
        return null;
    return (<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {getCards(stats).map(function (_a) {
            var label = _a.label, value = _a.value, sub = _a.sub, Icon = _a.icon, color = _a.color;
            var _b = colorMap[color], bg = _b.bg, icon = _b.icon;
            return (<div key={label} className="bg-white rounded-xl border shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{label}</span>
              <div className={"p-2 rounded-lg ".concat(bg)}>
                <Icon className={"w-4 h-4 ".concat(icon)}/>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          </div>);
        })}
    </div>);
}
