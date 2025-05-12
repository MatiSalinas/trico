import pool from "../db/connection";
import { ProductoIngrediente } from "../interfaces/producto.interface";

export class ProductoIngredienteModel {
    static async findProductoIngrediente() : Promise <ProductoIngrediente[]> {
        const sql = "SELECT * FROM producto_ingredientes;";
        const [rows] = await pool.execute(sql);
        return rows as ProductoIngrediente[]
    }

    static async createProductoIngrediente(data: ProductoIngrediente) : Promise<boolean> {
        const {producto_id, ingrediente_id, cantidad} = data
        const sql = "INSERT INTO producto_ingredientes (producto_id, ingrediente_id, cantidad) VALUES (?, ?, ?);";

        const [result] = await pool.execute(sql,[producto_id,ingrediente_id, cantidad]);

        return (result as any).affectedRows > 0;
    }

    static async updateProductoIngrediente(id: number, cantidad: number) : Promise<boolean> {
        const sql = "UPDATE producto_ingredientes SET cantidad = ? WHERE id_producto_ingredientes = ?;";
        const [result] = await pool.execute(sql,[cantidad,id]);
        return (result as any).affectedRows > 0;
    }

    static async deleteProductoIngrediente(id: number) : Promise<boolean> {
        const sql = "DELETE producto_ingredientes WHERE id_producto_ingredientes = ?;";
        const [result] = await pool.execute(sql,[id]);
        return (result as any).affectedRows > 0;
    }
}