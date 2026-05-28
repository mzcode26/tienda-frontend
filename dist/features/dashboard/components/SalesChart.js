"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesChart = void 0;
var recharts_1 = require("recharts");
var utils_1 = require("../../../lib/utils");
var SalesChart = function (_a) {
    var data = _a.data;
    return (<div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas por Día</h3>
      <div className="h-80">
        <recharts_1.ResponsiveContainer width="100%" height="100%">
          <recharts_1.LineChart data={data}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={function (value) { return new Date(value).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' }); }}/>
            <recharts_1.YAxis tick={{ fontSize: 12 }} tickFormatter={function (value) { return (0, utils_1.formatCurrency)(value); }}/>
            <recharts_1.Tooltip formatter={function (value) { return [(0, utils_1.formatCurrency)(value), 'Ingresos']; }} labelFormatter={function (label) { return "Fecha: ".concat(new Date(label).toLocaleDateString('es-AR')); }}/>
            <recharts_1.Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}/>
          </recharts_1.LineChart>
        </recharts_1.ResponsiveContainer>
      </div>
    </div>);
};
exports.SalesChart = SalesChart;
