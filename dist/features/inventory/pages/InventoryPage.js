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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InventoryPage;
var react_1 = require("react");
var useSettings_1 = require("../../settings/hooks/useSettings");
var useProducts_1 = require("../../products/hooks/useProducts");
var useInventory_1 = require("../hooks/useInventory");
var InventoryFilters_1 = require("../components/InventoryFilters");
var LowStockBanner_1 = require("../components/LowStockBanner");
var AdjustStockModal_1 = require("../components/AdjustStockModal");
var TransferStockModal_1 = require("../components/TransferStockModal");
var MovementsModal_1 = require("../components/MovementsModal");
var InitialStockModal_1 = require("../components/InitialStockModal");
var InventoryProductsTable_1 = require("../../../shared/InventoryProductsTable");
var StoreSelector_1 = require("../../../shared/StoreSelector");
function InventoryPage() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var _u = (0, useSettings_1.useStores)(false), _v = _u.data, stores = _v === void 0 ? [] : _v, storesLoading = _u.isLoading;
    var _w = (0, useProducts_1.useProducts)({
        isActive: true,
        page: 1,
        limit: 200,
    }), productsResponse = _w.data, productsLoading = _w.isLoading;
    var products = (_a = productsResponse === null || productsResponse === void 0 ? void 0 : productsResponse.items) !== null && _a !== void 0 ? _a : [];
    var activeStores = (0, react_1.useMemo)(function () { return stores.filter(function (store) { return store.isActive; }); }, [stores]);
    var _x = (0, react_1.useState)(''), selectedStoreId = _x[0], setSelectedStoreId = _x[1];
    var _y = (0, react_1.useState)({
        storeId: undefined,
        search: '',
        lowStock: false,
        outOfStock: false,
        page: 1,
        limit: 10,
    }), filters = _y[0], setFilters = _y[1];
    var _z = (0, react_1.useState)(null), selectedItem = _z[0], setSelectedItem = _z[1];
    var _0 = (0, react_1.useState)(false), adjustModalOpen = _0[0], setAdjustModalOpen = _0[1];
    var _1 = (0, react_1.useState)(false), transferModalOpen = _1[0], setTransferModalOpen = _1[1];
    var _2 = (0, react_1.useState)(false), movementsModalOpen = _2[0], setMovementsModalOpen = _2[1];
    var _3 = (0, react_1.useState)(false), settingsModalOpen = _3[0], setSettingsModalOpen = _3[1];
    var _4 = (0, react_1.useState)(false), initialStockModalOpen = _4[0], setInitialStockModalOpen = _4[1];
    (0, react_1.useEffect)(function () {
        if (!selectedStoreId && activeStores.length > 0) {
            setSelectedStoreId(activeStores[0].id);
        }
    }, [activeStores, selectedStoreId]);
    (0, react_1.useEffect)(function () {
        setFilters(function (prev) { return (__assign(__assign({}, prev), { storeId: selectedStoreId || undefined })); });
    }, [selectedStoreId]);
    var _5 = (0, useInventory_1.useInventoryByStore)(selectedStoreId, Boolean(selectedStoreId)), _6 = _5.data, inventoryItems = _6 === void 0 ? [] : _6, inventoryLoading = _5.isLoading, inventoryFetching = _5.isFetching;
    var _7 = (0, useInventory_1.useLowStock)(Boolean(selectedStoreId)), _8 = _7.data, lowStockItems = _8 === void 0 ? [] : _8, lowStockLoading = _7.isLoading;
    var selectedItemDetail = (0, useInventory_1.useInventoryItem)((_b = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.storeId) !== null && _b !== void 0 ? _b : '', (_c = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.variantId) !== null && _c !== void 0 ? _c : '', movementsModalOpen && Boolean(selectedItem)).data;
    var _9 = (0, useInventory_1.useInventoryMovements)(selectedItem
        ? {
            storeId: selectedItem.storeId,
            variantId: selectedItem.variantId,
            page: 1,
            limit: 50,
        }
        : undefined, movementsModalOpen && Boolean(selectedItem)), movementResponse = _9.data, movementsLoading = _9.isLoading;
    var adjustStockMutation = (0, useInventory_1.useAdjustStock)();
    var initialStockMutation = (0, useInventory_1.useInitialStock)();
    var transferStockMutation = (0, useInventory_1.useTransferStock)();
    var updateInventorySettingsMutation = (0, useInventory_1.useUpdateInventorySettings)();
    var filteredItems = (0, react_1.useMemo)(function () {
        var _a;
        var result = __spreadArray([], inventoryItems, true);
        if ((_a = filters.search) === null || _a === void 0 ? void 0 : _a.trim()) {
            var q_1 = filters.search.trim().toLowerCase();
            result = result.filter(function (item) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                var productName = (_e = (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.productName) !== null && _b !== void 0 ? _b : (_d = (_c = item.variant) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : '';
                var variantName = (_j = (_g = (_f = item.variant) === null || _f === void 0 ? void 0 : _f.variantName) !== null && _g !== void 0 ? _g : (_h = item.variant) === null || _h === void 0 ? void 0 : _h.name) !== null && _j !== void 0 ? _j : '';
                var sku = (_l = (_k = item.variant) === null || _k === void 0 ? void 0 : _k.sku) !== null && _l !== void 0 ? _l : '';
                var barcode = (_o = (_m = item.variant) === null || _m === void 0 ? void 0 : _m.barcode) !== null && _o !== void 0 ? _o : '';
                var storeName = (_q = (_p = item.store) === null || _p === void 0 ? void 0 : _p.name) !== null && _q !== void 0 ? _q : '';
                return [productName, variantName, sku, barcode, storeName]
                    .join(' ')
                    .toLowerCase()
                    .includes(q_1);
            });
        }
        if (filters.lowStock) {
            result = result.filter(function (item) { return item.quantity > 0 && item.quantity <= item.minStock; });
        }
        if (filters.outOfStock) {
            result = result.filter(function (item) { return item.quantity <= 0; });
        }
        return result;
    }, [inventoryItems, filters]);
    var lowStockFiltered = (0, react_1.useMemo)(function () {
        var _a;
        if (!((_a = filters.search) === null || _a === void 0 ? void 0 : _a.trim()))
            return lowStockItems;
        var q = filters.search.trim().toLowerCase();
        return lowStockItems.filter(function (item) {
            var _a, _b, _c;
            var productName = (_a = item.productName) !== null && _a !== void 0 ? _a : '';
            var sku = (_b = item.sku) !== null && _b !== void 0 ? _b : '';
            var storeName = (_c = item.storeName) !== null && _c !== void 0 ? _c : '';
            return [productName, sku, storeName]
                .join(' ')
                .toLowerCase()
                .includes(q);
        });
    }, [lowStockItems, filters.search]);
    var selectedMovements = (_d = movementResponse === null || movementResponse === void 0 ? void 0 : movementResponse.items) !== null && _d !== void 0 ? _d : [];
    var selectedStore = activeStores.find(function (store) { return store.id === selectedStoreId; });
    var handleFiltersChange = function (values) {
        setFilters(function (prev) { return (__assign(__assign(__assign({}, prev), values), { storeId: selectedStoreId || undefined })); });
    };
    var handleResetFilters = function () {
        setFilters({
            storeId: selectedStoreId || undefined,
            search: '',
            lowStock: false,
            outOfStock: false,
            page: 1,
            limit: 10,
        });
    };
    var openAdjustModal = function (item) {
        setSelectedItem(item);
        setAdjustModalOpen(true);
    };
    var openTransferModal = function (item) {
        setSelectedItem(item);
        setTransferModalOpen(true);
    };
    var openMovementsModal = function (item) {
        setSelectedItem(item);
        setMovementsModalOpen(true);
    };
    var openSettingsModal = function (item) {
        setSelectedItem(item);
        setSettingsModalOpen(true);
    };
    var openInitialStockModal = function () {
        setInitialStockModalOpen(true);
    };
    var closeItemModals = function () {
        setAdjustModalOpen(false);
        setTransferModalOpen(false);
        setMovementsModalOpen(false);
        setSettingsModalOpen(false);
        setSelectedItem(null);
    };
    var closeInitialStockModal = function () {
        setInitialStockModalOpen(false);
    };
    var handleAdjustSubmit = function (values) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, adjustStockMutation.mutateAsync(values)];
                case 1:
                    _a.sent();
                    closeItemModals();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleInitialStockSubmit = function (values) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, initialStockMutation.mutateAsync({
                        storeId: values.storeId,
                        variantId: values.variantId,
                        quantity: values.quantity,
                        reason: (_a = values.reason) !== null && _a !== void 0 ? _a : 'Carga de stock inicial',
                        reference: 'STOCK_INICIAL',
                    })];
                case 1:
                    _b.sent();
                    closeInitialStockModal();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleTransferSubmit = function (values) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transferStockMutation.mutateAsync(values)];
                case 1:
                    _a.sent();
                    closeItemModals();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSettingsSubmit = function (values) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateInventorySettingsMutation.mutateAsync(values)];
                case 1:
                    _a.sent();
                    closeItemModals();
                    return [2 /*return*/];
            }
        });
    }); };
    var productNameByVariantId = (0, react_1.useMemo)(function () {
        var _a;
        var map = new Map();
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            for (var _b = 0, _c = (_a = product.variants) !== null && _a !== void 0 ? _a : []; _b < _c.length; _b++) {
                var variant = _c[_b];
                map.set(variant.id, product.name);
            }
        }
        return map;
    }, [products]);
    return (<div className="space-y-6 m-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventario
          </h1>
          <p className="text-sm text-gray-500">
            Control de stock por sucursal, variantes, movimientos y niveles mínimos.
          </p>
        </div>

        <button type="button" onClick={openInitialStockModal} disabled={!selectedStoreId || productsLoading} className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50">
          Cargar stock inicial
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

        <StoreSelector_1.StoreSelector value={selectedStoreId} onChange={setSelectedStoreId} stores={activeStores} loading={storesLoading}/>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Sucursal seleccionada</p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {(_e = selectedStore === null || selectedStore === void 0 ? void 0 : selectedStore.name) !== null && _e !== void 0 ? _e : 'Sin sucursal'}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Ítems visibles</p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {filteredItems.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Bajo stock</p>
          <p className="mt-2 text-lg font-semibold text-yellow-600">
            {lowStockFiltered.length}
          </p>
        </div>
      </div>

      <LowStockBanner_1.LowStockBanner items={lowStockFiltered} isLoading={lowStockLoading}/>

      <InventoryFilters_1.InventoryFilters values={filters} onChange={handleFiltersChange} onReset={handleResetFilters} isLoading={storesLoading}/>

      <InventoryProductsTable_1.InventoryProductsTable items={filteredItems} isLoading={inventoryLoading || inventoryFetching} mode="inventory" onAdjust={openAdjustModal} onTransfer={openTransferModal} onMovements={openMovementsModal} onSettings={openSettingsModal} productNameByVariantId={productNameByVariantId}/>
      <InitialStockModal_1.InitialStockModal open={initialStockModalOpen} storeId={selectedStoreId} storeName={selectedStore === null || selectedStore === void 0 ? void 0 : selectedStore.name} products={products} isLoading={initialStockMutation.isPending} onClose={closeInitialStockModal} onSubmit={handleInitialStockSubmit}/>

      <AdjustStockModal_1.AdjustStockModal open={adjustModalOpen} item={selectedItem} isLoading={adjustStockMutation.isPending} onClose={closeItemModals} onSubmit={handleAdjustSubmit}/>

      <TransferStockModal_1.TransferStockModal open={transferModalOpen} item={selectedItem} stores={stores} isLoading={transferStockMutation.isPending} onClose={closeItemModals} onSubmit={handleTransferSubmit}/>

      <MovementsModal_1.MovementsModal open={movementsModalOpen} item={selectedItemDetail !== null && selectedItemDetail !== void 0 ? selectedItemDetail : selectedItem} movements={selectedMovements} isLoading={movementsLoading} onClose={closeItemModals}/>

      {settingsModalOpen && selectedItem && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Configurar stock mínimo
                </h3>
                <p className="text-sm text-gray-500">
                  {(_k = (_g = (_f = selectedItem.variant) === null || _f === void 0 ? void 0 : _f.productName) !== null && _g !== void 0 ? _g : (_j = (_h = selectedItem.variant) === null || _h === void 0 ? void 0 : _h.product) === null || _j === void 0 ? void 0 : _j.name) !== null && _k !== void 0 ? _k : 'Producto'}{' '}
                  —{' '}
                  {(_r = (_p = (_m = (_l = selectedItem.variant) === null || _l === void 0 ? void 0 : _l.variantName) !== null && _m !== void 0 ? _m : (_o = selectedItem.variant) === null || _o === void 0 ? void 0 : _o.name) !== null && _p !== void 0 ? _p : (_q = selectedItem.variant) === null || _q === void 0 ? void 0 : _q.sku) !== null && _r !== void 0 ? _r : 'Sin variante'}{' '}
                  — {(_t = (_s = selectedItem.store) === null || _s === void 0 ? void 0 : _s.name) !== null && _t !== void 0 ? _t : 'Sucursal'}
                </p>
              </div>

              <button type="button" onClick={closeItemModals} className="text-sm text-gray-500 hover:text-gray-700">
                Cerrar
              </button>
            </div>

            <form onSubmit={function (e) {
                var _a;
                e.preventDefault();
                var formData = new FormData(e.currentTarget);
                var minStock = Number((_a = formData.get('minStock')) !== null && _a !== void 0 ? _a : 0);
                handleSettingsSubmit({
                    storeId: selectedItem.storeId,
                    variantId: selectedItem.variantId,
                    minStock: minStock,
                });
            }} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Stock mínimo
                </label>
                <input name="minStock" type="number" min={0} defaultValue={selectedItem.minStock} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500"/>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeItemModals} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancelar
                </button>

                <button type="submit" disabled={updateInventorySettingsMutation.isPending} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                  {updateInventorySettingsMutation.isPending
                ? 'Guardando...'
                : 'Guardar mínimo'}
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
}
