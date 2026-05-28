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
exports.default = SalesPage;
var react_1 = require("react");
var useSales_1 = require("../hooks/useSales");
var SalesTable_1 = require("../components/SalesTable");
var SaleFilters_1 = require("../components/SaleFilters");
var SaleDetailModal_1 = require("../components/SaleDetailModal");
var sonner_1 = require("sonner");
function SalesPage() {
    var _a, _b, _c, _d;
    var _e = (0, react_1.useState)({ page: 1, limit: 20 }), filters = _e[0], setFilters = _e[1];
    var _f = (0, react_1.useState)(null), selectedSaleId = _f[0], setSelectedSaleId = _f[1];
    var _g = (0, useSales_1.useSales)(filters), data = _g.data, isLoading = _g.isLoading;
    var cancelSale = (0, useSales_1.useCancelSale)();
    var handleCancel = function (sale) {
        var reason = prompt('Motivo de cancelación:');
        if (!reason)
            return;
        cancelSale.mutate({ id: sale.id, reason: reason }, {
            onSuccess: function () { return sonner_1.toast.success('Venta cancelada'); },
            onError: function () { return sonner_1.toast.error('Error al cancelar'); },
        });
    };
    return (<div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ventas</h1>
      </div>

      <SaleFilters_1.SaleFilters filters={filters} onChange={setFilters}/>

      <SalesTable_1.SalesTable sales={(_a = data === null || data === void 0 ? void 0 : data.items) !== null && _a !== void 0 ? _a : []} isLoading={isLoading} onView={function (sale) { return setSelectedSaleId(sale.id); }} onCancel={handleCancel} pagination={{
            page: (_c = (_b = data === null || data === void 0 ? void 0 : data.page) !== null && _b !== void 0 ? _b : filters.page) !== null && _c !== void 0 ? _c : 1,
            totalPages: (_d = data === null || data === void 0 ? void 0 : data.totalPages) !== null && _d !== void 0 ? _d : 1,
            onPageChange: function (p) { return setFilters(function (f) { return (__assign(__assign({}, f), { page: p })); }); },
        }}/>

      <SaleDetailModal_1.SaleDetailModal saleId={selectedSaleId} isOpen={!!selectedSaleId} onClose={function () { return setSelectedSaleId(null); }}/>
    </div>);
}
