import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle"

const getProductos = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCTOS");
    }
}
const getProducto = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCTO");
    }
}
const updateProducto = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_UPDATE_PRODUCTO");
    }
}
const postProducto = (req: Request, res: Response) => {
    try {
        const { body } = req;
        res.status(201).send({body});
    } catch (error) {
        handleHttp(res, "ERROR_POST_PRODUCTO");
    }
}
const delteProducto = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_PRODUCTO");
    }
}

export { getProductos, getProducto, updateProducto, postProducto, delteProducto };