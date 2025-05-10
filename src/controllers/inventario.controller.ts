import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { MovimientoInventarioModel } from "../models/MovimientoInventario.model";
import { MovimientoInventario } from "../interfaces/producto.interface";

const getInventario = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_INVENTARIO");
        
    }
} 
const getInventarioMovimietnos = async (req: Request, res: Response) => {
    try {
        const response = await MovimientoInventarioModel.findAllMovimientosInventario();
        res.status(200).send(response);
    } catch (error) {
        handleHttp(res, "ERROR_GET_INVENTARIO_MOVIMIENTOS",error);

    }
} 
const postInventarioMovimientos = async (req: Request, res: Response) => {
    try {
        const movimientoData : MovimientoInventario = req.body;
        const response = await MovimientoInventarioModel.createMovimientoInventario(movimientoData);   
        if (response){
            res.status(201).send("Movimiento Creado Correctamente.")
            return;
        } 
        res.status(400).send("Error al crear el movimiento.")
    } catch (error) {
        handleHttp(res, "ERROR_POST_INVENTARIO_MOVIMIENTOS",error);

    }
} 

export { getInventario, getInventarioMovimietnos, postInventarioMovimientos };