import  pool  from '../db/connection';
import { Producto } from '../interfaces/producto.interface';

export class ProductoModel {
    static async findAll(): Promise<Producto[]> {
        try {
            const sql = "SELECT * FROM productos WHERE disponible = 1 ORDER BY id_producto ASC;";
            const [rows] = await pool.execute(sql);
            return rows as Producto[];
        } catch (error) {
            throw new Error(`Error al obtener los productos ${error}`);
        }
    }
}