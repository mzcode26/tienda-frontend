import { z } from 'zod';

export const variantAttributeSchema = z.object({
  attributeId: z.string().min(1, 'El atributo es obligatorio'),
  attributeValueId: z.string().min(1, 'El valor del atributo es obligatorio'),
});

export const createVariantSchema = z.object({
  sku: z.string().min(1, 'El SKU es obligatorio'),
  barcode: z.string().optional(),
  price: z.coerce.number().min(0, 'El precio no puede ser negativo'),
  compareAtPrice: z.coerce.number().min(0, 'El precio comparativo no puede ser negativo').optional(),
  costPrice: z.coerce.number().min(0, 'El costo no puede ser negativo').optional(),
  isActive: z.boolean().optional().default(true),
  attributes: z.array(variantAttributeSchema).optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  tags: z.array(z.string()).optional().default([]),
  variants: z.array(createVariantSchema).optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateVariantSchema = z.object({
  sku: z.string().min(1, 'El SKU es obligatorio').optional(),
  barcode: z.string().optional(),
  price: z.coerce.number().min(0, 'El precio no puede ser negativo').optional(),
  compareAtPrice: z.coerce.number().min(0, 'El precio comparativo no puede ser negativo').optional(),
  costPrice: z.coerce.number().min(0, 'El costo no puede ser negativo').optional(),
  isActive: z.boolean().optional(),
  attributes: z.array(variantAttributeSchema).optional(),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;
export type CreateVariantFormValues = z.infer<typeof createVariantSchema>;
export type UpdateVariantFormValues = z.infer<typeof updateVariantSchema>;