import { Router } from "express";
import {
  getChampionships,
  createChampionship,
} from "../controllers/championship.controllers";

const router = Router();
/**
 * @openapi
 * /api/championship:
 *   get:
 *     tags:
 *       - Championship
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getChampionships);
/**
 * @openapi
 * /api/championship:
 *   post:
 *     tags:
 *       - Championship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               organizer:
 *                 type: string
 *               championshipDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/", createChampionship);

export default router;
