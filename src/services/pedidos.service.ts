import { DetallePedidoModel } from "../models/DetallePedido.model";
import { PedidoModel } from "../models/Pedido.model";

export class pedidoServicios {
    static async getPedidoCompleto(id:number){
        const pedido = await PedidoModel.findPedidoByID(id);
        const productos = await DetallePedidoModel.getDetallePedidoById(id)
        console.log(pedido);
        console.log(productos);
    }
}