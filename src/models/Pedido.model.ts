import pool from "../db/connection";
import { Pedido } from "../interfaces/producto.interface";

export class PedidoModel {
    static async findAllPedidos() : Promise<Pedido[]>{
        const sql = "SELECT * FROM pedidos;";
        const [rows] = await pool.execute(sql);
        return rows as Pedido[];
    }

    static async findPedidoByID(id: number) : Promise<Pedido | null>{
        const sql = "SELECT * FROM pedidos WHERE id_pedido = ?;";
        const [row] = await pool.execute(sql,[id]);
        const pedido = (row as Pedido[]);
        return pedido.length > 0 ? pedido[0] : null;
    }

    static async updatePedidoEstado(id: number, estado: string) : Promise <boolean>{
        const sql = "UPDATE pedido SET estado = ? WHERE id_pedido = ?;";
        const [result] = await pool.execute(sql,[estado,id]);
        return (result as any).affectedRows > 0;
    }

    static async updatePedido(id: number, pedido:Partial<Pedido>) : Promise<boolean>{
        
        const entries = Object.entries(pedido).filter(([key])=> key !== "id");
        const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
        const values = entries.map(([, key]) => key);

        const sql = `UPDATE pedido SET ${setClause} WHERE id_pedidp = ?;`;
        const [result] = await pool.execute(sql, values);
        return (result as any).affectedRows > 0;

    }

    static async createPedido(pedido: Pedido) : Promise <boolean>{
        const {nombre_cliente,
            telefono,
            direccion,
            latitud,
            longitud,
            zona_entrega,
            costo_envio,
            subtotal,
            total,
            metodo_pago,
            estado,
            origen,
            obervaciones} = pedido

            const parametros = [nombre_cliente,
                telefono,
                direccion,
                latitud,
                longitud,
                zona_entrega,
                costo_envio,
                subtotal,
                total,
                metodo_pago,
                estado,
                origen,
                obervaciones]
        const sql = "INSERT INTO pedido (nombre_cliente, telefono, direccion, latitud, longitud, zona_entrega, costo_envio, sub_total, total, metodo_pago,estado,origen,observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        const [result] = await pool.execute(sql,parametros)
        return (result as any).affectedRows > 0;

       
    }

    static async createPedidoTx(pedido: Pedido, conn: any): Promise<number> {
        const {
            nombre_cliente, telefono, direccion, latitud, longitud,
            zona_entrega, costo_envio, subtotal, total,
            metodo_pago, estado, origen, obervaciones
        } = pedido;

        const sql = `INSERT INTO pedidos 
          (nombre_cliente, telefono, direccion, latitud, longitud, zona_entrega, costo_envio, subtotal, total, metodo_pago, estado, origen, observaciones)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await conn.execute(sql, [
            nombre_cliente, telefono, direccion, latitud, longitud,
            zona_entrega, costo_envio, subtotal, total,
            metodo_pago, estado, origen, obervaciones
        ]);

        return (result as any).insertId;
}
    static async deletePedido(id: number) : Promise<boolean> {
            const sql = "DELETE FROM pedido WHERE id_pedido = ?;";
            const [row] = await pool.execute(sql,[id]);
            return (row as any).affectedRows > 0;
    }
}