import { Router } from 'express';
import { getReporteDiario, getReporteHoras, getReporteMensual, getReportePopulares, getReporteSemanal } from '../controllers/reportes.controller';
const router = Router();

router.get("/ventas/diario", getReporteDiario );
router.get("/ventas/semana", getReporteSemanal );
router.get("/ventas/mensual", getReporteMensual );
router.get("/productos/populares", getReportePopulares );
router.get("/productos/horas", getReporteHoras );




export { router };