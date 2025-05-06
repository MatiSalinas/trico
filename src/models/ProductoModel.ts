import  pool  from '../db/connection';
import { Producto, VariacionProducto } from '../interfaces/producto.interface';

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

    static async updateProducto(id: number, producto: Partial<Producto>): Promise<boolean> {
        const entries = Object.entries(producto).filter(([key]) => key !== 'id');
        if (entries.length === 0) return false;
        const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
            const values = entries.map(([, value]) => value);
            const query = `UPDATE producto SET ${setClause} WHERE id_producto = ?`;
            const [result] = await pool.query(query, [...values, id]);
            return (result as any).affectedRows > 0;
    }

    static async createProducto(producto: Producto): Promise<Producto> {
        try {
            const { categoria_id,nombre, descripcion, precio, imagen, disponible } = producto;
            const parametros = [categoria_id,nombre, descripcion, precio, imagen, disponible];
            const sql = "INSERT INTO productos (categoria_id,nombre, descripcion, precio, imagen, disponible) VALUES (?, ?, ?, ?, ?, ?);"
            const [result] = await pool.execute(sql, parametros);
            const insertId = (result as any).insertId;
            return { ...producto, id: insertId };
        } catch (error) {
            throw new Error(`Error al crear un nuevo producto ${error}`);
        }

    }
    
    static async deleteProducto(id: number) : Promise<boolean> {
        try {
            const sql = "DELETE FROM productos WHERE id_producto = ?;";
            const [result] = await pool.execute(sql, [id]);
            const affectedRows = (result as any).affectedRows;
            if (affectedRows === 0) {
                return false; // No se eliminó ninguna fila, el ID no existe
            }
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el producto ${error}`);
        }
    }

    static async findVariacionesById(id: number): Promise<VariacionProducto[]> {
        try {
            const sql = "SELECT * FROM variaciones_producto WHERE producto_id = ?;"
            const [rows] = await pool.execute(sql, [id]);
            return rows as VariacionProducto[];
        } catch (error) {
            throw new Error(`Error al obtener las variaciones del producto ${error}`);
        }
}

}