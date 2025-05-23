// routes/division.routes.ts
import { Router } from "express";
import {
  getDivisions,
  getDivisionsByAgeIntervalId,
  getChampionshipDivisions,
  getDivisionsByDivisionId,
  updateChampionshipDivision,
  createChampionshipDivisionsAndAgeIntervals,
  incrementDivisionCompetitors,
  getChampionshipDivisionsWithCompetitors,
  deleteChampionshipDivision,
  getDivisionsByGenderAgeAndWeight,
  deleteChampionshipDivisions,
  decrementDivisionCompetitors,
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
 * /api/division/data/{divisionId}:
 *   get:
 *     tags:
 *       - Division
 *     parameters:
 *       - in: path
 *         name: divisionId
 *         required: true
 *         schema:
 *           type: number
 *         description: championshipId value to filter divisions
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/data/:divisionId", getDivisionsByDivisionId);

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
 * @openapi
 * /api/division/weight/{championshipId}/{gender}/{ageIntervalId}/{weight}:
 *   get:
 *     tags:
 *       - Division
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del campeonato para filtrar las divisiones
 *       - in: path
 *         name: gender
 *         required: true
 *         schema:
 *           type: string
 *         description: Género para filtrar las divisiones
 *       - in: path
 *         name: ageIntervalId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del intervalo de edad para filtrar las divisiones
 *       - in: path
 *         name: weight
 *         required: true
 *         schema:
 *           type: integer
 *         description: Peso para filtrar las divisiones
 *     responses:
 *       '200':
 *         description: Éxito
 *       '500':
 *         description: Error interno del servidor
 */
router.get(
  "/weight/:championshipId/:gender/:ageIntervalId/:weight",
  getDivisionsByGenderAgeAndWeight
);

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
router.post("/:championshipId", createChampionshipDivisionsAndAgeIntervals);

/**
 * @swagger
 * /api/division/increment/{championshipId}/{divisionId}:
 *   put:
 *     tags:
 *       - Division
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: divisionId
 *         in: path
 *         required: true
 *         description: ID de la división
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.put(
  "/increment/:championshipId/:divisionId",
  incrementDivisionCompetitors
);

/**
 * @swagger
 * /api/division/decrement/{championshipId}/{divisionId}:
 *   put:
 *     tags:
 *       - Division
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: divisionId
 *         in: path
 *         required: true
 *         description: ID de la división
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.put(
  "/decrement/:championshipId/:divisionId",
  decrementDivisionCompetitors
);

/**
 * @openapi
 * /api/division/{championshipId}/{divisionId}:
 *   patch:
 *     tags:
 *       - Division
 *     summary: Actualizar división de un campeonato
 *     description: Actualiza los detalles de una división de un campeonato específico.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: divisionId
 *         in: path
 *         required: true
 *         description: ID de la división
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               divisionName:
 *                 type: string
 *                 description: Nombre de la división
 *               ageIntervalId:
 *                 type: integer
 *                 description: ID del intervalo de edad
 *               minWeight:
 *                 type: integer
 *                 description: Peso mínimo
 *               maxWeight:
 *                 type: integer
 *                 description: Peso máximo
 *               gender:
 *                 type: string
 *                 description: Género de la división
 *               grouping:
 *                 type: string
 *                 description: Agrupamiento de la división
 *               numberOfCompetitors:
 *                 type: integer
 *                 description: Número de competidores en la división
 *     responses:
 *       '200':
 *         description: División actualizada exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontró la división o el campeonato
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:championshipId/:divisionId", updateChampionshipDivision);

/**
 * @swagger
 * /api/division/{championshipId}/withCompetitors:
 *   get:
 *     tags:
 *       - Division
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

/**
 * @openapi
 * /api/division/{divisionId}:
 *   delete:
 *     tags:
 *       - Division
 *     summary: Eliminar división de campeonato
 *     description: Elimina una división de campeonato específica por su ID.
 *     parameters:
 *       - name: divisionId
 *         in: path
 *         required: true
 *         description: ID de la división de campeonato
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: División de campeonato eliminada exitosamente
 *       '404':
 *         description: No se encontró la división de campeonato
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/:divisionId", deleteChampionshipDivision);

/**
 * @openapi
 * /api/division/{championshipId}/{grouping}:
 *   delete:
 *     tags:
 *       - Division
 *     summary: Eliminar divisiones de campeonato por championshipId y grouping
 *     description: Elimina todas las divisiones de campeonato asociadas a un championshipId y grouping específicos.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: grouping
 *         in: path
 *         required: true
 *         description: Tipo de agrupación (Mayores Mundiales o Mayores Olímpicos)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Divisiones de campeonato eliminadas exitosamente
 *       '404':
 *         description: No se encontraron divisiones de campeonato para el championshipId y grouping especificados
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/:championshipId/:grouping", deleteChampionshipDivisions);

export default router;
