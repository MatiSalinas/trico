import pool from "../db/connection";
import { DetallePedido } from "../interfaces/producto.interface";
//TODO pasar la logica de calcular el total de pedidos al backend
export class DetallePedidoModel {
    
    static async findDetallePedidoById(id: number) : Promise <DetallePedido[] | null> {
        try {
            const sql = "SELECT * FROM detalle_pedido WHERE pedido_id = ?;"
            const [row] = await pool.execute(sql,[id]);
            const detallePedido = (row as DetallePedido[]);
            return detallePedido.length < 0 ? null : detallePedido;
        } catch (error) {
            throw new Error(`Error al obtener el detalle ${error}`)
        }
      
    }

    static async updateDetallePedido(id: number, detalle:Partial <DetallePedido>) : Promise <boolean>{
        try{
            const entries = Object.entries(detalle).filter(([key])=> key !== "id");
            if (entries.length === 0){
                return false
            }
            const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
            const values = entries.map(([, key])=> key);
            const sql = `UPDATE detalle_pedido SET ${setClause} WHERE id_detalle_pedido = ?;`;
            const [result] = await pool.execute(sql,[...values,id]);
            return (result as any).affectedRows > 0;
        }catch(error){
            throw new Error(`Error al actualizar el producto`)
        }
        
    }
    
    static async deleteDetallePedido(id: number) : Promise <boolean> {
        const sql = `DELETE FROM detalle_pedido WHERE id_detalle_pedido = ?;`;
        const [result] = await pool.execute(sql,[id]);
        return (result as any).affectedRows > 0;
    }

    static async createDetallePedido(pedido_id: number, detalle: DetallePedido, conn: any): Promise<void> {
        const { producto_id, variacion_id, cantidad, precio_unitario, subtotal,  } = detalle;
        const observaciones = detalle.observaciones ?? null;
        console.log(detalle)
        const sql = `INSERT INTO detalle_pedido
            (pedido_id, producto_id, variacion_id, cantidad, precio_unitario, subtotal, observaciones)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        await conn.execute(sql, [
            pedido_id, producto_id, variacion_id, cantidad, precio_unitario, subtotal, observaciones
        ]);
}
}