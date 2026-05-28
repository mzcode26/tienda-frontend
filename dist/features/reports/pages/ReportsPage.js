"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReportsPage;
var react_1 = require("react");
var useReports_1 = require("../hooks/useReports");
var SummaryCards_1 = require("../components/SummaryCards");
var SalesChart_1 = require("../components/SalesChart");
var TopProductsTable_1 = require("../components/TopProductsTable");
var TopCustomersTable_1 = require("../components/TopCustomersTable");
var PERIODS = [
    { label: 'Hoy', value: 'today' },
    { label: 'Semana', value: 'week' },
    { label: 'Mes', value: 'month' },
    { label: 'Trimestre', value: 'quarter' },
    { label: 'Año', value: 'year' },
];
var buildRange = function (period) {
    var now = new Date();
    var startOfDay = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).toISOString();
    };
    var endOfDay = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999).toISOString();
    };
    var subtractDays = function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    };
    switch (period) {
        case 'today':
            return { dateFrom: startOfDay(now), dateTo: endOfDay(now) };
        case 'week':
            return { dateFrom: startOfDay(subtractDays(now, 6)), dateTo: endOfDay(now) };
        case 'month':
            return { dateFrom: startOfDay(subtractDays(now, 29)), dateTo: endOfDay(now) };
        case 'quarter':
            return { dateFrom: startOfDay(subtractDays(now, 89)), dateTo: endOfDay(now) };
        case 'year':
            return { dateFrom: startOfDay(subtractDays(now, 364)), dateTo: endOfDay(now) };
        default:
            return {};
    }
};
function ReportsPage() {
    var _a = (0, react_1.useState)('month'), period = _a[0], setPeriod = _a[1];
    var chartFilters = (0, react_1.useMemo)(function () {
        var range = buildRange(period);
        return __assign({ period: period }, range);
    }, [period]);
    var summaryFilters = (0, react_1.useMemo)(function () { return ({ period: period }); }, [period]);
    var _b = (0, useReports_1.useSalesSummary)(summaryFilters), summary = _b.data, loadingSummary = _b.isLoading;
    var _c = (0, useReports_1.useSalesByDay)(chartFilters), byDay = _c.data, loadingByDay = _c.isLoading;
    var _d = (0, useReports_1.useTopProducts)(chartFilters), topProducts = _d.data, loadingProducts = _d.isLoading;
    var _e = (0, useReports_1.useTopCustomers)(chartFilters), topCustomers = _e.data, loadingCustomers = _e.isLoading;
    return (<div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h1 className="text-2xl font-bold">Reportes</h1>
          <p className="text-sm text-gray-500">El período seleccionado afecta el gráfico y los rankings.</p>
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
          {PERIODS.map(function (_a) {
            var label = _a.label, value = _a.value;
            return (<button key={value} onClick={function () { return setPeriod(value); }} className={"px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ".concat(period === value
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700')}>
              {label}
            </button>);
        })}
        </div>
      </div>

      <SummaryCards_1.SummaryCards summary={summary === null || summary === void 0 ? void 0 : summary.data} isLoading={loadingSummary}/>

      <SalesChart_1.SalesChart data={byDay === null || byDay === void 0 ? void 0 : byDay.data} isLoading={loadingByDay}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsTable_1.TopProductsTable data={topProducts === null || topProducts === void 0 ? void 0 : topProducts.data} isLoading={loadingProducts}/>
        <TopCustomersTable_1.TopCustomersTable data={topCustomers === null || topCustomers === void 0 ? void 0 : topCustomers.data} isLoading={loadingCustomers}/>
      </div>
    </div>);
}
