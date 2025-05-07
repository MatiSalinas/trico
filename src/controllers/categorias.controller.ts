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
const putCategorias = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoriaData: Partial<Categoria> = req.body;
        console.log(categoriaData);
        const response = await CategoriaModel.updateCategoria(Number(id), categoriaData);
        if (response) { 
            res.status(200).send({ message: "Categoria actualizada correctamente" });
        }
        else {  
            res.status(404).send({ message: "Categoria no encontrada" });
        }

    } catch (error) {
        handleHttp(res, "ERROR_PUT_CATEGORIAS",error);
        
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

const deleteCategorias = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await CategoriaModel.deleteCategoria(Number(id)); 
        if (response) {
            res.status(200).send({ message: "Categoria eliminada correctamente"});
        } else {
            res.status(404).send({ message: "Categoria no encontrada" });
        }
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_CATEGORIAS");
        
    }
}

export { getCategorias, putCategorias, postCategorias, deleteCategorias };