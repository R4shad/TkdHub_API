import { Router } from "express";
import {
  getMatchesByChampionshipId,
  getMatchesByChampionshipIdAndBracketId,
  createMatch,
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
 *               redParticipantId:
 *                 type: string
 *               blueParticipantId:
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

export default router;
