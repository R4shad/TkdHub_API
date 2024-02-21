import { Router } from "express";
import {
  getBrackets,
  getBracketsByChampionshipId,
  getBracketsWithCompetitorsByChampionshipId,
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
 *               divisionName:
 *                 type: string
 *               categoryName:
 *                 type: string
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
 * /api/bracket:
 *   delete:
 *     tags:
 *       - Bracket
 *     parameters:
 *       - name: bracketId
 *         in: query
 *         required: true
 *         description: ID of the bracket to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Bracket not found
 *       500:
 *         description: Error
 */
router.delete("/", deleteBracket);

export default router;
