import { Router } from "express";
import { getCategorias, postCategorias, putCategorias, deleteCategorias } from "../controllers/categorias.controller";

const router = Router();

router.get('/', getCategorias);
router.post('/', postCategorias);
router.put('/:id', putCategorias);
router.delete('/:id', deleteCategorias);

export { router};