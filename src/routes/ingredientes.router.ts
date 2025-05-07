import { Router } from "express";
import { deleteIngredientes, getIngredientes, postIngredientes, putIngredientes } from "../controllers/ingredientes";

const router = Router();

router.get("/", getIngredientes);
router.post("/", postIngredientes);
router.put("/:id", putIngredientes);
router.delete("/:id", deleteIngredientes);

export { router };