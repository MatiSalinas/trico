import {z} from "zod";

export const inventarioMovimientoBase = z.object({
    ingrediente_id: z.number().int().min(1, "El igrediente id, debe ser positivo"),
    cantidad: z.number().min(0,"cantidad tiene que ser positiva"),
    tipo: z.enum(["entrada","salida","ajuste"]),
    motivo: z.string().trim().length(1,"El motivo no puede estar vacio si es enviado.").optional(),
    usuario_id: z.number().int().min(1,"el usuario_id debe ser positivo").default(1),
});

export const createInventarioMovimientoSchema = inventarioMovimientoBase;