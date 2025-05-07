import { Router } from "express";
import { deleteProductoVariaciones, deleteProducto, getProducto, getProductos, getProductoVariaciones, postProducto, putProductoVariaciones, updateProducto, postProductoVariaciones } from "../controllers/productos.controller";

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', postProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);
router.get('/:id/variaciones', getProductoVariaciones);
router.delete('/:id/variaciones/:id_variacion', deleteProductoVariaciones);
router.post('/:id/variaciones', postProductoVariaciones);
router.put('/:id_variacion/variaciones', putProductoVariaciones);

export { router }