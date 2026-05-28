"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVariantSchema = exports.variantSchema = exports.variantAttributeSchema = void 0;
var zod_1 = require("zod");
exports.variantAttributeSchema = zod_1.z.object({
    attributeId: zod_1.z.string().min(1, 'El atributo es obligatorio'),
    attributeValueId: zod_1.z.string().min(1, 'El valor del atributo es obligatorio'),
});
exports.variantSchema = zod_1.z.object({
    sku: zod_1.z.string().min(1, 'El SKU es obligatorio'),
    barcode: zod_1.z.string().optional(),
    price: zod_1.z.coerce.number().min(0, 'El precio no puede ser negativo'),
    compareAtPrice: zod_1.z.coerce.number().min(0, 'El precio comparativo no puede ser negativo').optional(),
    costPrice: zod_1.z.coerce.number().min(0, 'El costo no puede ser negativo').optional(),
    isActive: zod_1.z.boolean().optional().default(true),
    attributes: zod_1.z.array(exports.variantAttributeSchema).optional().default([]),
});
exports.updateVariantSchema = zod_1.z.object({
    sku: zod_1.z.string().min(1, 'El SKU es obligatorio').optional(),
    barcode: zod_1.z.string().optional(),
    price: zod_1.z.coerce.number().min(0, 'El precio no puede ser negativo').optional(),
    compareAtPrice: zod_1.z.coerce.number().min(0, 'El precio comparativo no puede ser negativo').optional(),
    costPrice: zod_1.z.coerce.number().min(0, 'El costo no puede ser negativo').optional(),
    isActive: zod_1.z.boolean().optional(),
    attributes: zod_1.z.array(exports.variantAttributeSchema).optional(),
});
