import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';

const getReporteDiario = (req: Request, res: Response) => {
    try {
        // Logic to get daily report
        res.status(200).json({ message: "Daily report retrieved successfully" });
    } catch (error) {
        handleHttp(res, "ERROR_GET_REPORTE_DIARIO");
    }
}

const getReporteSemanal = (req: Request, res: Response) => {
    try {
        // Logic to get daily report
        res.status(200).json({ message: "Daily report retrieved successfully" });
    } catch (error) {
        handleHttp(res, "ERROR_GET_REPORTE_SEMANAL");
    }
}

const getReporteMensual = (req: Request, res: Response) => {
    try {
        // Logic to get daily report
        res.status(200).json({ message: "Daily report retrieved successfully" });
    } catch (error) {
        handleHttp(res, "ERROR_GET_REPORTE_MENSUAL");
    }
}

const getReportePopulares = (req: Request, res: Response) => {
    try {
        // Logic to get daily report
        res.status(200).json({ message: "Daily report retrieved successfully" });
    } catch (error) {
        handleHttp(res, "ERROR_GET_REPORTE_POPULARES");
    }
}

const getReporteHoras = (req: Request, res: Response) => {
    try {
        // Logic to get daily report
        res.status(200).json({ message: "Daily report retrieved successfully" });
    } catch (error) {
        handleHttp(res, "ERROR_GET_REPORTE_HORAS");
    }
}

export { getReporteDiario, getReporteSemanal ,getReporteMensual, getReportePopulares, getReporteHoras };