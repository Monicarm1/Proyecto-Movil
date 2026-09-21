import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";
import { obtenerReportes } from "../controllers/reporte.controller.js";


const router = Router();


router.get("/", authMiddleware, adminMiddleware, obtenerReportes);

export default router;