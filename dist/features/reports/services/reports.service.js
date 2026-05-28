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
exports.reportsService = void 0;
var axios_1 = require("../../../lib/axios");
var toNumber = function (value) { return Number(value !== null && value !== void 0 ? value : 0); };
var getDateRange = function (period, filters) {
    var now = new Date();
    var startOfDay = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    };
    var endOfDay = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    };
    var subtractDays = function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    };
    var dateFrom;
    var dateTo;
    var groupBy = 'DAY';
    switch (period) {
        case 'today':
            dateFrom = startOfDay(now);
            dateTo = endOfDay(now);
            groupBy = 'DAY';
            break;
        case 'week':
            dateFrom = startOfDay(subtractDays(now, 6));
            dateTo = endOfDay(now);
            groupBy = 'DAY';
            break;
        case 'month':
            dateFrom = startOfDay(subtractDays(now, 29));
            dateTo = endOfDay(now);
            groupBy = 'DAY';
            break;
        case 'quarter':
            dateFrom = startOfDay(subtractDays(now, 89));
            dateTo = endOfDay(now);
            groupBy = 'WEEK';
            break;
        case 'year':
            dateFrom = startOfDay(subtractDays(now, 364));
            dateTo = endOfDay(now);
            groupBy = 'MONTH';
            break;
        case 'custom':
            if (filters === null || filters === void 0 ? void 0 : filters.startDate)
                dateFrom = startOfDay(new Date(filters.startDate));
            if (filters === null || filters === void 0 ? void 0 : filters.endDate)
                dateTo = endOfDay(new Date(filters.endDate));
            groupBy = 'DAY';
            break;
    }
    return {
        dateFrom: dateFrom === null || dateFrom === void 0 ? void 0 : dateFrom.toISOString(),
        dateTo: dateTo === null || dateTo === void 0 ? void 0 : dateTo.toISOString(),
        groupBy: groupBy,
    };
};
var buildCommonParams = function (filters) {
    var _a;
    var period = (_a = filters === null || filters === void 0 ? void 0 : filters.period) !== null && _a !== void 0 ? _a : 'month';
    var _b = getDateRange(period, filters), dateFrom = _b.dateFrom, dateTo = _b.dateTo, groupBy = _b.groupBy;
    return __assign(__assign(__assign(__assign({}, ((filters === null || filters === void 0 ? void 0 : filters.storeId) ? { storeId: filters.storeId } : {})), (dateFrom ? { dateFrom: dateFrom } : {})), (dateTo ? { dateTo: dateTo } : {})), { groupBy: groupBy });
};
exports.reportsService = {
    getDashboardSummary: function (filters) {
        return axios_1.default.get('/reports/dashboard', {
            params: (filters === null || filters === void 0 ? void 0 : filters.storeId) ? { storeId: filters.storeId } : undefined,
        }).then(function (r) { return r.data; });
    },
    getSalesByDay: function (filters) {
        return axios_1.default.get('/reports/sales-over-time', {
            params: buildCommonParams(filters),
        }).then(function (r) { return (__assign(__assign({}, r.data), { data: r.data.data.map(function (row) { return ({
                period: row.period,
                totalSales: toNumber(row.total_sales),
                totalRevenue: toNumber(row.total_revenue),
            }); }) })); });
    },
    getTopProducts: function (filters) {
        return axios_1.default.get('/reports/top-products', {
            params: buildCommonParams(filters),
        }).then(function (r) { return (__assign(__assign({}, r.data), { data: r.data.data.map(function (row) { return ({
                productId: row.product_id,
                productName: row.product_name,
                variantSku: row.variant_sku,
                totalQuantity: toNumber(row.total_quantity),
                totalRevenue: toNumber(row.total_revenue),
            }); }) })); });
    },
    getTopCustomers: function (filters) {
        return axios_1.default.get('/reports/top-customers', {
            params: buildCommonParams(filters),
        }).then(function (r) { return (__assign(__assign({}, r.data), { data: r.data.data.map(function (row) { return ({
                customerId: row.customer_id,
                fullName: row.full_name,
                email: row.email,
                totalOrders: toNumber(row.total_orders),
                totalSpent: toNumber(row.total_spent),
            }); }) })); });
    },
};
