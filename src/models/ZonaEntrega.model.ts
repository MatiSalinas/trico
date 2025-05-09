import pool from "../db/connection";
import { ZonaEntrega } from "../interfaces/producto.interface";

export class ZonaEntregaModel {
    static async findZonasEntrega() : Promise<ZonaEntrega[] > {
        const sql = "SELECT * FROM zona_entrega;";
        const [rows] = await pool.execute(sql);
        return rows as ZonaEntrega[];
    }

    static async createZonaEntrega(zona: ZonaEntrega) : Promise<ZonaEntrega | null> {
        try {
            const {nombre,tipo,costo,radio_km} = zona
            const parametros = [nombre,tipo,costo,radio_km]
            const sql = "INSERT INTO zona_entrega (nombre, tipo, costo, radio_km) VALUES (?, ?, ?, ?);";
            const [result] = await pool.execute(sql,parametros);
            return (result as any).affectedRows == 0 ? null : zona;
        } catch (error) {
            throw new Error(`Error al crear la Zona Entrega ${error}`);
        }
    }
    
    static async updateZonaEntrega(id:number, zona: Partial<ZonaEntrega>) : Promise<boolean> {
        const entries = Object.entries(zona).filter(([key])=> key !== "id");
        if (entries.length === 0) return false;
        const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
        const values = entries.map(([, key]) => key);
        const sql = `UPDATE zona_entrega SET ${setClause} WHERE id_zona_entrega = ?;`
        const [result] = await pool.execute(sql,[...values,id]);
        return (result as any).affectedRows > 0;
    }
    static async deleteZonaEntrega(id:number) : Promise<boolean> {
        const sql = "DELETE FROM zona_entrega WHERE id_zona_entrega = ?;";
        const [result] = await pool.execute(sql,[id]);
        return (result as any).affectedRows > 0;
    }
}