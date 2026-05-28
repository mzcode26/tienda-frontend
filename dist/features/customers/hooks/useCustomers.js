"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteCustomer = exports.useUpdateCustomer = exports.useCreateCustomer = exports.useCustomerStats = exports.useCustomer = exports.useCustomers = void 0;
var react_query_1 = require("@tanstack/react-query");
var customers_service_1 = require("../services/customers.service");
var useCustomers = function (filters) {
    return (0, react_query_1.useQuery)({
        queryKey: ['customers', filters],
        queryFn: function () { return customers_service_1.customersService.getCustomers(filters); },
    });
};
exports.useCustomers = useCustomers;
var useCustomer = function (id, enabled) {
    if (enabled === void 0) { enabled = true; }
    return (0, react_query_1.useQuery)({
        queryKey: ['customers', id],
        queryFn: function () { return customers_service_1.customersService.getCustomerById(id); },
        enabled: enabled && !!id,
    });
};
exports.useCustomer = useCustomer;
var useCustomerStats = function (id, enabled) {
    if (enabled === void 0) { enabled = true; }
    return (0, react_query_1.useQuery)({
        queryKey: ['customers', id, 'stats'],
        queryFn: function () { return customers_service_1.customersService.getCustomerStats(id); },
        enabled: enabled && !!id,
    });
};
exports.useCustomerStats = useCustomerStats;
var useCreateCustomer = function () {
    var qc = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: customers_service_1.customersService.createCustomer,
        onSuccess: function () { return qc.invalidateQueries({ queryKey: ['customers'] }); },
    });
};
exports.useCreateCustomer = useCreateCustomer;
var useUpdateCustomer = function () {
    var qc = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var id = _a.id, data = _a.data;
            return customers_service_1.customersService.updateCustomer(id, data);
        },
        onSuccess: function () { return qc.invalidateQueries({ queryKey: ['customers'] }); },
    });
};
exports.useUpdateCustomer = useUpdateCustomer;
var useDeleteCustomer = function () {
    var qc = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: customers_service_1.customersService.deleteCustomer,
        onSuccess: function () { return qc.invalidateQueries({ queryKey: ['customers'] }); },
    });
};
exports.useDeleteCustomer = useDeleteCustomer;
