// routes/division.routes.ts
import { Router } from "express";
import {
  getDivisions,
  getDivisionsByAgeIntervalId,
  getChampionshipDivisions,
  getDivisionsByDivisionName,
  createChampionshipDivision,
  incrementDivisionCompetitors,
  getChampionshipDivisionsWithCompetitors,
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
 * /api/division/{championshipId}:
 *   get:
 *     tags:
 *       - Division
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: championshipId value to filter divisions
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/:championshipId", getChampionshipDivisions);

/**
 * @openapi
 * /api/division/data/{divisionName}:
 *   get:
 *     tags:
 *       - Division
 *     parameters:
 *       - in: path
 *         name: divisionName
 *         required: true
 *         schema:
 *           type: string
 *         description: championshipId value to filter divisions
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/data/:divisionName", getDivisionsByDivisionName);

/**
 * @openapi
 * /api/division/ages/{ageIntervalId}:
 *   get:
 *     tags:
 *       - Division
 *     parameters:
 *       - in: path
 *         name: ageIntervalId
 *         required: true
 *         schema:
 *           type: integer
 *         description: AgeIntervalId value to filter divisions
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/ages/:ageIntervalId", getDivisionsByAgeIntervalId);

/**
 * @swagger
 * /api/division/{championshipId}:
 *   post:
 *     tags:
 *       - Division
 *     summary: Crear divisiones para un campeonato
 *     description: Crea divisiones para un campeonato específico utilizando el ID del campeonato proporcionado.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content: {}
 *     responses:
 *       '201':
 *         description: Divisiones creadas con éxito
 *       '500':
 *         description: Error interno del servidor
 */
router.post("/:championshipId", createChampionshipDivision);

/**
 * @swagger
 * /api/championshipDivision/increment/{championshipId}/{divisionName}:
 *   put:
 *     tags:
 *       - ChampionshipDivision
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: divisionName
 *         in: path
 *         required: true
 *         description: Nombre de la división
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.put(
  "/increment/:championshipId/:divisionName",
  incrementDivisionCompetitors
);

/**
 * @swagger
 * /api/championshipDivision/{championshipId}/withCompetitors:
 *   get:
 *     tags:
 *       - ChampionshipDivision
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get(
  "/:championshipId/withCompetitors",
  getChampionshipDivisionsWithCompetitors
);

export default router;
