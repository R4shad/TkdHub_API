import { Router } from "express";
import {
  getMatchesByChampionshipId,
  getMatchesByChampionshipIdAndBracketId,
  getMatchIdByBracketIdAndRound,
  createMatch,
  updateMatch,
  updateMatchRounds,
} from "../controllers/match.controllers";

const router = Router();

/**
 * @openapi
 * /api/match/{championshipId}:
 *   get:
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del campeonato para filtrar partidos
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/:championshipId", getMatchesByChampionshipId);

/**
 * @openapi
 * /api/match/{championshipId}/{bracketId}:
 *   get:
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del campeonato para filtrar partidos
 *       - in: path
 *         name: bracketId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bracket para filtrar partidos
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get(
  "/:championshipId/:bracketId",
  getMatchesByChampionshipIdAndBracketId
);

/**
 * @openapi
 * /api/match/{championshipId}:
 *   post:
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del campeonato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bracketId:
 *                 type: integer
 *               redCompetitorId:
 *                 type: string
 *               blueCompetitorId:
 *                 type: string
 *               round:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createMatch);

/**
 * @openapi
 * /api/match/getId/{bracketId}/{round}:
 *   get:
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: bracketId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bracket para filtrar partidos
 *       - in: path
 *         name: round
 *         required: true
 *         schema:
 *           type: string
 *         description: Ronda del partido
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No se encontraron partidos para el bracket y la ronda especificados
 *       500:
 *         description: Error
 */
router.get("/getId/:bracketId/:round", getMatchIdByBracketIdAndRound);

/**
 * @openapi
 * /api/match/{matchId}:
 *   patch:
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del partido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bracketId:
 *                 type: integer
 *               redCompetitorId:
 *                 type: string
 *               blueCompetitorId:
 *                 type: string
 *               round:
 *                 type: string
 *               redRounds:
 *                 type: integer
 *               blueRounds:
 *                 type: integer
 *               championshipId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.patch("/:matchId", updateMatch);

/**
 * @swagger
 * /api/match/{matchId}/updateRounds:
 *   patch:
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del partido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               redRounds:
 *                 type: integer
 *               blueRounds:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Partido no encontrado
 *       500:
 *         description: Error
 */
router.patch("/:matchId/updateRounds", updateMatchRounds);

export default router;
