// routes/division.routes.ts
import { Router } from "express";
import {
  getDivisions,
  getDivisionsByGrouping,
  createDivision,
  deleteDivision,
} from "../controllers/division.controllers";

const router = Router();

/**
 * @openapi
 * /api/division:
 *   get:
 *     tags:
 *       - Division
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getDivisions);

/**
 * @openapi
 * /api/division/{grouping}:
 *   get:
 *     tags:
 *       - Division
 *     parameters:
 *       - in: path
 *         name: grouping
 *         required: true
 *         schema:
 *           type: string
 *         description: Grouping value to filter divisions
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/:grouping", getDivisionsByGrouping);

/**
 * @openapi
 * /api/division:
 *   post:
 *     tags:
 *       - Division
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               divisionName:
 *                 type: string
 *               ageIntervalId:
 *                 type: integer
 *               minWeight:
 *                 type: integer
 *               maxWeight:
 *                 type: integer
 *               gender:
 *                 type: string
 *               grouping:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/", createDivision);

/**
 * @openapi
 * /api/division:
 *   delete:
 *     tags:
 *       - Division
 *     parameters:
 *       - name: divisionName
 *         in: query
 *         required: true
 *         description: Name of the division to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Division not found
 *       500:
 *         description: Error
 */
router.delete("/", deleteDivision);

export default router;
