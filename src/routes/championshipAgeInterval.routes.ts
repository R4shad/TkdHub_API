import { Router } from "express";
import {
  getChampionshipAgeIntervals,
  createChampionshipAgeInterval,
} from "../controllers/championshipAgeInterval.controllers";

const router = Router();

/**
 * @openapi
 * /api/championshipAgeInterval/{championshipId}:
 *   get:
 *     tags:
 *       - ChampionshipAgeInterval
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
router.get(
  "/championshipAgeInterval/:championshipId",
  getChampionshipAgeIntervals
);

/**
 * @openapi
 * /api/championshipAgeInterval/{championshipId}:
 *   post:
 *     tags:
 *       - ChampionshipAgeInterval
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
 *               ageIntervalId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post(
  "/championshipAgeInterval/:championshipId",
  createChampionshipAgeInterval
);

export default router;
