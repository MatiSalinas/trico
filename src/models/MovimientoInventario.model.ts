import pool from '../db/connection';
import {MovimientoInventario} from '../interfaces/producto.interface';

export class MovimientoInventarioModel {
    static async findAllMovimientosInventario() : Promise<MovimientoInventario[]>{
        const sql = "SELECT * FROM movimientos_inventario;";
        const [rows] = await pool.execute(sql);
        return rows as MovimientoInventario[];
    }

    static async createMovimientoInventario(mov_inv: MovimientoInventario) : Promise <boolean>{
        const {ingrediente_id, cantidad, tipo, motivo, usuario_id} = mov_inv
        const values = [ingrediente_id, cantidad, tipo, motivo, usuario_id];
        const sql = "INSERT INTO movimientos_inventario (ingrediente_id, cantidad, tipo, motivo, usuario_id) VALUES (?, ?, ?, ?, ?);";

        const [result] = await pool.execute(sql,values);
        
        return (result as any).affectedRows > 0;
    }
}