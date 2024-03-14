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
 * /api/club/Organizer/{championshipId}:
 *   get:
 *     tags:
 *       - Club
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Club'
 */
router.get("/Organizer/:championshipId", getClubs);

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
 *         description: ID del campeonato
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
 *               coachName:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - clubCode
 *               - name
 *               - coachName
 *               - email
 *     responses:
 *       201:
 *         description: Creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Club'
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
 *     summary: Actualizar información del club
 *     description: Actualiza la información de un club específico por su código de club e ID de campeonato.
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
 *               clubCode:
 *                 type: string
 *               name:
 *                 type: string
 *               coachName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: Club actualizado correctamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: Club no encontrado
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
 *         description: Club eliminado correctamente
 *       '404':
 *         description: Club no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/:championshipId/:clubCode", deleteClub);

export default router;
