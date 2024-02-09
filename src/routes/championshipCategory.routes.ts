import { Router } from "express";
import {
  getChampionshipCategories,
  createChampionshipCategory,
} from "../controllers/championshipCategory.controllers";

const router = Router();

/**
 * @swagger
 * /api/championshipCategory/{championshipId}:
 *   get:
 *     tags:
 *       - ChampionshipCategory
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
router.get("/:championshipId", getChampionshipCategories);

/**
 * @swagger
 * /api/championshipCategory/{championshipId}:
 *   post:
 *     tags:
 *       - ChampionshipCategory
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
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Creado
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createChampionshipCategory);

export default router;
