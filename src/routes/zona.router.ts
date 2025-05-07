import { Router } from 'express';
import { getZona, postZonas, putZonaEstado, deleteZona, verificarZona } from '../controllers/zona.controller';

const router = Router();

router.get("/", getZona);
router.put("/:id", putZonaEstado)
router.post("/", postZonas);
router.get("/verificar/:id", verificarZona);
router.delete("/:id", deleteZona); 

export { router };
