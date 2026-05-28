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
exports.usePOSCartStore = void 0;
var zustand_1 = require("zustand");
/**
 * HELPERS
 */
var calculateItem = function (item) {
    var subtotal = item.quantity * item.unitPrice;
    var total = subtotal - item.discountAmount;
    return __assign(__assign({}, item), { subtotal: subtotal, total: total });
};
var calculateTotals = function (items) {
    var subtotal = items.reduce(function (acc, item) { return acc + item.subtotal; }, 0);
    var discountTotal = items.reduce(function (acc, item) { return acc + item.discountAmount; }, 0);
    var total = items.reduce(function (acc, item) { return acc + item.total; }, 0);
    var itemCount = items.reduce(function (acc, item) { return acc + item.quantity; }, 0);
    return {
        subtotal: subtotal,
        discountTotal: discountTotal,
        total: total,
        itemCount: itemCount,
    };
};
exports.usePOSCartStore = (0, zustand_1.create)(function (set) { return ({
    /**
     * INITIAL STATE
     */
    items: [],
    customer: null,
    subtotal: 0,
    discountTotal: 0,
    total: 0,
    itemCount: 0,
    /**
     * ADD ITEM
     */
    addItem: function (payload) {
        return set(function (state) {
            var _a;
            var existing = state.items.find(function (item) {
                return item.variantId === payload.variantId;
            });
            var items;
            if (existing) {
                items = state.items.map(function (item) {
                    if (item.variantId !== payload.variantId) {
                        return item;
                    }
                    return calculateItem(__assign(__assign({}, item), { quantity: item.quantity + payload.quantity }));
                });
            }
            else {
                items = __spreadArray(__spreadArray([], state.items, true), [
                    calculateItem({
                        variantId: payload.variantId,
                        productName: payload.productName,
                        sku: payload.sku,
                        quantity: payload.quantity,
                        unitPrice: payload.unitPrice,
                        discountAmount: (_a = payload.discountAmount) !== null && _a !== void 0 ? _a : 0,
                        subtotal: 0,
                        total: 0,
                        inventoryItem: payload.inventoryItem,
                    }),
                ], false);
            }
            return __assign({ items: items }, calculateTotals(items));
        });
    },
    /**
     * REMOVE ITEM
     */
    removeItem: function (variantId) {
        return set(function (state) {
            var items = state.items.filter(function (item) {
                return item.variantId !== variantId;
            });
            return __assign({ items: items }, calculateTotals(items));
        });
    },
    /**
     * UPDATE QUANTITY
     */
    updateQuantity: function (variantId, quantity) {
        return set(function (state) {
            if (quantity <= 0) {
                var items_1 = state.items.filter(function (item) {
                    return item.variantId !== variantId;
                });
                return __assign({ items: items_1 }, calculateTotals(items_1));
            }
            var items = state.items.map(function (item) {
                if (item.variantId !== variantId) {
                    return item;
                }
                return calculateItem(__assign(__assign({}, item), { quantity: quantity }));
            });
            return __assign({ items: items }, calculateTotals(items));
        });
    },
    /**
     * UPDATE PRICE
     */
    updatePrice: function (variantId, price) {
        return set(function (state) {
            var items = state.items.map(function (item) {
                if (item.variantId !== variantId) {
                    return item;
                }
                return calculateItem(__assign(__assign({}, item), { unitPrice: price }));
            });
            return __assign({ items: items }, calculateTotals(items));
        });
    },
    /**
     * UPDATE DISCOUNT
     */
    updateDiscount: function (variantId, discount) {
        return set(function (state) {
            var items = state.items.map(function (item) {
                if (item.variantId !== variantId) {
                    return item;
                }
                return calculateItem(__assign(__assign({}, item), { discountAmount: discount }));
            });
            return __assign({ items: items }, calculateTotals(items));
        });
    },
    /**
     * CUSTOMER
     */
    setCustomer: function (customer) {
        return set({
            customer: customer,
        });
    },
    /**
     * CLEAR
     */
    clearCart: function () {
        return set({
            items: [],
            customer: null,
            subtotal: 0,
            discountTotal: 0,
            total: 0,
            itemCount: 0,
        });
    },
}); });
