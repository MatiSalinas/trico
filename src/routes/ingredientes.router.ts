import { Router } from "express";
import { deleteIngredientes, getIngredientes, postIngredientes, putIngredientes } from "../controllers/ingredientes.controller";
import { validateBody } from "../middleware/zodValidate";
import { createIngredienteSchema,updateIngredienteSchema } from "../validations/ingrediente.schema";
const router = Router();

router.get("/", getIngredientes);
router.post("/",validateBody(createIngredienteSchema) ,postIngredientes);
router.put("/:id",validateBody(updateIngredienteSchema), putIngredientes);
router.delete("/:id", deleteIngredientes);

export { router };