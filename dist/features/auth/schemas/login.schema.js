"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
var zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    tenantId: zod_1.z.string().min(1, 'El tenant es requerido'),
    email: zod_1.z.string().email('Ingresa un email válido'),
    password: zod_1.z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
