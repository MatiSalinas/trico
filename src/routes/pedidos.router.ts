import { Router } from "express";
import { getPedido, getPedidos, putPedidoEstado ,postPedido} from "../controllers/pedidos.controller";


const router = Router();

router.get("/", getPedidos);
router.get("/:id", getPedido);
router.post("/", postPedido);
router.put("/:id/estado", putPedidoEstado);

export {router}