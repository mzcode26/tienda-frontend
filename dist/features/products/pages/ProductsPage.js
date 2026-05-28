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
exports.default = ProductsPage;
var react_1 = require("react");
var useProducts_1 = require("../hooks/useProducts");
var ProductDetail_1 = require("../components/ProductDetail");
var ProductForm_1 = require("../components/ProductForm");
var VariantForm_1 = require("../components/VariantForm");
var ProductFilters_1 = require("../components/ProductFilters");
var ProductsTable_1 = require("../components/ProductsTable");
var auth_store_1 = require("../../../stores/auth.store");
var API_URL = (_a = import.meta.env.VITE_API_URL) !== null && _a !== void 0 ? _a : 'http://localhost:3000';
function loadOptions(endpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var token, res, json, payload, items;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    token = auth_store_1.useAuthStore.getState().token;
                    return [4 /*yield*/, fetch("".concat(API_URL).concat(endpoint), {
                            headers: __assign({}, (token ? { Authorization: "Bearer ".concat(token) } : {})),
                        })];
                case 1:
                    res = _d.sent();
                    return [4 /*yield*/, res.json().catch(function () { return null; })];
                case 2:
                    json = _d.sent();
                    if (!res.ok) {
                        throw new Error((json === null || json === void 0 ? void 0 : json.message) || "Error cargando ".concat(endpoint));
                    }
                    payload = (_a = json === null || json === void 0 ? void 0 : json.data) !== null && _a !== void 0 ? _a : json;
                    items = Array.isArray(payload)
                        ? payload
                        : (_c = (_b = payload === null || payload === void 0 ? void 0 : payload.items) !== null && _b !== void 0 ? _b : payload === null || payload === void 0 ? void 0 : payload.data) !== null && _c !== void 0 ? _c : [];
                    return [2 /*return*/, items.map(function (item) { return ({
                            id: item.id,
                            name: item.name,
                        }); })];
            }
        });
    });
}
function ProductsPage() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var _l = (0, react_1.useState)({
        search: '',
        categoryId: '',
        brandId: '',
        isActive: undefined,
        page: 1,
        limit: 20,
    }), filters = _l[0], setFilters = _l[1];
    var _m = (0, react_1.useState)(false), productFormOpen = _m[0], setProductFormOpen = _m[1];
    var _o = (0, react_1.useState)(false), variantFormOpen = _o[0], setVariantFormOpen = _o[1];
    var _p = (0, react_1.useState)(false), detailOpen = _p[0], setDetailOpen = _p[1];
    var _q = (0, react_1.useState)(null), editingProduct = _q[0], setEditingProduct = _q[1];
    var _r = (0, react_1.useState)(null), editingVariant = _r[0], setEditingVariant = _r[1];
    var _s = (0, react_1.useState)(null), selectedProduct = _s[0], setSelectedProduct = _s[1];
    var _t = (0, react_1.useState)([]), categoryOptions = _t[0], setCategoryOptions = _t[1];
    var _u = (0, react_1.useState)([]), brandOptions = _u[0], setBrandOptions = _u[1];
    var productsQuery = (0, useProducts_1.useProducts)(filters);
    var deleteProduct = (0, useProducts_1.useDeleteProduct)();
    var products = (_b = (_a = productsQuery.data) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : [];
    var total = (_d = (_c = productsQuery.data) === null || _c === void 0 ? void 0 : _c.total) !== null && _d !== void 0 ? _d : 0;
    var page = (_f = (_e = productsQuery.data) === null || _e === void 0 ? void 0 : _e.page) !== null && _f !== void 0 ? _f : 1;
    var limit = (_h = (_g = productsQuery.data) === null || _g === void 0 ? void 0 : _g.limit) !== null && _h !== void 0 ? _h : 20;
    var pages = (_k = (_j = productsQuery.data) === null || _j === void 0 ? void 0 : _j.totalPages) !== null && _k !== void 0 ? _k : Math.max(1, Math.ceil(total / limit));
    (0, react_1.useEffect)(function () {
        var mounted = true;
        var run = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, cats, brands, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                loadOptions('/categories'),
                                loadOptions('/brands'),
                            ])];
                    case 1:
                        _a = _c.sent(), cats = _a[0], brands = _a[1];
                        if (!mounted)
                            return [2 /*return*/];
                        setCategoryOptions(cats);
                        setBrandOptions(brands);
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _c.sent();
                        if (!mounted)
                            return [2 /*return*/];
                        setCategoryOptions([]);
                        setBrandOptions([]);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        void run();
        return function () {
            mounted = false;
        };
    }, []);
    var openNewProduct = function () {
        setEditingProduct(null);
        setProductFormOpen(true);
    };
    var openEditProduct = function (product) {
        setEditingProduct(product);
        setProductFormOpen(true);
    };
    var openAddVariant = function (product) {
        setSelectedProduct(product);
        setEditingVariant(null);
        setVariantFormOpen(true);
    };
    var openEditVariant = function (product, variant) {
        setSelectedProduct(product);
        setEditingVariant(variant);
        setVariantFormOpen(true);
    };
    var openDetail = function (product) {
        setSelectedProduct(product);
        setDetailOpen(true);
    };
    var handleProductSaved = function (product) {
        setSelectedProduct(product);
        setProductFormOpen(false);
        setEditingProduct(null);
        setDetailOpen(false);
        if (!editingProduct) {
            setVariantFormOpen(true);
        }
    };
    var handleVariantSaved = function () {
        setVariantFormOpen(false);
        setEditingVariant(null);
    };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var ok, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ok = window.confirm('¿Eliminar este producto?');
                    if (!ok)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, deleteProduct.mutateAsync(id)];
                case 2:
                    _a.sent();
                    if ((selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.id) === id) {
                        setDetailOpen(false);
                        setSelectedProduct(null);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    alert(err_1 instanceof Error ? err_1.message : 'No se pudo eliminar');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Productos</h1>
          <p className="text-sm text-gray-500">Gestión de productos y variantes</p>
        </div>

        <button onClick={openNewProduct} className="rounded-lg bg-black px-4 py-2 text-white">
          Nuevo producto
        </button>
      </div>

      <ProductFilters_1.ProductFilters filters={filters} onChange={setFilters} categoryOptions={categoryOptions} brandOptions={brandOptions}/>

      <div className="overflow-hidden rounded-2xl border bg-white">
        {productsQuery.isLoading ? (<div className="p-6 text-sm text-gray-500">Cargando productos...</div>) : productsQuery.isError ? (<div className="p-6 text-sm text-red-600">Error cargando productos</div>) : (<ProductsTable_1.ProductsTable products={products} onEditProduct={openEditProduct} onDeleteProduct={handleDelete} onAddVariant={openAddVariant} onEditVariant={openEditVariant} onViewDetail={openDetail}/>)}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-800">
        <span>
          Página {page} de {pages}
        </span>

        <div className="flex gap-2 text-gray-800">
          <button className="rounded-lg border px-3 py-1 " disabled={page <= 1} onClick={function () {
            return setFilters(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), { page: ((_a = prev.page) !== null && _a !== void 0 ? _a : 1) - 1 }));
            });
        }}>
            Anterior
          </button>

          <button className="rounded-lg border px-3 py-1 text-gray-800" disabled={page >= pages} onClick={function () {
            return setFilters(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), { page: ((_a = prev.page) !== null && _a !== void 0 ? _a : 1) + 1 }));
            });
        }}>
            Siguiente
          </button>
        </div>
      </div>

      <ProductForm_1.ProductForm open={productFormOpen} initialData={editingProduct} onClose={function () { return setProductFormOpen(false); }} onSuccess={handleProductSaved}/>

      {selectedProduct ? (<VariantForm_1.VariantForm open={variantFormOpen} product={selectedProduct} initialData={editingVariant} onClose={function () { return setVariantFormOpen(false); }} onSuccess={handleVariantSaved}/>) : null}

      <ProductDetail_1.ProductDetail open={detailOpen} product={selectedProduct} onClose={function () { return setDetailOpen(false); }} onEditProduct={function (product) {
            setDetailOpen(false);
            openEditProduct(product);
        }} onAddVariant={function (product) {
            setDetailOpen(false);
            openAddVariant(product);
        }} onEditVariant={function (product, variant) {
            setDetailOpen(false);
            openEditVariant(product, variant);
        }}/>
    </div>);
}
