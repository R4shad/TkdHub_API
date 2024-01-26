import { Router } from "express";
import {
  getAgeIntervals,
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
 * /api/ageInterval:
 *   delete:
 *     tags:
 *       - AgeInterval
 *     parameters:
 *       - name: ageIntervalId
 *         in: query
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
router.delete("/", deleteAgeInterval);

export default router;
