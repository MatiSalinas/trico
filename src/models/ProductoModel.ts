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


    static async findById(id: number): Promise<Producto | null> {
        try {
            const sql = "SELECT * FROM productos WHERE id_producto = ? AND disponible = 1;"
            const [row] = await pool.execute(sql , [id]);
            const producto = (row as Producto[]);
            return producto.length > 0 ? producto[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener el producto ${error}`);
        }
    }
}