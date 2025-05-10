import pool from "../db/connection";
import { DetallePedido } from "../interfaces/producto.interface";

export class DetallePedidoModel {
    
    static async getDetallePedidoById(id: number) : Promise <DetallePedido[] | null> {
        try {
            const sql = "SELECT * FROM detalle_pedido WHERE id_pedido = ?;"
            const [row] = await pool.execute(sql,[id]);
            const detallePedido = (row as DetallePedido[]);
            return detallePedido.length < 0 ? null : detallePedido;
        } catch (error) {
            throw new Error(`Error al obtener el detalle`)
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
}