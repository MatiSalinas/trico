import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const getIngredientes = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_INGREDIENTES");
    }
}
const postIngredientes = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_POST_INGREDIENTES");
    }
}
const putIngredientes = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_PUT_INGREDIENTES");
    }
}
const deleteIngredientes = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_INGREDIENTES");
    }
}

export { getIngredientes, postIngredientes, putIngredientes, deleteIngredientes };