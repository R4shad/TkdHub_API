import { Router } from "express";
import {
  getClubs,
  createClub,
  updateClub,
  deleteClub,
} from "../controllers/club.controllers";

const router = Router();

/**
 * @openapi
 * /api/club/{championshipId}:
 *   get:
 *     tags:
 *       - Club
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
 *                   clubCode:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get("/:championshipId", getClubs);

/**
 * @openapi
 * /api/club/{championshipId}:
 *   post:
 *     tags:
 *       - Club
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
 *               clubCode:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clubCode:
 *                   type: string
 *                 name:
 *                   type: string
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createClub);

/**
 * @openapi
 * /api/club/{championshipId}/{clubCode}:
 *   patch:
 *     tags:
 *       - Club
 *     summary: Actualizar información de un club
 *     description: Actualiza la información de un club específico por su código de club y su ID de campeonato.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: clubCode
 *         in: path
 *         required: true
 *         description: Código del club
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del club
 *     responses:
 *       '200':
 *         description: Club actualizado exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontró el club
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:championshipId/:clubCode", updateClub);

/**
 * @openapi
 * /api/club/{championshipId}/{clubCode}:
 *   delete:
 *     tags:
 *       - Club
 *     summary: Eliminar un club
 *     description: Elimina un club asociado a un campeonato.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: clubCode
 *         in: path
 *         required: true
 *         description: Código del club a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Club eliminado exitosamente
 *       '404':
 *         description: No se encontró el club
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/:championshipId/:clubCode", deleteClub);

export default router;
