import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { IngredientesModel } from "../models/Ingrediente.model";
import { Ingrediente } from "../interfaces/producto.interface";

const getIngredientes = async (req: Request, res: Response) => {
    try {
        const response = await IngredientesModel.findAll();
        res.status(200).send(response);
        return;
    } catch (error) {
        handleHttp(res, "ERROR_GET_INGREDIENTES",error);
    }
}
const postIngredientes = async (req: Request, res: Response) => {
    try {
        const ingredienteData : Ingrediente = req.body;
        const response = await IngredientesModel.createIngrediente(ingredienteData);
        if (response){
            res.status(201).send(response);
            return;
        }
        res.status(400).send({message: "Error al crear el ingrediente"});
    } catch (error) {
        handleHttp(res, "ERROR_POST_INGREDIENTES",error);
    }
}
const putIngredientes = async (req: Request, res: Response) => {
    try {
        const ingredienteData : Partial<Ingrediente> = req.body;
        const { id } = req.params;
        const response = await IngredientesModel.updateIngrediente(Number(id), ingredienteData);
        if (response) {
            res.status(200).send({message: "Ingrediente actualizado"});
            return;
        }
        res.status(400).send({message: "Error al actualizar el ingrediente"});
    } catch (error) {
        handleHttp(res, "ERROR_PUT_INGREDIENTES",error);
    }
}
const deleteIngredientes = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await IngredientesModel.deleteIngrediente(Number(id));
        if (response) {
            res.status(200).send({message: "Ingrediente eliminado"});
            return;
        }
        res.status(400).send({message: "Error al eliminar el ingrediente"});
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_INGREDIENTES",error);
    }
}

export { getIngredientes, postIngredientes, putIngredientes, deleteIngredientes };