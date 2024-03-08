import { Router } from "express";
import {
  getCompetitors,
  getCompetitorsByClubCode,
  createCompetitor,
  updateCompetitor,
} from "../controllers/competitor.controllers";

const router = Router();

/**
 * @openapi
 * /api/competitor/{championshipId}:
 *   get:
 *     tags:
 *       - Competitor
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get("/:championshipId", getCompetitors);

/**
 * @openapi
 * /api/competitor/{championshipId}:
 *   post:
 *     tags:
 *       - Competitor
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
 *               participantId:
 *                 type: string
 *                 description: Id of the participant
 *               divisionName:
 *                 type: string
 *                 description: Name of the division
 *               categoryName:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createCompetitor);

/**
 * @openapi
 * /api/competitor/club/{championshipId}/{clubCode}:
 *   get:
 *     tags:
 *       - Competitor
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID of the championship
 *         schema:
 *           type: integer
 *       - name: clubCode
 *         in: path
 *         required: true
 *         description: Code of the club
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get("/club/:championshipId/:clubCode", getCompetitorsByClubCode);

/**
 * @openapi
 * /api/competitor/{competitorId}:
 *   patch:
 *     tags:
 *       - Competitor
 *     summary: Actualizar competidor
 *     description: Actualiza los detalles de un competidor específico.
 *     parameters:
 *       - name: competitorId
 *         in: path
 *         required: true
 *         description: ID del competidor
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participantId:
 *                 type: string
 *                 description: ID del participante
 *               championshipId:
 *                 type: integer
 *                 description: ID del campeonato
 *               divisionId:
 *                 type: integer
 *                 description: ID de la división
 *               categoryId:
 *                 type: integer
 *                 description: ID de la categoría
 *     responses:
 *       '200':
 *         description: Competidor actualizado exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontró el competidor
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:competitorId", updateCompetitor);

export default router;
