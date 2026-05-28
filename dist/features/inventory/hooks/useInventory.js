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
exports.useInventoryByStore = useInventoryByStore;
exports.useInventoryItem = useInventoryItem;
exports.useLowStock = useLowStock;
exports.useInventoryMovements = useInventoryMovements;
exports.useAdjustStock = useAdjustStock;
exports.useInitialStock = useInitialStock;
exports.useTransferStock = useTransferStock;
exports.useUpdateInventorySettings = useUpdateInventorySettings;
var react_query_1 = require("@tanstack/react-query");
var inventory_service_1 = require("../services/inventory.service");
var INVENTORY_KEYS = {
    all: ['inventory'],
    lists: function () { return __spreadArray(__spreadArray([], INVENTORY_KEYS.all, true), ['lists'], false); },
    storeList: function (storeId) {
        return __spreadArray(__spreadArray([], INVENTORY_KEYS.lists(), true), ['store', storeId], false);
    },
    item: function (storeId, variantId) {
        return __spreadArray(__spreadArray([], INVENTORY_KEYS.all, true), ['item', storeId, variantId], false);
    },
    lowStock: function () { return __spreadArray(__spreadArray([], INVENTORY_KEYS.all, true), ['low-stock'], false); },
    movements: function () { return __spreadArray(__spreadArray([], INVENTORY_KEYS.all, true), ['movements'], false); },
    movementList: function (filters) { return __spreadArray(__spreadArray([], INVENTORY_KEYS.movements(), true), [filters !== null && filters !== void 0 ? filters : {}], false); },
};
function invalidateInventoryData(queryClient, storeId, variantId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                        queryKey: INVENTORY_KEYS.storeList(storeId),
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: INVENTORY_KEYS.item(storeId, variantId),
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: INVENTORY_KEYS.lowStock(),
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: INVENTORY_KEYS.movements(),
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function useInventoryByStore(storeId, enabled) {
    if (enabled === void 0) { enabled = true; }
    return (0, react_query_1.useQuery)({
        queryKey: INVENTORY_KEYS.storeList(storeId),
        queryFn: function () { return inventory_service_1.inventoryService.getByStore(storeId); },
        enabled: enabled && Boolean(storeId),
    });
}
function useInventoryItem(storeId, variantId, enabled) {
    if (enabled === void 0) { enabled = true; }
    return (0, react_query_1.useQuery)({
        queryKey: INVENTORY_KEYS.item(storeId, variantId),
        queryFn: function () { return inventory_service_1.inventoryService.getByVariantAndStore(storeId, variantId); },
        enabled: enabled && Boolean(storeId) && Boolean(variantId),
    });
}
function useLowStock(enabled) {
    if (enabled === void 0) { enabled = true; }
    return (0, react_query_1.useQuery)({
        queryKey: INVENTORY_KEYS.lowStock(),
        queryFn: function () { return inventory_service_1.inventoryService.getLowStock(); },
        enabled: enabled,
    });
}
function useInventoryMovements(filters, enabled) {
    if (enabled === void 0) { enabled = true; }
    return (0, react_query_1.useQuery)({
        queryKey: INVENTORY_KEYS.movementList(filters),
        queryFn: function () { return inventory_service_1.inventoryService.getMovements(filters); },
        enabled: enabled,
    });
}
function useAdjustStock() {
    var _this = this;
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) {
            return inventory_service_1.inventoryService.adjustStock(payload);
        },
        onSuccess: function (_data, variables) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, invalidateInventoryData(queryClient, variables.storeId, variables.variantId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
    });
}
function useInitialStock() {
    var _this = this;
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) {
            return inventory_service_1.inventoryService.adjustStock(__assign(__assign({}, payload), { type: 'SET' }));
        },
        onSuccess: function (_data, variables) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, invalidateInventoryData(queryClient, variables.storeId, variables.variantId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
    });
}
function useTransferStock() {
    var _this = this;
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) {
            return inventory_service_1.inventoryService.transferStock(payload);
        },
        onSuccess: function (_data, variables) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: INVENTORY_KEYS.storeList(variables.fromStoreId),
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryClient.invalidateQueries({
                                queryKey: INVENTORY_KEYS.storeList(variables.toStoreId),
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryClient.invalidateQueries({
                                queryKey: INVENTORY_KEYS.item(variables.fromStoreId, variables.variantId),
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryClient.invalidateQueries({
                                queryKey: INVENTORY_KEYS.item(variables.toStoreId, variables.variantId),
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryClient.invalidateQueries({
                                queryKey: INVENTORY_KEYS.lowStock(),
                            })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryClient.invalidateQueries({
                                queryKey: INVENTORY_KEYS.movements(),
                            })];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
    });
}
function useUpdateInventorySettings() {
    var _this = this;
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) {
            return inventory_service_1.inventoryService.updateInventorySettings(payload);
        },
        onSuccess: function (_data, variables) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: INVENTORY_KEYS.storeList(variables.storeId),
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryClient.invalidateQueries({
                                queryKey: INVENTORY_KEYS.item(variables.storeId, variables.variantId),
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryClient.invalidateQueries({
                                queryKey: INVENTORY_KEYS.lowStock(),
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
    });
}
