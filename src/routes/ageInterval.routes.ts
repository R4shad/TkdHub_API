import { Router } from "express";
import {
  getAgeIntervals,
  getChampionshipAgeIntervals,
  updateChampionshipAgeInterval,
  deleteChampionshipAgeInterval,
  deleteAllChampionshipAgeIntervals,
  getAgeIntervalByChampionshipAndAge,
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
 * /api/ageInterval/{championshipId}/{age}:
 *   get:
 *     tags:
 *       - AgeInterval
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: age
 *         in: path
 *         required: true
 *         description: Edad del participante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:championshipId/:age", getAgeIntervalByChampionshipAndAge);

/**
 * @openapi
 * /api/ageInterval/{championshipId}/{ageIntervalId}:
 *   patch:
 *     tags:
 *       - AgeInterval
 *     summary: Actualizar intervalo de edad de un campeonato
 *     description: Actualiza el intervalo de edad de un campeonato específico.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ageIntervalName:
 *                 type: string
 *                 description: Nombre del intervalo de edad
 *               minAge:
 *                 type: integer
 *                 description: Edad mínima
 *               maxAge:
 *                 type: integer
 *                 description: Edad máxima
 *     responses:
 *       '200':
 *         description: Actualización exitosa
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontró el intervalo de edad o el campeonato
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:championshipId/:ageIntervalId", updateChampionshipAgeInterval);

/**
 * @openapi
 * /api/ageInterval/{ageIntervalId}:
 *   delete:
 *     tags:
 *       - AgeInterval
 *     summary: Eliminar intervalo de edad de un campeonato
 *     description: Elimina un intervalo de edad específico de un campeonato.
 *     parameters:
 *       - name: ageIntervalId
 *         in: path
 *         required: true
 *         description: ID del intervalo de edad
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Intervalo de edad eliminado exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontró el intervalo de edad
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/:ageIntervalId", deleteChampionshipAgeInterval);

/**
 * @openapi
 * /api/ageInterval/deleteAll/{championshipId}:
 *   delete:
 *     tags:
 *       - AgeInterval
 *     summary: Eliminar todos los intervalos de edad de un campeonato
 *     description: Elimina todos los intervalos de edad asociados a un campeonato específico.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Todos los intervalos de edad asociados al campeonato han sido eliminados exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontraron intervalos de edad asociados al campeonato
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/deleteAll/:championshipId", deleteAllChampionshipAgeIntervals);

export default router;
