import { Router } from "express";
import {
  getCoaches,
  createCoach,
  loginTrainer,
  getClubCode,
} from "../controllers/coach.controllers";

const router = Router();

/**
 * @openapi
 * /api/coach/{championshipId}:
 *   get:
 *     tags:
 *       - Coach
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
 *                 type: object
 *                 properties:
 *                   coachCi:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   clubCode:
 *                     type: string
 */
router.get("/:championshipId", getCoaches);

/**
 * @openapi
 * /api/coach/getClubCode/{coachCi}:
 *   get:
 *     tags:
 *       - Coach
 *     parameters:
 *       - name: coachCi
 *         in: path
 *         required: true
 *         description: ID of the coach
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 coachCi:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 clubCode:
 *                   type: string
 */
router.get("/getClubCode/:coachCi", getClubCode);

/**
 * @openapi
 * /api/coach/{championshipId}:
 *   post:
 *     tags:
 *       - Coach
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
 *               coachCi:
 *                 type: integer
 *               name:
 *                 type: string
 *               clubCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 coachCi:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 clubCode:
 *                   type: string
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createCoach);

/**
 * @openapi
 * /api/coach/login/{championshipId}:
 *   post:
 *     tags:
 *       - Coach
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
 *               coachCi:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/login/:championshipId", loginTrainer);

export default router;
