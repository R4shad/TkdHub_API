import { Router } from "express";
import {
  getAgeIntervals,
  getChampionshipAgeIntervals,
  createChampionshipAgeInterval,
} from "../controllers/ageInterval.controllers";

const router = Router();

/**
 * @openapi
 * /api/ageInterval:
 *   get:
 *     tags:
 *       - AgeInterval
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getAgeIntervals);

/**
 * @openapi
 * /api/ageInterval/{championshipId}:
 *   get:
 *     tags:
 *       - AgeInterval
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
router.get("/:championshipId", getChampionshipAgeIntervals);

/**
 * @openapi
 * /api/ageInterval/{championshipId}:
 *   post:
 *     tags:
 *       - AgeInterval
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID of the championship
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content: {}
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createChampionshipAgeInterval);

export default router;
