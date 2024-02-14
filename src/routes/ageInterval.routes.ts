import { Router } from "express";
import {
  getAgeIntervals,
  getAgeIntervalByChampionshipId,
  createAgeInterval,
  deleteAgeInterval,
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
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: championshipId value to filter ageInterval
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/:championshipId", getAgeIntervalByChampionshipId);

/**
 * @openapi
 * /api/ageInterval:
 *   post:
 *     tags:
 *       - AgeInterval
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ageIntervalName:
 *                 type: string
 *               minAge:
 *                 type: integer
 *               maxAge:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/", createAgeInterval);

/**
 * @openapi
 * /api/ageInterval/{ageIntervalId}:
 *   delete:
 *     tags:
 *       - AgeInterval
 *     parameters:
 *       - name: ageIntervalId
 *         in: path
 *         required: true
 *         description: ID of the age interval
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.delete("/:ageIntervalId", deleteAgeInterval);

export default router;
