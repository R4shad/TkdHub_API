import { Router } from "express";
import {
  getAgeIntervals,
  getChampionshipAgeIntervals,
  createChampionshipAgeInterval,
  deleteChampionshipAgeInterval,
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

/**
 * @openapi
 * /api/participant/{championshipId}/{ageIntervalId}:
 *   delete:
 *     tags:
 *       - Participant
 *     summary: Eliminar intervalo de edad del campeonato
 *     description: Elimina un intervalo de edad de un campeonato mediante su ID de campeonato y el ID del intervalo de edad.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: ageIntervalId
 *         in: path
 *         required: true
 *         description: ID del intervalo de edad
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Intervalo de edad eliminado exitosamente
 *       '404':
 *         description: Intervalo de edad no encontrado
 *       '500':
 *         description: Error al procesar la solicitud
 */
router.delete("/:championshipId/:ageIntervalId", deleteChampionshipAgeInterval);

export default router;
