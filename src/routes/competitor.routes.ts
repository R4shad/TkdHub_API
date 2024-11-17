import { Router } from "express";
import {
  getCompetitors,
  getCompetitorsByClubCode,
  createCompetitor,
  updateCompetitor,
  deleteCompetitor,
  deleteCompetitorPid,
  getCompetitorsNotParticipating,
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
 * /api/competitor/notParticipate/{championshipId}:
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
router.get("/notParticipate/:championshipId", getCompetitorsNotParticipating);

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

/**
 * @openapi
 * /api/competitor/{competitorId}:
 *   delete:
 *     tags:
 *       - Competitor
 *     summary: Eliminar competidor del campeonato
 *     description: Elimina un competidor de un campeonato mediante su ID de competidor.
 *     parameters:
 *       - name: competitorId
 *         in: path
 *         required: true
 *         description: ID del participante
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Participante eliminado exitosamente
 *       '404':
 *         description: Participante no encontrado
 *       '500':
 *         description: Error al procesar la solicitud
 */
router.delete("/:competitorId", deleteCompetitor);

/**
 * @openapi
 * /api/competitor/pId/{participantId}:
 *   delete:
 *     tags:
 *       - Competitor
 *     summary: Eliminar competidor del campeonato
 *     description: Elimina un competidor de un campeonato mediante su ID de participante.
 *     parameters:
 *       - name: participantId
 *         in: path
 *         required: true
 *         description: ID del participante
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Participante eliminado exitosamente
 *       '404':
 *         description: Participante no encontrado
 *       '500':
 *         description: Error al procesar la solicitud
 */
router.delete("/pId/:participantId", deleteCompetitorPid);

export default router;
