import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const getInventario = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_INVENTARIO");
        
    }
} 
const getInventarioMovimietnos = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_INVENTARIO_MOVIMIENTOS");

    }
} 
const postInventarioMovimientos = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_POST_INVENTARIO_MOVIMIENTOS");

    }
} 

export { getInventario, getInventarioMovimietnos, postInventarioMovimientos };