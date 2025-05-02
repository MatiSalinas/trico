import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle"
const getCategorias = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_CATEGORIAS");
        
    }
}
const putCategorias = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_PUT_CATEGORIAS");
        
    }
}
const postCategorias = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_POST_CATEGORIAS");
        
    }
}
const deleteCategorias = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_CATEGORIAS");
        
    }
}

export { getCategorias, putCategorias, postCategorias, deleteCategorias };