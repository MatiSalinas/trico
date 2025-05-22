import { PedidoConDetalles, Pedido, DetallePedido } from "../interfaces/producto.interface";
import { DetallePedidoModel } from "../models/DetallePedido.model";
import { ProductoModel } from "../models/Producto.model";
import { PedidoModel } from "../models/Pedido.model";
import  pool  from "../db/connection";

export class pedidoServicios {
     /**
     * Obtiene un pedido completo con todos sus detalles, productos y variaciones
     * @param id ID del pedido a consultar
     * @returns Pedido completo con todos sus detalles enriquecidos
     */
     static async getPedidoCompleto(id: number): Promise<PedidoConDetalles> {
        const pedido = await PedidoModel.findPedidoByID(id);
        if (!pedido) {
            throw new Error("No se encontró el pedido");
        }

        const detalles = await DetallePedidoModel.findDetallePedidoById(id);
        if (!detalles || detalles.length === 0) {
            throw new Error("El pedido no tiene productos");
        }

        // Enriquecer cada detalle con la información del producto y su variación
        const detallesEnriquecidos = await Promise.all(detalles.map(async (detalle) => {
            const producto = await ProductoModel.findById(detalle.producto_id);
            
            if (!producto) {
                throw new Error(`No se encontró el producto con ID ${detalle.producto_id}`);
            }
            
            // Encontrar la variación específica
            const variacion = await ProductoModel.findVariacionById(detalle.variacion_id);
            
            // Si no hay variación, creamos una variación predeterminada para cumplir con el tipo
            const variacionFinal = variacion || {
                id: 0,
                producto_id: producto.id || 0,
                nombre: "Sin variación",
                precio_adicional: 0
            };
            
            return {
                ...detalle,
                producto: producto,
                variacion: variacionFinal
            };
        }));

        // Construir el objeto PedidoConDetalles completo
        const pedidoCompleto: PedidoConDetalles = {
            ...pedido,
            detalles: detallesEnriquecidos
        };

        return pedidoCompleto;
    }


    static async crearPedidoConDetalles(pedido: Pedido): Promise<number> {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      // 1. Insertar el pedido
      const idPedido = await PedidoModel.createPedidoTx(pedido, conn);

      // 2. Insertar detalles
      const detalles = pedido.detalles || [];
      for (const detalle of detalles) {
        await DetallePedidoModel.createDetallePedidoTx(idPedido, detalle, conn);
      }

      // 3. Confirmar la transacción
      await conn.commit();
      return idPedido;

    } catch (error) {
      await conn.rollback();
      throw new Error(`Error al crear el pedido con detalles: ${error}`);
    } finally {
      conn.release();
    }
  }
}