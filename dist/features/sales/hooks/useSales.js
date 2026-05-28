"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCancelSale = exports.useCreateSale = exports.usePOSSearch = exports.useSale = exports.useSales = void 0;
var react_query_1 = require("@tanstack/react-query");
var sales_service_1 = require("../services/sales.service");
var useSales = function (filters) {
    return (0, react_query_1.useQuery)({
        queryKey: ['sales', filters],
        queryFn: function () { return sales_service_1.salesService.getSales(filters); },
    });
};
exports.useSales = useSales;
var useSale = function (id) {
    return (0, react_query_1.useQuery)({
        queryKey: ['sales', id],
        queryFn: function () { return sales_service_1.salesService.getSaleById(id); },
        enabled: !!id,
    });
};
exports.useSale = useSale;
var usePOSSearch = function (query, storeId) {
    return (0, react_query_1.useQuery)({
        queryKey: ['pos', 'search', query, storeId],
        queryFn: function () { return sales_service_1.salesService.searchPOSProducts(query, storeId); },
        enabled: query.length > 1 && !!storeId,
    });
};
exports.usePOSSearch = usePOSSearch;
var useCreateSale = function () {
    var qc = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: sales_service_1.salesService.createSale,
        onSuccess: function () { return qc.invalidateQueries({ queryKey: ['sales'] }); },
    });
};
exports.useCreateSale = useCreateSale;
var useCancelSale = function () {
    var qc = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var id = _a.id, reason = _a.reason;
            return sales_service_1.salesService.cancelSale(id, reason);
        },
        onSuccess: function () { return qc.invalidateQueries({ queryKey: ['sales'] }); },
    });
};
exports.useCancelSale = useCancelSale;
