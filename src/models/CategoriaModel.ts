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
}
