"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryService = void 0;
var axios_1 = require("../../../lib/axios");
function buildQuery(params) {
    var searchParams = new URLSearchParams();
    Object.entries(params).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value === undefined || value === null || value === '') {
            return;
        }
        searchParams.append(key, String(value));
    });
    var query = searchParams.toString();
    return query ? "?".concat(query) : '';
}
function toArray(payload) {
    if (Array.isArray(payload)) {
        return payload;
    }
    if (payload && typeof payload === 'object') {
        var obj = payload;
        if (Array.isArray(obj.items)) {
            return obj.items;
        }
        if (Array.isArray(obj.data)) {
            return obj.data;
        }
        if (Array.isArray(obj.results)) {
            return obj.results;
        }
    }
    return [];
}
function toItem(payload) {
    if (payload && typeof payload === 'object') {
        var obj = payload;
        if (obj.item && !Array.isArray(obj.item)) {
            return obj.item;
        }
        if (obj.data && !Array.isArray(obj.data)) {
            return obj.data;
        }
        if (obj.result && !Array.isArray(obj.result)) {
            return obj.result;
        }
    }
    return payload;
}
function toPaginatedResponse(payload) {
    var _a, _b, _c, _d;
    if (payload &&
        typeof payload === 'object' &&
        !Array.isArray(payload)) {
        var obj = payload;
        var items_1 = toArray(obj.items) ||
            toArray(obj.data) ||
            toArray(obj.results);
        if (items_1.length > 0 || typeof obj.total === 'number') {
            return {
                items: items_1,
                total: (_a = obj.total) !== null && _a !== void 0 ? _a : items_1.length,
                page: (_b = obj.page) !== null && _b !== void 0 ? _b : 1,
                limit: (_c = obj.limit) !== null && _c !== void 0 ? _c : (items_1.length || 10),
                totalPages: (_d = obj.totalPages) !== null && _d !== void 0 ? _d : 1,
            };
        }
    }
    var items = toArray(payload);
    return {
        items: items,
        total: items.length,
        page: 1,
        limit: items.length || 10,
        totalPages: 1,
    };
}
exports.inventoryService = {
    getByStore: function (storeId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("/inventory/store/".concat(storeId))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, toArray(data)];
                }
            });
        });
    },
    getByVariantAndStore: function (storeId, variantId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("/inventory/store/".concat(storeId, "/variant/").concat(variantId))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, toItem(data)];
                }
            });
        });
    },
    getLowStock: function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get('/inventory/low-stock')];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, toArray(data)];
                }
            });
        });
    },
    getMovements: function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = buildQuery({
                            storeId: filters === null || filters === void 0 ? void 0 : filters.storeId,
                            variantId: filters === null || filters === void 0 ? void 0 : filters.variantId,
                            type: filters === null || filters === void 0 ? void 0 : filters.type,
                            page: (_a = filters === null || filters === void 0 ? void 0 : filters.page) !== null && _a !== void 0 ? _a : 1,
                            limit: (_b = filters === null || filters === void 0 ? void 0 : filters.limit) !== null && _b !== void 0 ? _b : 20,
                        });
                        return [4 /*yield*/, axios_1.default.get("/inventory/movements".concat(query))];
                    case 1:
                        data = (_c.sent()).data;
                        return [2 /*return*/, toPaginatedResponse(data)];
                }
            });
        });
    },
    adjustStock: function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post('/inventory/adjust', payload)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, toItem(data)];
                }
            });
        });
    },
    transferStock: function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post('/inventory/transfer', payload)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    },
    updateInventorySettings: function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var storeId, variantId, minStock, maxStock, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeId = payload.storeId, variantId = payload.variantId, minStock = payload.minStock, maxStock = payload.maxStock;
                        return [4 /*yield*/, axios_1.default.patch("/inventory/settings/".concat(storeId, "/").concat(variantId), {
                                minStock: minStock,
                                maxStock: maxStock,
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, toItem(data)];
                }
            });
        });
    },
};
