"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTopCustomers = exports.useTopProducts = exports.useSalesByDay = exports.useSalesSummary = void 0;
var react_query_1 = require("@tanstack/react-query");
var reports_service_1 = require("../services/reports.service");
var useSalesSummary = function (filters) {
    return (0, react_query_1.useQuery)({
        queryKey: ['reports', 'dashboard', filters],
        queryFn: function () { return reports_service_1.reportsService.getDashboardSummary(filters); },
    });
};
exports.useSalesSummary = useSalesSummary;
var useSalesByDay = function (filters) {
    return (0, react_query_1.useQuery)({
        queryKey: ['reports', 'sales-over-time', filters],
        queryFn: function () { return reports_service_1.reportsService.getSalesByDay(filters); },
    });
};
exports.useSalesByDay = useSalesByDay;
var useTopProducts = function (filters) {
    return (0, react_query_1.useQuery)({
        queryKey: ['reports', 'top-products', filters],
        queryFn: function () { return reports_service_1.reportsService.getTopProducts(filters); },
    });
};
exports.useTopProducts = useTopProducts;
var useTopCustomers = function (filters) {
    return (0, react_query_1.useQuery)({
        queryKey: ['reports', 'top-customers', filters],
        queryFn: function () { return reports_service_1.reportsService.getTopCustomers(filters); },
    });
};
exports.useTopCustomers = useTopCustomers;
