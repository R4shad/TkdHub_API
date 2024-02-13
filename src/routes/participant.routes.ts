import { Router } from "express";
import {
  getParticipants,
  createParticipant,
  getParticipantsByClubCode,
  getParticipantsToRegister,
  updateParticipantVerification,
} from "../controllers/participant.controllers";

const router = Router();

/**
 * @openapi
 * /api/participant/{championshipId}:
 *   get:
 *     tags:
 *       - Participant
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
 */
router.get("/:championshipId", getParticipants);

/**
 * @openapi
 * /api/participant/club/{championshipId}/{clubCode}:
 *   get:
 *     tags:
 *       - Participant
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID of the championship
 *         schema:
 *           type: integer
 *       - name: clubCode
 *         in: path
 *         required: true
 *         description: Code of the club
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get("/club/:championshipId/:clubCode", getParticipantsByClubCode);

/**
 * @openapi
 * /api/participant/toRegister/{championshipId}/{clubCode}:
 *   get:
 *     tags:
 *       - Participant
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID of the championship
 *         schema:
 *           type: integer
 *       - name: clubCode
 *         in: path
 *         required: true
 *         description: Code of the club
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get("/toRegister/:championshipId/:clubCode", getParticipantsToRegister);

/**
 * @openapi
 * /api/participant/{championshipId}:
 *   post:
 *     tags:
 *       - Participant
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
 *               participantCi:
 *                 type: integer
 *                 description: CI of the participant
 *               clubCode:
 *                 type: string
 *                 description: Code of the club
 *               lastNames:
 *                 type: string
 *                 description: Last names of the participant
 *               firstNames:
 *                 type: string
 *                 description: First names of the participant
 *               age:
 *                 type: integer
 *                 description: Age of the participant
 *               weight:
 *                 type: integer
 *                 description: Weight of the participant
 *               grade:
 *                 type: string
 *                 description: Grade of the participant
 *               gender:
 *                 type: string
 *                 description: Gender of the participant
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createParticipant);

/**
 * @openapi
 * /api/participant/{championshipId}/{participantCi}:
 *   patch:
 *     tags:
 *       - Participant
 *     summary: Actualizar estado de verificación del participante
 *     description: Actualiza el estado de verificación del participante para inscribirlo en un campeonato.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: participantCi
 *         in: path
 *         required: true
 *         description: CI del participante
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         description: Datos del participante a actualizar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             verified:
 *               type: boolean
 *               description: Estado de verificación del participante
 *               example: true
 *     responses:
 *       '200':
 *         description: Actualización exitosa
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontró el participante
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:championshipId/:participantCi", updateParticipantVerification);

export default router;
