import { Router } from "express";
import {
  getBrackets,
  getBracketsByChampionshipId,
  getBracketsWithCompetitorsByChampionshipId,
  getBracketsWithOneCompetitorByChampionshipId,
  getBracketsWithMatchesByChampionshipId,
  createBracket,
  deleteBracket,
} from "../controllers/bracket.controllers";

const router = Router();

/**
 * @openapi
 * /api/bracket:
 *   get:
 *     tags:
 *       - Bracket
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getBrackets);

/**
 * @openapi
 * /api/bracket/{championshipId}:
 *   get:
 *     tags:
 *       - Bracket
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: championshipId value to filter brackets
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/:championshipId", getBracketsByChampionshipId);

/**
 * @openapi
 * /api/bracket/withCompetitors/{championshipId}:
 *   get:
 *     tags:
 *       - Bracket
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: championshipId value to filter brackets
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get(
  "/withCompetitors/:championshipId",
  getBracketsWithCompetitorsByChampionshipId
);

/**
 * @openapi
 * /api/bracket/withOneCompetitor/{championshipId}:
 *   get:
 *     tags:
 *       - Bracket
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: championshipId value to filter brackets
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get(
  "/withOneCompetitor/:championshipId",
  getBracketsWithOneCompetitorByChampionshipId
);

/**
 * @openapi
 * /api/bracket/withMatchs/{championshipId}:
 *   get:
 *     tags:
 *       - Bracket
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: championshipId value to filter brackets
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get(
  "/withMatchs/:championshipId",
  getBracketsWithMatchesByChampionshipId
);

/**
 * @openapi
 * /api/bracket:
 *   post:
 *     tags:
 *       - Bracket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               divisionId:
 *                 type: number
 *               categoryId:
 *                 type: number
 *               championshipId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/", createBracket);

/**
 * @openapi
 * /api/bracket/{bracketId}:
 *   delete:
 *     tags:
 *       - Bracket
 *     summary: Eliminar competidor del campeonato
 *     description: Elimina un competidor de un campeonato mediante su ID de competidor.
 *     parameters:
 *       - name: bracketId
 *         in: path
 *         required: true
 *         description: ID del participante
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Participante eliminado exitosamente
 *       '404':
 *         description: Participante no encontrado
 *       '500':
 *         description: Error al procesar la solicitud
 */
router.delete("/:bracketId", deleteBracket);

export default router;
