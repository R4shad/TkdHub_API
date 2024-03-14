import { Router } from "express";
import {
  getChampionships,
  getChampionshipStage,
  createChampionship,
  updateStage,
  loginOrganizer,
  getChampionshipById,
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
 * /api/championship/{championshipId}:
 *   get:
 *     tags:
 *       - Championship
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
 *       500:
 *         description: Error
 */
router.get("/:championshipId", getChampionshipById);

/**
 * @openapi
 * /api/championship/stage/{championshipId}:
 *   get:
 *     tags:
 *       - Championship
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
 *               type: object
 *               properties:
 *                 stage:
 *                   type: string
 *                   description: Current stage of the championship
 *       500:
 *         description: Error
 */
router.get("/stage/:championshipId", getChampionshipStage);

/**
 * @openapi
 * /api/championship/updateStage/{championshipId}:
 *   put:
 *     tags:
 *       - Championship
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
 *       500:
 *         description: Error
 */
router.put("/updateStage/:championshipId", updateStage);

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
 *               championshipName:
 *                 type: string
 *               organizer:
 *                 type: string
 *               email:
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

/**
 * @openapi
 * /api/championship/login/{championshipId}:
 *   post:
 *     tags:
 *       - Championship
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
 *               organizerCi:
 *                 type: number
 *               organizerPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/login/:championshipId", loginOrganizer);

export default router;
