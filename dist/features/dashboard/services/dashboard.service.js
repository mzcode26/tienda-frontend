"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
var axios_1 = require("../../../lib/axios");
exports.dashboardService = {
    getStats: function () {
        return axios_1.default.get('/dashboard/stats').then(function (r) { return r.data; });
    },
    getRecentSales: function (limit) {
        if (limit === void 0) { limit = 5; }
        return axios_1.default.get('/dashboard/recent-sales', { params: { limit: limit } }).then(function (r) { return r.data; });
    },
    getStockAlerts: function (limit) {
        if (limit === void 0) { limit = 5; }
        return axios_1.default.get('/dashboard/stock-alerts', { params: { limit: limit } }).then(function (r) { return r.data; });
    },
};
