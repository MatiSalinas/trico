import { Request, Response, Router } from "express";
import { delteProducto, getProducto, getProductos, postProducto, updateProducto } from "../controllers/productos";

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', postProducto);
router.put('/:id', updateProducto);
router.delete('/:id', delteProducto);

export { router }