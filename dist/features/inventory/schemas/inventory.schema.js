"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventorySettingsSchema = exports.transferStockSchema = exports.adjustStockSchema = exports.inventoryFiltersSchema = void 0;
var zod_1 = require("zod");
exports.inventoryFiltersSchema = zod_1.z.object({
    storeId: zod_1.z.string().optional(),
    search: zod_1.z
        .string()
        .trim()
        .optional(),
    lowStock: zod_1.z.boolean().optional(),
    outOfStock: zod_1.z.boolean().optional(),
    page: zod_1.z.number().min(1).optional(),
    limit: zod_1.z.number().min(1).max(100).optional(),
});
exports.adjustStockSchema = zod_1.z.object({
    storeId: zod_1.z
        .string()
        .min(1, 'La sucursal es obligatoria'),
    variantId: zod_1.z
        .string()
        .min(1, 'La variante es obligatoria'),
    type: zod_1.z.enum(['ADD', 'REMOVE', 'SET'], {
        required_error: 'Selecciona un tipo de ajuste',
    }),
    quantity: zod_1.z
        .number({
        required_error: 'La cantidad es obligatoria',
    })
        .min(0, 'La cantidad no puede ser negativa'),
    reason: zod_1.z
        .string()
        .trim()
        .max(255, 'La observación no puede superar los 255 caracteres')
        .optional(),
    reference: zod_1.z
        .string()
        .trim()
        .max(100, 'La referencia no puede superar los 100 caracteres')
        .optional(),
});
exports.transferStockSchema = zod_1.z.object({
    fromStoreId: zod_1.z
        .string()
        .min(1, 'La sucursal origen es obligatoria'),
    toStoreId: zod_1.z
        .string()
        .min(1, 'La sucursal destino es obligatoria'),
    variantId: zod_1.z
        .string()
        .min(1, 'La variante es obligatoria'),
    quantity: zod_1.z
        .number({
        required_error: 'La cantidad es obligatoria',
    })
        .positive('La cantidad debe ser mayor a cero'),
    reason: zod_1.z
        .string()
        .trim()
        .max(255, 'La observación no puede superar los 255 caracteres')
        .optional(),
    reference: zod_1.z
        .string()
        .trim()
        .max(100, 'La referencia no puede superar los 100 caracteres')
        .optional(),
}).refine(function (data) {
    return data.fromStoreId !== data.toStoreId;
}, {
    message: 'La sucursal origen y destino no pueden ser iguales',
    path: ['toStoreId'],
});
exports.inventorySettingsSchema = zod_1.z.object({
    storeId: zod_1.z
        .string()
        .min(1, 'La sucursal es obligatoria'),
    variantId: zod_1.z
        .string()
        .min(1, 'La variante es obligatoria'),
    minStock: zod_1.z
        .number({
        required_error: 'El stock mínimo es obligatorio',
    })
        .min(0, 'El stock mínimo no puede ser negativo'),
});
