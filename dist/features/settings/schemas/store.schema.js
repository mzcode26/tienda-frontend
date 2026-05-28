"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSchema = void 0;
var zod_1 = require("zod");
exports.storeSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede superar los 100 caracteres'),
    address: zod_1.z
        .string()
        .trim()
        .max(200, 'La dirección no puede superar los 200 caracteres')
        .optional()
        .or(zod_1.z.literal(''))
        .transform(function (value) { return (value === '' ? undefined : value); }),
    phone: zod_1.z
        .string()
        .trim()
        .max(30, 'El teléfono no puede superar los 30 caracteres')
        .optional()
        .or(zod_1.z.literal(''))
        .transform(function (value) { return (value === '' ? undefined : value); }),
    email: zod_1.z
        .string()
        .trim()
        .email('Email inválido')
        .optional()
        .or(zod_1.z.literal(''))
        .transform(function (value) { return (value === '' ? undefined : value); }),
    isActive: zod_1.z.boolean().default(true),
});
