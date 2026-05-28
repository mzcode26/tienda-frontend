"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricCard = void 0;
var utils_1 = require("../../../lib/utils");
var MetricCard = function (_a) {
    var title = _a.title, value = _a.value, Icon = _a.icon, trend = _a.trend, className = _a.className;
    return (<div className={(0, utils_1.cn)('bg-white p-6 rounded-lg shadow-sm border', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (<p className={(0, utils_1.cn)('text-sm mt-1', trend.isPositive ? 'text-green-600' : 'text-red-600')}>
              {trend.isPositive ? '+' : ''}{trend.value}% vs mes anterior
            </p>)}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="h-6 w-6 text-blue-600"/>
        </div>
      </div>
    </div>);
};
exports.MetricCard = MetricCard;
