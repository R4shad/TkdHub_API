import { Router } from "express";
import {
  getResponsibles,
  createResponsible,
  loginResponsible,
} from "../controllers/responsible.controllers";

const router = Router();

/**
 * @openapi
 * /api/responsible/{championshipId}:
 *   get:
 *     tags:
 *       - Responsible
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
router.get("/:championshipId", getResponsibles);

/**
 * @openapi
 * /api/responsible/{championshipId}:
 *   post:
 *     tags:
 *       - Responsible
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
 *               responsibleCi:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createResponsible);

/**
 * @openapi
 * /api/responsible/login/{championshipId}:
 *   post:
 *     tags:
 *       - Responsible
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
 *               responsibleCi:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/login/:championshipId", loginResponsible);

export default router;
