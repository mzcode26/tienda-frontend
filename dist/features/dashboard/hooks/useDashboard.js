"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStockAlerts = exports.useRecentSales = exports.useDashboardStats = void 0;
var react_query_1 = require("@tanstack/react-query");
var dashboard_service_1 = require("../services/dashboard.service");
var useDashboardStats = function () {
    return (0, react_query_1.useQuery)({
        queryKey: ['dashboard', 'stats'],
        queryFn: dashboard_service_1.dashboardService.getStats,
        refetchInterval: 60000, // refresca cada 1 minuto
    });
};
exports.useDashboardStats = useDashboardStats;
var useRecentSales = function (limit) {
    if (limit === void 0) { limit = 5; }
    return (0, react_query_1.useQuery)({
        queryKey: ['dashboard', 'recent-sales', limit],
        queryFn: function () { return dashboard_service_1.dashboardService.getRecentSales(limit); },
        refetchInterval: 60000,
    });
};
exports.useRecentSales = useRecentSales;
var useStockAlerts = function (limit) {
    if (limit === void 0) { limit = 5; }
    return (0, react_query_1.useQuery)({
        queryKey: ['dashboard', 'stock-alerts', limit],
        queryFn: function () { return dashboard_service_1.dashboardService.getStockAlerts(limit); },
        refetchInterval: 60000,
    });
};
exports.useStockAlerts = useStockAlerts;
