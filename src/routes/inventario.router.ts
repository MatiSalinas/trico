import { Router } from "express";
import { getInventario, getInventarioMovimietnos, postInventarioMovimientos } from "../controllers/inventario.controller";
import { validateBody } from "../middleware/zodValidate";
import { createInventarioMovimientoSchema } from "../validations/inventarioMovimientos.schema";

const router = Router();

router.get("/", getInventario);
router.get("/movimientos", getInventarioMovimietnos);
router.post("/movimientos",validateBody(createInventarioMovimientoSchema), postInventarioMovimientos);

export { router };
