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
exports.useCartStore = void 0;
var zustand_1 = require("zustand");
exports.useCartStore = (0, zustand_1.create)(function (set, get) { return ({
    items: [],
    total: 0,
    itemCount: 0,
    customerId: null,
    addItem: function (item) {
        return set(function (state) {
            var existing = state.items.find(function (i) { return i.variantId === item.variantId; });
            var items;
            if (existing) {
                items = state.items.map(function (i) {
                    return i.variantId === item.variantId
                        ? __assign(__assign({}, i), { quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.price - i.discountAmount }) : i;
                });
            }
            else {
                items = __spreadArray(__spreadArray([], state.items, true), [
                    __assign(__assign({}, item), { quantity: 1, discountAmount: 0, subtotal: item.price }),
                ], false);
            }
            var total = items.reduce(function (sum, i) { return sum + i.subtotal; }, 0);
            var itemCount = items.reduce(function (sum, i) { return sum + i.quantity; }, 0);
            return { items: items, total: total, itemCount: itemCount };
        });
    },
    removeItem: function (variantId) {
        return set(function (state) {
            var items = state.items.filter(function (i) { return i.variantId !== variantId; });
            var total = items.reduce(function (sum, i) { return sum + i.subtotal; }, 0);
            var itemCount = items.reduce(function (sum, i) { return sum + i.quantity; }, 0);
            return { items: items, total: total, itemCount: itemCount };
        });
    },
    updateQuantity: function (variantId, quantity) {
        return set(function (state) {
            if (quantity <= 0) {
                var items_1 = state.items.filter(function (i) { return i.variantId !== variantId; });
                var total_1 = items_1.reduce(function (sum, i) { return sum + i.subtotal; }, 0);
                var itemCount_1 = items_1.reduce(function (sum, i) { return sum + i.quantity; }, 0);
                return { items: items_1, total: total_1, itemCount: itemCount_1 };
            }
            var items = state.items.map(function (i) {
                return i.variantId === variantId
                    ? __assign(__assign({}, i), { quantity: quantity, subtotal: quantity * i.price - i.discountAmount }) : i;
            });
            var total = items.reduce(function (sum, i) { return sum + i.subtotal; }, 0);
            var itemCount = items.reduce(function (sum, i) { return sum + i.quantity; }, 0);
            return { items: items, total: total, itemCount: itemCount };
        });
    },
    clearCart: function () { return ({ items: [], total: 0, itemCount: 0, customerId: null }); },
    setCustomerId: function (customerId) { return set({ customerId: customerId }); },
    getTotal: function () { return get().total; },
}); });
