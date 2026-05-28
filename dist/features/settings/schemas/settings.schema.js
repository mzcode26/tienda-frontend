"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.tenantSettingsSchema = exports.inventorySettingsSchema = exports.salesSettingsSchema = exports.generalSettingsSchema = void 0;
var zod_1 = require("zod");
exports.generalSettingsSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'El nombre es requerido'),
    email: zod_1.z.string().email('Email inválido').optional().nullable(),
    phone: zod_1.z.string().optional().nullable(),
    address: zod_1.z.string().optional().nullable(),
    city: zod_1.z.string().optional().nullable(),
    country: zod_1.z.string().optional().nullable(),
    currency: zod_1.z.string().min(1, 'La moneda es requerida'),
    timezone: zod_1.z.string().min(1, 'La zona horaria es requerida'),
    logoUrl: zod_1.z.string().optional().nullable(),
});
exports.salesSettingsSchema = zod_1.z.object({
    allowNegativeStock: zod_1.z.boolean().optional(),
    defaultTax: zod_1.z.number().optional(),
    invoicePrefix: zod_1.z.string().optional(),
});
exports.inventorySettingsSchema = zod_1.z.object({
    lowStockThreshold: zod_1.z.number().optional(),
    trackMovements: zod_1.z.boolean().optional(),
});
exports.tenantSettingsSchema = zod_1.z.object({
    general: exports.generalSettingsSchema,
    sales: exports.salesSettingsSchema,
    inventory: exports.inventorySettingsSchema,
});
exports.changePasswordSchema = zod_1.z
    .object({
    currentPassword: zod_1.z.string().min(1, 'La contraseña actual es requerida'),
    newPassword: zod_1.z
        .string()
        .min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
    confirmPassword: zod_1.z.string().min(1, 'Debes confirmar la nueva contraseña'),
})
    .refine(function (data) { return data.newPassword === data.confirmPassword; }, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
});
