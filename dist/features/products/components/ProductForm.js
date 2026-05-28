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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductForm = ProductForm;
var react_1 = require("react");
var useProducts_1 = require("../hooks/useProducts");
var CategoryModal_1 = require("./CategoryModal");
var BrandModal_1 = require("./BrandModal");
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
                    if (!res.ok) {
                        throw new Error("Error cargando ".concat(endpoint));
                    }
                    return [4 /*yield*/, res.json().catch(function () { return null; })];
                case 2:
                    json = _d.sent();
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
function ProductForm(_a) {
    var _this = this;
    var open = _a.open, initialData = _a.initialData, onClose = _a.onClose, onSuccess = _a.onSuccess;
    var createProduct = (0, useProducts_1.useCreateProduct)();
    var updateProduct = (0, useProducts_1.useUpdateProduct)();
    var _b = (0, react_1.useState)(''), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(''), description = _c[0], setDescription = _c[1];
    var _d = (0, react_1.useState)(''), categoryId = _d[0], setCategoryId = _d[1];
    var _e = (0, react_1.useState)(''), brandId = _e[0], setBrandId = _e[1];
    var _f = (0, react_1.useState)(''), tagsText = _f[0], setTagsText = _f[1];
    var _g = (0, react_1.useState)(true), isActive = _g[0], setIsActive = _g[1];
    var _h = (0, react_1.useState)(''), error = _h[0], setError = _h[1];
    var _j = (0, react_1.useState)([]), categories = _j[0], setCategories = _j[1];
    var _k = (0, react_1.useState)([]), brands = _k[0], setBrands = _k[1];
    var _l = (0, react_1.useState)(false), loadingCatalogs = _l[0], setLoadingCatalogs = _l[1];
    var _m = (0, react_1.useState)({
        search: '',
        categoryId: '',
        brandId: '',
        isActive: undefined,
        page: 1,
        limit: 20,
    }), filters = _m[0], setFilters = _m[1];
    var _o = (0, react_1.useState)(false), categoryModalOpen = _o[0], setCategoryModalOpen = _o[1];
    var _p = (0, react_1.useState)(false), brandModalOpen = _p[0], setBrandModalOpen = _p[1];
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d, _e, _f;
        if (initialData) {
            setName((_a = initialData.name) !== null && _a !== void 0 ? _a : '');
            setDescription((_b = initialData.description) !== null && _b !== void 0 ? _b : '');
            setCategoryId((_c = initialData.categoryId) !== null && _c !== void 0 ? _c : '');
            setBrandId((_d = initialData.brandId) !== null && _d !== void 0 ? _d : '');
            setTagsText(((_e = initialData.tags) !== null && _e !== void 0 ? _e : []).join(', '));
            setIsActive((_f = initialData.isActive) !== null && _f !== void 0 ? _f : true);
        }
        else {
            setName('');
            setDescription('');
            setCategoryId('');
            setBrandId('');
            setTagsText('');
            setIsActive(true);
        }
        setError('');
    }, [initialData, open]);
    (0, react_1.useEffect)(function () {
        if (!open)
            return;
        var mounted = true;
        var run = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, cats, brs, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, 3, 4]);
                        setLoadingCatalogs(true);
                        return [4 /*yield*/, Promise.all([
                                loadOptions('/categories'),
                                loadOptions('/brands'),
                            ])];
                    case 1:
                        _a = _c.sent(), cats = _a[0], brs = _a[1];
                        if (!mounted)
                            return [2 /*return*/];
                        setCategories(cats);
                        setBrands(brs);
                        return [3 /*break*/, 4];
                    case 2:
                        _b = _c.sent();
                        if (!mounted)
                            return [2 /*return*/];
                        setCategories([]);
                        setBrands([]);
                        return [3 /*break*/, 4];
                    case 3:
                        if (mounted)
                            setLoadingCatalogs(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        void run();
        return function () {
            mounted = false;
        };
    }, [open]);
    if (!open)
        return null;
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var tags, dto, updated, dto, created, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    tags = tagsText
                        .split(',')
                        .map(function (tag) { return tag.trim(); })
                        .filter(Boolean);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!(initialData === null || initialData === void 0 ? void 0 : initialData.id)) return [3 /*break*/, 3];
                    dto = {
                        name: name.trim(),
                        description: description.trim() || undefined,
                        categoryId: categoryId.trim() || undefined,
                        brandId: brandId.trim() || undefined,
                        tags: tags,
                        isActive: isActive,
                    };
                    return [4 /*yield*/, updateProduct.mutateAsync({
                            id: initialData.id,
                            dto: dto,
                        })];
                case 2:
                    updated = _a.sent();
                    onSuccess(updated);
                    return [3 /*break*/, 5];
                case 3:
                    dto = {
                        name: name.trim(),
                        description: description.trim() || undefined,
                        categoryId: categoryId.trim() || undefined,
                        brandId: brandId.trim() || undefined,
                        tags: tags,
                        isActive: isActive,
                    };
                    return [4 /*yield*/, createProduct.mutateAsync(dto)];
                case 4:
                    created = _a.sent();
                    onSuccess(created);
                    _a.label = 5;
                case 5:
                    onClose();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    setError(err_1 instanceof Error ? err_1.message : 'Error al guardar el producto');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleCategoryCreated = function (category) {
        setCategories(function (prev) {
            return prev.some(function (item) { return item.id === category.id; }) ? prev : __spreadArray(__spreadArray([], prev, true), [category], false);
        });
        setCategoryId(category.id);
        setCategoryModalOpen(false);
    };
    var handleBrandCreated = function (brand) {
        setBrands(function (prev) {
            return prev.some(function (item) { return item.id === brand.id; }) ? prev : __spreadArray(__spreadArray([], prev, true), [brand], false);
        });
        setBrandId(brand.id);
        setBrandModalOpen(false);
    };
    var loading = createProduct.isPending || updateProduct.isPending;
    return (<>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {(initialData === null || initialData === void 0 ? void 0 : initialData.id) ? 'Editar producto' : 'Nuevo producto'}
            </h2>
            <button onClick={onClose} className="text-sm text-gray-500">
              Cerrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Nombre</label>
              <input className="rounded-lg border px-3 py-2" value={name} onChange={function (e) { return setName(e.target.value); }} placeholder="Ej: Remera básica" required/>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Descripción</label>
              <textarea className="rounded-lg border px-3 py-2" value={description} onChange={function (e) { return setDescription(e.target.value); }} placeholder="Descripción del producto" rows={4}/>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Categoría</label>
                  <button type="button" onClick={function () { return setCategoryModalOpen(true); }} className="text-xs underline">
                    Nueva categoría
                  </button>
                </div>

                <select className="rounded-lg border px-3 py-2" value={categoryId} onChange={function (e) { return setCategoryId(e.target.value); }} disabled={loadingCatalogs}>
                  <option value="">Sin categoría</option>
                  {categories.map(function (item) { return (<option key={item.id} value={item.id}>
                      {item.name}
                    </option>); })}
                </select>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Marca</label>
                  <button type="button" onClick={function () { return setBrandModalOpen(true); }} className="text-xs underline">
                    Nueva marca
                  </button>
                </div>

                <select className="rounded-lg border px-3 py-2" value={brandId} onChange={function (e) { return setBrandId(e.target.value); }} disabled={loadingCatalogs}>
                  <option value="">Sin marca</option>
                  {brands.map(function (item) { return (<option key={item.id} value={item.id}>
                      {item.name}
                    </option>); })}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Tags</label>
              <input className="rounded-lg border px-3 py-2" value={tagsText} onChange={function (e) { return setTagsText(e.target.value); }} placeholder="remera, algodón, verano"/>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isActive} onChange={function (e) { return setIsActive(e.target.checked); }}/>
              Activo
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2">
                Cancelar
              </button>
              <button type="submit" disabled={loading} className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60">
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <CategoryModal_1.CategoryModal open={categoryModalOpen} onClose={function () { return setCategoryModalOpen(false); }} onSuccess={handleCategoryCreated}/>

      <BrandModal_1.BrandModal open={brandModalOpen} onClose={function () { return setBrandModalOpen(false); }} onSuccess={handleBrandCreated}/>
    </>);
}
