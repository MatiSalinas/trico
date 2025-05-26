import e, { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { Pedido } from '../interfaces/producto.interface';
import { PedidoModel } from '../models/Pedido.model';
import { pedidoServicios } from '../services/pedidos.service';
import { CreatePedidoDTO } from '../interfaces/pedidos.interface';
//TODO pasar la logica de calcular el total de pedidos al backend
const postPedido = async (req: Request, res: Response) => {
    try {
        const pedidoData: CreatePedidoDTO = req.body;
        const id = await pedidoServicios.crearPedidoConDetalles(pedidoData);
        res.status(201).json({ mensaje: "Pedido creado con éxito", id_pedido: id });
    } catch (error) {
        handleHttp(res, "ERROR_POST_PEDIDO_CON_DETALLES", error);
    }
};
const getPedidos = async (req: Request, res: Response) => {
    try {
        const response = await PedidoModel.findAllPedidos();
        res.status(200).send(response);
    } catch (error) {
        handleHttp(res, "ERORR_GET_PEDIDOS",error);
    }
}
const getPedido = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const response = await pedidoServicios.getPedidoCompleto(Number(id));
        res.status(200).send(response);
    } catch (error) {
        handleHttp(res, "ERORR_GET_PEDIDO",error);
    }
}
const putPedidoEstado = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const estado = req.body;
        const response = await PedidoModel.updatePedido(Number(id),estado);
        if(response){
            res.status(200).send("Estado actualizado correctamente");
            return;
        }
        res.status(400).send("Error al actualizar el estado del pedido.")
    } catch (error) {
        handleHttp(res, "ERORR_PUT_PEDIDO_ESTADO",error);
    }
}
export { postPedido, getPedidos, getPedido, putPedidoEstado };