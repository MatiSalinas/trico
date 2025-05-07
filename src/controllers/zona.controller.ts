import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';

const postZonas = (req: Request, res: Response) =>{
    try {
        // Logic to create a new Zona
        res.status(201).json({ message: "Zona created successfully" });
    } catch (error) {
        handleHttp(res, "ERROR_POST_ZONAS");
    }
}

const getZona = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_GET_ZONA");
            
    }
}
const deleteZona = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_ZONA");

    }
}
const putZonaEstado = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_PUT_ZONA_ESTADO");

    }
}

const verificarZona = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_VERIFICAR_ZONA");

    }
}


export { postZonas, getZona, deleteZona, putZonaEstado, verificarZona };
