import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle"
import { CategoriaModel } from "../models/CategoriaModel";
import { Categoria } from "../interfaces/producto.interface";
const getCategorias = async (req: Request, res: Response) : Promise<void> => {
    try {
        const response = await CategoriaModel.findAll();
       res.status(200).send(response)
    } catch (error) {
        handleHttp(res, "ERROR_GET_CATEGORIAS", error);
        
    }
}
const putCategorias = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_PUT_CATEGORIAS");
        
    }
}
const postCategorias = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { nombre, descripcion = null, orden = 1, activo = true } = req.body;

        const categoriaData: Categoria = {
            nombre,
            descripcion,
            orden,
            activo,
        };

        const response = await CategoriaModel.createCategoria(categoriaData)
        res.status(201).send(response) 
    } catch (error) {
        handleHttp(res, "ERROR_POST_CATEGORIAS", error);
        
    }
}
const deleteCategorias = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_CATEGORIAS");
        
    }
}

export { getCategorias, putCategorias, postCategorias, deleteCategorias };