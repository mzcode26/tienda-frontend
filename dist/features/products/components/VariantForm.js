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
exports.VariantForm = VariantForm;
var react_1 = require("react");
var useProducts_1 = require("../hooks/useProducts");
function VariantForm(_a) {
    var _this = this;
    var open = _a.open, product = _a.product, initialData = _a.initialData, onClose = _a.onClose, onSuccess = _a.onSuccess;
    var addVariant = (0, useProducts_1.useAddVariant)();
    var updateVariant = (0, useProducts_1.useUpdateVariant)();
    var _b = (0, react_1.useState)(''), sku = _b[0], setSku = _b[1];
    var _c = (0, react_1.useState)(''), barcode = _c[0], setBarcode = _c[1];
    var _d = (0, react_1.useState)(''), price = _d[0], setPrice = _d[1];
    var _e = (0, react_1.useState)(''), compareAtPrice = _e[0], setCompareAtPrice = _e[1];
    var _f = (0, react_1.useState)(''), costPrice = _f[0], setCostPrice = _f[1];
    var _g = (0, react_1.useState)(true), isActive = _g[0], setIsActive = _g[1];
    var _h = (0, react_1.useState)([]), attributes = _h[0], setAttributes = _h[1];
    var _j = (0, react_1.useState)(''), error = _j[0], setError = _j[1];
    var isEditing = !!(initialData === null || initialData === void 0 ? void 0 : initialData.id);
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d;
        if (initialData) {
            setSku((_a = initialData.sku) !== null && _a !== void 0 ? _a : '');
            setBarcode((_b = initialData.barcode) !== null && _b !== void 0 ? _b : '');
            setPrice(initialData.price !== null && initialData.price !== undefined
                ? String(initialData.price)
                : '');
            setCompareAtPrice(initialData.compareAtPrice !== null &&
                initialData.compareAtPrice !== undefined
                ? String(initialData.compareAtPrice)
                : '');
            setCostPrice(initialData.costPrice !== null && initialData.costPrice !== undefined
                ? String(initialData.costPrice)
                : '');
            setIsActive((_c = initialData.isActive) !== null && _c !== void 0 ? _c : true);
            var rawAttributes = (_d = initialData.attributes) !== null && _d !== void 0 ? _d : [];
            var normalized = Array.isArray(rawAttributes)
                ? rawAttributes.map(function (item) {
                    var _a, _b;
                    return ({
                        attributeId: (_a = item.attributeId) !== null && _a !== void 0 ? _a : '',
                        attributeValueId: (_b = item.attributeValueId) !== null && _b !== void 0 ? _b : '',
                    });
                })
                : [];
            setAttributes(normalized);
        }
        else {
            setSku('');
            setBarcode('');
            setPrice('');
            setCompareAtPrice('');
            setCostPrice('');
            setIsActive(true);
            setAttributes([]);
        }
        setError('');
    }, [initialData, open]);
    if (!open)
        return null;
    var addAttributeRow = function () {
        setAttributes(function (prev) { return __spreadArray(__spreadArray([], prev, true), [
            { attributeId: '', attributeValueId: '' },
        ], false); });
    };
    var updateAttributeRow = function (index, next) {
        setAttributes(function (prev) {
            return prev.map(function (item, i) { return (i === index ? next : item); });
        });
    };
    var removeAttributeRow = function (index) {
        setAttributes(function (prev) { return prev.filter(function (_, i) { return i !== index; }); });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var cleanSku, cleanPrice, cleanedAttributes, dto, updated, dto, updated, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    cleanSku = sku.trim();
                    cleanPrice = Number(price);
                    if (!cleanSku) {
                        setError('El SKU es obligatorio');
                        return [2 /*return*/];
                    }
                    if (Number.isNaN(cleanPrice)) {
                        setError('El precio es obligatorio');
                        return [2 /*return*/];
                    }
                    cleanedAttributes = attributes.filter(function (item) { return item.attributeId.trim() && item.attributeValueId.trim(); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!(isEditing && initialData)) return [3 /*break*/, 3];
                    dto = {
                        sku: cleanSku,
                        barcode: barcode.trim() || undefined,
                        price: cleanPrice,
                        compareAtPrice: compareAtPrice.trim()
                            ? Number(compareAtPrice)
                            : undefined,
                        costPrice: costPrice.trim() ? Number(costPrice) : undefined,
                        isActive: isActive,
                        attributes: cleanedAttributes.length ? cleanedAttributes : undefined,
                    };
                    return [4 /*yield*/, updateVariant.mutateAsync({
                            productId: product.id,
                            variantId: initialData.id,
                            dto: dto,
                        })];
                case 2:
                    updated = _a.sent();
                    onSuccess(updated);
                    return [3 /*break*/, 5];
                case 3:
                    dto = {
                        sku: cleanSku,
                        barcode: barcode.trim() || undefined,
                        price: cleanPrice,
                        compareAtPrice: compareAtPrice.trim()
                            ? Number(compareAtPrice)
                            : undefined,
                        costPrice: costPrice.trim() ? Number(costPrice) : undefined,
                        isActive: isActive,
                        attributes: cleanedAttributes.length ? cleanedAttributes : undefined,
                    };
                    return [4 /*yield*/, addVariant.mutateAsync({
                            productId: product.id,
                            dto: dto,
                        })];
                case 4:
                    updated = _a.sent();
                    onSuccess(updated);
                    _a.label = 5;
                case 5:
                    onClose();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    setError(err_1 instanceof Error ? err_1.message : 'Error al guardar la variante');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var loading = addVariant.isPending || updateVariant.isPending;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Editar variante' : 'Nueva variante'}
          </h2>

          <button onClick={onClose} className="text-sm text-gray-500">
            Cerrar
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Producto: <span className="font-medium">{product.name}</span>
        </p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">SKU</label>
              <input className="rounded-lg border px-3 py-2" value={sku} onChange={function (e) { return setSku(e.target.value); }} placeholder="Ej: REM-NEG-M" required/>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Barcode</label>
              <input className="rounded-lg border px-3 py-2" value={barcode} onChange={function (e) { return setBarcode(e.target.value); }} placeholder="Código de barras"/>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Precio</label>
              <input type="number" step="0.01" min="0" className="rounded-lg border px-3 py-2" value={price} onChange={function (e) { return setPrice(e.target.value); }} required/>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Precio comparativo</label>
              <input type="number" step="0.01" min="0" className="rounded-lg border px-3 py-2" value={compareAtPrice} onChange={function (e) { return setCompareAtPrice(e.target.value); }}/>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Costo</label>
              <input type="number" step="0.01" min="0" className="rounded-lg border px-3 py-2" value={costPrice} onChange={function (e) { return setCostPrice(e.target.value); }}/>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={function (e) { return setIsActive(e.target.checked); }}/>
            Activa
          </label>

          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Atributos</label>
              <button type="button" onClick={addAttributeRow} className="rounded-lg border px-3 py-1 text-sm">
                Agregar atributo
              </button>
            </div>

            {attributes.map(function (row, index) { return (<div key={"".concat(index, "-").concat(row.attributeId, "-").concat(row.attributeValueId)} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                <input className="rounded-lg border px-3 py-2" value={row.attributeId} onChange={function (e) {
                return updateAttributeRow(index, __assign(__assign({}, row), { attributeId: e.target.value }));
            }} placeholder="attributeId"/>

                <input className="rounded-lg border px-3 py-2" value={row.attributeValueId} onChange={function (e) {
                return updateAttributeRow(index, __assign(__assign({}, row), { attributeValueId: e.target.value }));
            }} placeholder="attributeValueId"/>

                <button type="button" onClick={function () { return removeAttributeRow(index); }} className="rounded-lg border px-3 py-2 text-sm">
                  Quitar
                </button>
              </div>); })}
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60">
              {loading ? 'Guardando...' : 'Guardar variante'}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
