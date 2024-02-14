import { Router } from "express";
import {
  getCompetitors,
  getCompetitorsByClubCode,
  createCompetitor,
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
 *               participantCi:
 *                 type: integer
 *                 description: CI of the participant
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

export default router;
