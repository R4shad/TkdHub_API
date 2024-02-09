import { Router } from "express";
import {
  getChampionshipDivisions,
  createChampionshipDivision,
} from "../controllers/championshipDivision.controllers";

const router = Router();

/**
 * @swagger
 * /api/championshipDivision/{championshipId}:
 *   get:
 *     tags:
 *       - ChampionshipDivision
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:championshipId", getChampionshipDivisions);

/**
 * @swagger
 * /api/championshipDivision/{championshipId}:
 *   post:
 *     tags:
 *       - ChampionshipDivision
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               divisionName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Creado
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createChampionshipDivision);

export default router;
