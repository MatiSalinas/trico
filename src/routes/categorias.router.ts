import { Router } from "express";
import { getCategorias, postCategorias, putCategorias, deleteCategorias } from "../controllers/categorias.controller";
import { validateBody } from "../middleware/zodValidate";
import { createCategoriaSchema,updateCategoriaSchema } from "../validations/categoria.schema";

const router = Router();

router.get('/', getCategorias);
router.post('/',validateBody(createCategoriaSchema) ,postCategorias);
router.put('/:id', putCategorias);
router.delete('/:id', deleteCategorias);

export { router};