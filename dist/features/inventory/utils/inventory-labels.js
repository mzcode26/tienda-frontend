"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventoryProductName = getInventoryProductName;
exports.getInventoryVariantName = getInventoryVariantName;
exports.getInventoryStoreName = getInventoryStoreName;
function getInventoryProductName(item, productNameByVariantId) {
    var _a, _b, _c, _d, _e, _f;
    return ((_f = (_e = (_c = (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : (_d = item.variant) === null || _d === void 0 ? void 0 : _d.productName) !== null && _e !== void 0 ? _e : productNameByVariantId === null || productNameByVariantId === void 0 ? void 0 : productNameByVariantId.get(item.variantId)) !== null && _f !== void 0 ? _f : 'Producto sin nombre');
}
function getInventoryVariantName(item) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return ((_h = (_f = (_d = (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.variantName) !== null && _b !== void 0 ? _b : (_c = item.variant) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : (_e = item.variant) === null || _e === void 0 ? void 0 : _e.sku) !== null && _f !== void 0 ? _f : (_g = item.variant) === null || _g === void 0 ? void 0 : _g.barcode) !== null && _h !== void 0 ? _h : 'Sin variante');
}
function getInventoryStoreName(item) {
    var _a, _b;
    return (_b = (_a = item.store) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Sucursal desconocida';
}
