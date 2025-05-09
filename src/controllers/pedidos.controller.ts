import e, { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { Pedido } from '../interfaces/producto.interface';
import { PedidoModel } from '../models/Pedido.model';

const postPedido = async (req: Request, res: Response) => {
    try {
        const pedidoData : Pedido = req.body;
        const response = await PedidoModel.createPedido(pedidoData);
        if(response){
            res.status(201).send("Producto Creado con exito");
            return;
        }
        res.status(400).send("No se pudo cargar el producto");
    } catch (error) {
        handleHttp(res, "ERORR_POST_PEDIDOS",error);
    }
}
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
        const response = await PedidoModel.findPedidoByID(Number(id));
        res.status(200).send(response);
    } catch (error) {
        handleHttp(res, "ERORR_GET_PEDIDO",error);
    }
}
const putPedidoEstado = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERORR_PUT_PEDIDO_ESTADO");
    }
}
export { postPedido, getPedidos, getPedido, putPedidoEstado };