import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';

const postPedido = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERORR_POST_PEDIDOS");
    }
}
const getPedidos = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERORR_GET_PEDIDOS");
    }
}
const getPedido = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERORR_GET_PEDIDO");
    }
}
const putPedidoEstado = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERORR_PUT_PEDIDO_ESTADO");
    }
}
export { postPedido, getPedidos, getPedido, putPedidoEstado };