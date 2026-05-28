"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSchema = void 0;
var zod_1 = require("zod");
var optionalText = zod_1.z.string().optional().or(zod_1.z.literal(''));
exports.customerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'El nombre es requerido'),
    lastName: zod_1.z.string().min(1, 'El apellido es requerido'),
    email: zod_1.z.string().email('Email inválido').optional().or(zod_1.z.literal('')),
    phone: optionalText,
    address: optionalText,
    city: optionalText,
    province: optionalText,
    postalCode: optionalText,
    taxId: optionalText,
    birthDate: optionalText,
    gender: zod_1.z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional().or(zod_1.z.literal('')),
    notes: optionalText,
    isActive: zod_1.z.boolean().default(true),
});
