import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle"
import { ProductoModel } from "../models/ProductoModel";

const getProductos = async (req: Request, res: Response) => {
    try {
        const respuesta = await ProductoModel.findAll();
        res.status(200).send({ respuesta });
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCTOS",error);
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
const deleteProducto = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_PRODUCTO");
    }
}

const getProductoVariaciones = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCTO_VARIACIONES");
    } 
}
const postProductoVariaciones = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_POST_PRODUCTO_VARIACIONES");
    }
}
const putProductoVariaciones = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_PUT_PRODUCTO_VARIACIONES");
    }
}
const deleteProductoVariaciones = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_PRODUCTO_VARIACIONES");
    }
}

export { getProductos, getProducto, updateProducto, postProducto, deleteProducto, getProductoVariaciones, postProductoVariaciones, putProductoVariaciones, deleteProductoVariaciones };