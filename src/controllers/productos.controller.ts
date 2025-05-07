import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle"
import { ProductoModel } from "../models/Producto.model";
import { Producto, VariacionProducto } from "../interfaces/producto.interface";

const getProductos = async (req: Request, res: Response) => {
    try {
        const respuesta = await ProductoModel.findAll();
        res.status(200).send({ respuesta });
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCTOS",error);
    }
}
const getProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const respuesta = await ProductoModel.findById(Number(id));
        if (respuesta) {
            res.status(200).send({ respuesta });
            return;
        }
        else { 
            res.status(404).send({ message: "Producto no encontrado" });
            return;
        }
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCTO",error);
    }
}
const updateProducto = async  (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productoData : Partial<Producto> = req.body;
        const response = await ProductoModel.updateProducto(Number(id), productoData);
        if (response) { 
            res.status(200).send({ message: "Producto actualizado correctamente" });
        }
        else {  
            res.status(404).send({ message: "Producto no encontrado" });
        }
    } catch (error) {
        handleHttp(res, "ERROR_UPDATE_PRODUCTO",error);
    }
}

const postProducto = async (req: Request, res: Response) => {
    try {
        const { categoria_id,nombre ,descripcion = null, precio, imagen = null, disponible = true, destacado = false } = req.body;
        const productoData: Producto = { 
            categoria_id,
            nombre,
            descripcion,
            precio,
            imagen,
            disponible,
            destacado
         }
        const response = await ProductoModel.createProducto(productoData);
        res.status(201).send(response);
        return;
    } catch (error) {
        handleHttp(res, "ERROR_POST_PRODUCTO",error);
    }
}
const deleteProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await ProductoModel.deleteProducto(Number(id));
        if (response) {
            res.status(200).send({ message: "Producto eliminado correctamente" });
        } else {
            res.status(404).send({ message: "Producto no encontrado" });
        }

    } catch (error) {
        handleHttp(res, "ERROR_DELETE_PRODUCTO");
    }
}

const getProductoVariaciones = async (req: Request, res: Response)  => {
    try {
        const { id } = req.params;
        const response = await ProductoModel.findVariacionesById(Number(id));
        if (response) {
            res.status(200).send({ response });
            return;
        } else {
            res.status(404).send({ message: "Producto no encontrado" });
            return;
        }
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCTO_VARIACIONES");
    } 
}
const postProductoVariaciones = async (req: Request, res: Response) => {
    try {
        const { producto_id, nombre, precio_adicional = 0} = req.body;
        const variacionData : VariacionProducto = {
            producto_id,
            nombre,
            precio_adicional
        }
        const response = await ProductoModel.createProductoVariacion(variacionData);
        if (response) {
            res.status(201).send({ message: "Variacion creada correctamente" });
        }


    } catch (error) {
        handleHttp(res, "ERROR_POST_PRODUCTO_VARIACIONES");
    }
}
const putProductoVariaciones = async (req: Request, res: Response) => {
    try {
        const variacionData : Partial<VariacionProducto> = req.body;
        const { id_variacion} = req.params

        const response = await ProductoModel.updateProductoVariacion(Number(id_variacion), variacionData);

        if (response) {
            res.status(200).send({ message: "Variacion actualizada correctamente" });
        } else {
            res.status(404).send({ message: "Variacion no encontrada" });
        }
    } catch (error) {
        handleHttp(res, "ERROR_PUT_PRODUCTO_VARIACIONES",error);
    }
}
const deleteProductoVariaciones = async (req: Request, res: Response) => {
    try {
        const { id, id_variacion } = req.params;
        const response = await ProductoModel.deleteProductoVariacion(Number(id_variacion),Number(id));
        if (response) {
            res.status(200).send({ message: "Variacion eliminada correctamente" });
        }
        else {
            res.status(404).send({ message: "Variacion no encontrada" });
        }
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_PRODUCTO_VARIACIONES",error);
    }
}

export { getProductos, getProducto, updateProducto, postProducto, deleteProducto, getProductoVariaciones, postProductoVariaciones, putProductoVariaciones, deleteProductoVariaciones };