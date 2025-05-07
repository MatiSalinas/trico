import pool from "../db/connection";
import { Categoria } from "../interfaces/producto.interface";
export class CategoriaModel {

    static async findAll(): Promise<Categoria[]>{
        try {
            const sql = "SELECT * FROM categorias WHERE activo = 1 ORDER BY orden ASC;";
            const [rows] = await pool.execute(sql);
            return rows as Categoria[];
        } catch (error) {
            throw new Error(`Error al obtener las categorias ${error}`);
        }
    }

    static async updateCategoria(id: number ,categoria : Partial<Categoria>) : Promise<boolean> {
        try {
             // Construimos dinámicamente la consulta de actualización
            const entries = Object.entries(categoria).filter(([key]) => key !== 'id');

            if (entries.length === 0) return false;

            const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
            const values = entries.map(([, value]) => value);
            const query = `UPDATE categorias SET ${setClause} WHERE id_categoria = ?`;
            console.log(query);
            const [result] = await pool.query(query, [...values, id]);

            return (result as any).affectedRows > 0;

        } catch (error) {
            throw new Error(`Error al actualizar la Categoria: ${error}`)
        }
    }
    static async createCategoria(categoria: Categoria ): Promise<Categoria> {
        try {
            const {nombre, descripcion, orden, activo} = categoria;
            const sql = "INSERT INTO categorias (nombre, descripcion, orden, activo) VALUES (?, ?, ?, ?);"
            const parametros = [nombre, descripcion, orden, activo];

            const [result] = await pool.execute(sql,parametros);
            const insertId = (result as any).insertId
            return {...categoria, id:insertId};
        } catch (error) {
            throw new Error(`Error al crear una nueva Categoria ${error}`);
        }
    }

    static async deleteCategoria(id: number): Promise<boolean> {
        try {
            const sql = "DELETE FROM categorias WHERE id_categoria = ?;";
            const [ result ] = await pool.execute(sql, [id]);
            const affectedRows = (result as any).affectedRows;
            console.log(affectedRows);
            if (affectedRows === 0) {
                return false; // No se eliminó ninguna fila, el ID no existe
            }
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar la Categoria ${error}`);
        }
    }
}
