"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryCards = SummaryCards;
var lucide_react_1 = require("lucide-react");
var utils_1 = require("../../../lib/utils");
var colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
};
var cards = function (summary) { return [
    {
        label: 'Ventas de hoy',
        value: summary.today.sales.toString(),
        icon: lucide_react_1.ShoppingCart,
        color: 'blue',
    },
    {
        label: 'Ingresos de hoy',
        value: (0, utils_1.formatCurrency)(summary.today.revenue),
        icon: lucide_react_1.DollarSign,
        color: 'green',
    },
    {
        label: 'Ingresos del mes',
        value: (0, utils_1.formatCurrency)(summary.currentMonth.revenue),
        helper: "Crecimiento ".concat(summary.currentMonth.revenueGrowth >= 0 ? '+' : '').concat(summary.currentMonth.revenueGrowth.toFixed(2), "% vs mes anterior"),
        icon: lucide_react_1.ArrowUpRight,
        color: 'purple',
    },
    {
        label: 'Alertas de stock',
        value: summary.lowStockAlerts.toString(),
        icon: lucide_react_1.AlertTriangle,
        color: 'orange',
    },
]; };
function SummaryCards(_a) {
    var summary = _a.summary, isLoading = _a.isLoading;
    if (isLoading) {
        return (<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map(function (_, i) { return (<div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse"/>); })}
      </div>);
    }
    if (!summary)
        return null;
    return (<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards(summary).map(function (_a) {
            var label = _a.label, value = _a.value, helper = _a.helper, Icon = _a.icon, color = _a.color;
            return (<div key={label} className="bg-white rounded-xl p-4 border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{label}</span>
            <div className={"p-2 rounded-lg ".concat(colorMap[color])}>
              <Icon className="w-4 h-4"/>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {helper ? <p className="mt-1 text-xs text-gray-400">{helper}</p> : null}
        </div>);
        })}
    </div>);
}
