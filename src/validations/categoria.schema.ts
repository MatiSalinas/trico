import { z } from 'zod';

export const categoriaBaseSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre es obligatorio',
  }).min(1, 'El nombre no puede estar vacío'),

  descripcion: z.string().nullable().optional(),
  orden: z.number().int().optional().default(1),
  activo: z.boolean().optional().default(true),
});

// For PUT (partial update)
export const updateCategoriaSchema = categoriaBaseSchema.partial();

// For POST (all required except optional fields)
export const createCategoriaSchema = categoriaBaseSchema;