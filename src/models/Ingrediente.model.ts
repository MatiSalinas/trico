import  pool  from '../db/connection';
import { Ingrediente } from "../interfaces/producto.interface";

export class IngredientesModel {
    static async findAll() : Promise<Ingrediente[]> {
    try {
        const sql = "SELECT * FROM ingredientes ORDER BY nombre ASC;";
        const [rows] = await pool.execute(sql);
        return rows as Ingrediente[];
    }catch (error) {
        throw new Error(`Error al obtener los ingredientes ${error}`);
    }
    }

    static async createIngrediente(ingrediente: Ingrediente): Promise<Ingrediente> {
        try {
            const { nombre, stock, unidad_medida, costo } = ingrediente;
            const parametros = [nombre, stock, unidad_medida, costo];
            const sql = "INSERT INTO ingredientes (nombre, stock, unidad_medida, costo) VALUES (?, ?, ?, ?);"
            const [result] = await pool.execute(sql, parametros);
            const insertId = (result as any).insertId;
            return { ...ingrediente, id: insertId };
        } catch (error) {
            throw new Error(`Error al crear un nuevo ingrediente ${error}`);

        }
    }
    static async updateIngrediente(id: number, ingrediente: Partial<Ingrediente>): Promise<boolean> {
        const entries = Object.entries(ingrediente).filter(([key]) => key !== "id");
        const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
        const values = entries.map(([, value])=> value);
        const sql = `UPDATE ingredientes SET ${setClause} WHERE id_ingrediente = ?;`;
        const [result] = await pool.query(sql, [...values, id]);
        return (result as any).affectedRows > 0;
    }

    static async deleteIngrediente(id: Number) : Promise<boolean> {
        const sql = "DELETE FROM ingredientes WHERE id_ingrediente = ?;";
        const [result] = await pool.execute(sql,[id]);
        return (result as any).affectedRows > 0;
    }
}