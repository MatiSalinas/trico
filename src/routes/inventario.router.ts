import { Router } from "express";
import { getInventario, getInventarioMovimietnos, postInventarioMovimientos } from "../controllers/inventario.controller";


const router = Router();

router.get("/", getInventario);
router.get("/movimientos", getInventarioMovimietnos);
router.post("/movimientos", postInventarioMovimientos);

export { router };
