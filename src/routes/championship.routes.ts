import { Router } from "express";
import {
  getChampionships,
  createChampionship,
} from "../controllers/championship.controllers";

const router = Router();
/**
 * @openapi
 * /api/championship:
 *   get:
 *     tags:
 *       - Championship
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getChampionships);
/**
 * @openapi
 * /api/championship:
 *   post:
 *     tags:
 *       - Championship
 *     summary: Crea un nuevo championship
 *     requestBody:
 *       description: Datos del championship a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del campeonato.
 *               organizador:
 *                 type: string
 *                 description: Nombre de la organizacion o la persona que organiza.
 *     responses:
 *       200:
 *         description: Campeonato creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/", createChampionship);

export default router;
