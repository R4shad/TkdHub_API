// routes/club.routes.ts
import { Router } from "express";
import { getClubs, createClub } from "../controllers/club.controllers"; // Asegúrate de importar los controladores correctos

const router = Router();

/**
 * @openapi
 * /api/club/{championshipId}:
 *   get:
 *     tags:
 *       - Club
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID of the championship
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:championshipId", getClubs);

/**
 * @openapi
 * /api/club/{championshipId}:
 *   post:
 *     tags:
 *       - Club
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID of the championship
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clubCode:
 *                 type: string
 *               name:
 *                 type: string
 *               coachCi:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createClub);

export default router;
