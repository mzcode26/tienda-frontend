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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsService = void 0;
var auth_store_1 = require("../../../stores/auth.store");
var API_URL = (_a = import.meta.env.VITE_API_URL) !== null && _a !== void 0 ? _a : 'http://localhost:3000/api/v1';
function getAuthHeaders() {
    var token = auth_store_1.useAuthStore.getState().token;
    return __assign({ 'Content-Type': 'application/json' }, (token ? { Authorization: "Bearer ".concat(token) } : {}));
}
function request(path_1) {
    return __awaiter(this, arguments, void 0, function (path, options) {
        var res, json, _a, message;
        var _b;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_URL).concat(path), __assign(__assign({}, options), { headers: __assign(__assign({}, getAuthHeaders()), ((_b = options.headers) !== null && _b !== void 0 ? _b : {})) }))];
                case 1:
                    res = _c.sent();
                    json = null;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, res.json()];
                case 3:
                    json = _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = _c.sent();
                    return [3 /*break*/, 5];
                case 5:
                    if (!res.ok) {
                        message = (json === null || json === void 0 ? void 0 : json.message) ||
                            (json === null || json === void 0 ? void 0 : json.error) ||
                            'Request failed';
                        throw new Error(message);
                    }
                    if (!json) {
                        throw new Error('Empty response from server');
                    }
                    return [2 /*return*/, json.data];
            }
        });
    });
}
exports.productsService = {
    findAll: function () {
        return __awaiter(this, arguments, void 0, function (filters) {
            var params, query;
            if (filters === void 0) { filters = {}; }
            return __generator(this, function (_a) {
                params = new URLSearchParams();
                if (filters.search)
                    params.set('search', filters.search);
                if (filters.categoryId)
                    params.set('categoryId', filters.categoryId);
                if (filters.brandId)
                    params.set('brandId', filters.brandId);
                if (filters.isActive !== undefined)
                    params.set('isActive', String(filters.isActive));
                if (filters.page !== undefined)
                    params.set('page', String(filters.page));
                if (filters.limit !== undefined)
                    params.set('limit', String(filters.limit));
                query = params.toString();
                return [2 /*return*/, request("/products".concat(query ? "?".concat(query) : ''))];
            });
        });
    },
    findById: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request("/products/".concat(id))];
            });
        });
    },
    create: function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request('/products', {
                        method: 'POST',
                        body: JSON.stringify(dto),
                    })];
            });
        });
    },
    update: function (id, dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request("/products/".concat(id), {
                        method: 'PATCH',
                        body: JSON.stringify(dto),
                    })];
            });
        });
    },
    remove: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request("/products/".concat(id), {
                        method: 'DELETE',
                    })];
            });
        });
    },
    addVariant: function (productId, dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request("/products/".concat(productId, "/variants"), {
                        method: 'POST',
                        body: JSON.stringify(dto),
                    })];
            });
        });
    },
    updateVariant: function (productId, variantId, dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request("/products/".concat(productId, "/variants/").concat(variantId), {
                        method: 'PATCH',
                        body: JSON.stringify(dto),
                    })];
            });
        });
    },
    removeVariant: function (productId, variantId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request("/products/".concat(productId, "/variants/").concat(variantId), {
                        method: 'DELETE',
                    })];
            });
        });
    },
    addImage: function (productId, dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request("/products/".concat(productId, "/images"), {
                        method: 'POST',
                        body: JSON.stringify(dto),
                    })];
            });
        });
    },
    removeImage: function (productId, imageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request("/products/".concat(productId, "/images/").concat(imageId), {
                        method: 'DELETE',
                    })];
            });
        });
    },
};
