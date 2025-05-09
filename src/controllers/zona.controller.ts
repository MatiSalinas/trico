import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { ZonaEntrega } from '../interfaces/producto.interface';
import { ZonaEntregaModel } from '../models/ZonaEntrega.model';

const postZonas = async (req: Request, res: Response) =>{
    try {
        const zonaData: ZonaEntrega = req.body;
        const response = await ZonaEntregaModel.createZonaEntrega(zonaData);
        if(response){
            res.status(201).send({message:"Zona creada con exito",response});
            return;
        }
        res.status(400).send("No se creo la zona.")
    } catch (error) {
        handleHttp(res, "ERROR_POST_ZONAS",error);
    }
}

const getZona = async(req: Request, res: Response) => {
    try {
        const response = await ZonaEntregaModel.findZonasEntrega();
        if(response){
            res.status(200).send(response);
            return;
        }
        res.status(400).send("No se encontraron zonas");

    } catch (error) {
        handleHttp(res, "ERROR_GET_ZONA",error);
            
    }
}
const deleteZona = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_ZONA");

    }
}
const putZonaEstado = async (req: Request, res: Response) => {
    try {
        const zonaData : Partial<ZonaEntrega> = req.body;
        const {id} = req.params
        const response = await ZonaEntregaModel.updateZonaEntrega(Number(id), zonaData);
        if(response){
            res.status(200).send("Producto actualizado con exito");
            return;
        }
        res.status(400).send("Error al actualizar el producto.")

    } catch (error) {
        handleHttp(res, "ERROR_PUT_ZONA_ESTADO",error);

    }
}

const verificarZona = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, "ERROR_VERIFICAR_ZONA");

    }
}


export { postZonas, getZona, deleteZona, putZonaEstado, verificarZona };
