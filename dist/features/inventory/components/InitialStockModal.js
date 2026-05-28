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
exports.InitialStockModal = InitialStockModal;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function InitialStockModal(_a) {
    var _this = this;
    var open = _a.open, storeId = _a.storeId, storeName = _a.storeName, products = _a.products, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, onClose = _a.onClose, onSubmit = _a.onSubmit;
    var _c = (0, react_1.useState)(''), search = _c[0], setSearch = _c[1];
    var _d = (0, react_1.useState)(''), selectedVariantId = _d[0], setSelectedVariantId = _d[1];
    var _e = (0, react_1.useState)(0), quantity = _e[0], setQuantity = _e[1];
    (0, react_1.useEffect)(function () {
        if (open) {
            setSearch('');
            setSelectedVariantId('');
            setQuantity(0);
        }
    }, [open]);
    var filteredProducts = (0, react_1.useMemo)(function () {
        var q = search.trim().toLowerCase();
        if (!q)
            return products;
        return products.filter(function (product) {
            var _a, _b, _c;
            var productName = (_b = (_a = product.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
            var variantMatch = ((_c = product.variants) !== null && _c !== void 0 ? _c : []).some(function (variant) {
                var _a, _b, _c, _d;
                var sku = (_b = (_a = variant.sku) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
                var barcode = (_d = (_c = variant.barcode) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== null && _d !== void 0 ? _d : '';
                return sku.includes(q) || barcode.includes(q);
            });
            return productName.includes(q) || variantMatch;
        });
    }, [products, search]);
    var selectedVariant = (0, react_1.useMemo)(function () {
        var _a;
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            var variant = (_a = product.variants) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.id === selectedVariantId; });
            if (variant) {
                return {
                    product: product,
                    variant: variant,
                };
            }
        }
        return null;
    }, [products, selectedVariantId]);
    if (!open)
        return null;
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!storeId) {
                        alert('Selecciona una sucursal');
                        return [2 /*return*/];
                    }
                    if (!selectedVariantId) {
                        alert('Selecciona una variante');
                        return [2 /*return*/];
                    }
                    if (quantity < 0) {
                        alert('La cantidad no puede ser negativa');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, onSubmit({
                            storeId: storeId,
                            variantId: selectedVariantId,
                            type: 'SET',
                            quantity: quantity,
                            reason: 'Carga de stock inicial',
                            reference: 'STOCK_INICIAL',
                        })];
                case 1:
                    _a.sent();
                    onClose();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Carga de stock inicial
            </h3>
            <p className="text-sm text-gray-500">
              Sucursal: {storeName !== null && storeName !== void 0 ? storeName : storeId}
            </p>
          </div>

          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <lucide_react_1.X size={18}/>
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <div className="relative">
              <lucide_react_1.Search size={18} className="absolute left-3 top-3 text-gray-400"/>
              <input value={search} onChange={function (e) { return setSearch(e.target.value); }} placeholder="Buscar producto, SKU o código de barras..." className="w-full rounded-xl border border-gray-300 px-10 py-2 text-sm outline-none transition focus:border-blue-500"/>
            </div>

            <div className="max-h-[420px] overflow-auto rounded-xl border border-gray-200">
              {filteredProducts.length === 0 ? (<div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-sm text-gray-500">
                  <lucide_react_1.PackageSearch size={28}/>
                  <p>No hay productos que coincidan con la búsqueda.</p>
                </div>) : (filteredProducts.map(function (product) {
            var _a, _b;
            return (<div key={product.id} className="border-b border-gray-200 last:border-b-0 p-4">
                    <p className="mb-3 font-semibold text-gray-900">{product.name}</p>

                    <div className="grid gap-2">
                      {((_a = product.variants) !== null && _a !== void 0 ? _a : []).length === 0 ? (<p className="text-sm text-gray-500">
                          Este producto no tiene variantes.
                        </p>) : ((_b = product.variants) === null || _b === void 0 ? void 0 : _b.map(function (variant) {
                    var isSelected = selectedVariantId === variant.id;
                    return (<button key={variant.id} type="button" onClick={function () { return setSelectedVariantId(variant.id); }} className={[
                            'flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition',
                            isSelected
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 bg-white hover:bg-gray-50',
                        ].join(' ')}>
                              <span className="font-medium text-gray-800">
                                {variant.sku || 'Sin SKU'}
                              </span>

                              <span className="text-gray-500">
                                {variant.barcode ? "Barras: ".concat(variant.barcode) : 'Sin código'}
                              </span>
                            </button>);
                }))}
                    </div>
                  </div>);
        }))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div>
              <p className="text-sm text-gray-500">Variante seleccionada</p>
              <p className="mt-1 font-semibold text-gray-900">
                {selectedVariant
            ? "".concat(selectedVariant.product.name, " \u2014 ").concat(selectedVariant.variant.sku || 'Sin SKU')
            : 'Ninguna'}
              </p>
              <p className="text-sm text-gray-500">
                {(selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.variant.barcode)
            ? "C\u00F3digo: ".concat(selectedVariant.variant.barcode)
            : 'Selecciona una variante para continuar'}
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Stock inicial
              </label>
              <input type="number" min={0} step="1" value={quantity} onChange={function (e) { return setQuantity(Number(e.target.value)); }} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500"/>
            </div>

            <div className="rounded-xl bg-white p-3 text-sm text-gray-600">
              <p className="font-medium text-gray-800">Qué hará este flujo</p>
              <p className="mt-1">
                Guardará el stock ingresado como ajuste tipo <span className="font-semibold">SET</span> con la observación <span className="font-semibold">“Carga de stock inicial”</span>.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                Cancelar
              </button>

              <button type="button" onClick={handleSubmit} disabled={isLoading} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                {isLoading ? 'Guardando...' : 'Guardar stock inicial'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
