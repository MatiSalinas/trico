import {z} from "zod";

export const ingredenteBaseSchema = z.object({
    producto_id: z.number({required_error:"el producto_id no puede estar vacio"}).int("tiene que ser de tipo entero").min(1, "Tiene que ser un entero positivo"),
    nombre: z.string({ required_error:"El nombre no puede estar vacio"}),
    stock: z.number().min(1,"No puede ser un numero negativo"),
    unidad_medida: z.string().trim().length(1,"la unidad de medida no puede ser vacia"),
    costo: z.number()

});

//PUT ingrediente (Partial Update)
export const updateIngredienteSchema = ingredenteBaseSchema.partial();

//POST 
export const createIngredienteSchema = ingredenteBaseSchema;