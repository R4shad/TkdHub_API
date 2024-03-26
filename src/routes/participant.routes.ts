import { Router } from "express";
import {
  getParticipants,
  createParticipant,
  getParticipantsByClubCode,
  getParticipantsToRegister,
  updateParticipant,
  updateParticipantVerification,
  deleteParticipant,
} from "../controllers/participant.controllers";

const router = Router();

/**
 * @openapi
 * /api/participant/{championshipId}:
 *   get:
 *     tags:
 *       - participant
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
 *       - participant
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
 *       - participant
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
 *       - participant
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
 * /api/participant/{championshipId}/{participantId}:
 *   patch:
 *     tags:
 *       - participant
 *     summary: Modificar participante
 *     description: Modifica un participante específico por su ID.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: participantId
 *         in: path
 *         required: true
 *         description: ID del participante
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastNames:
 *                 type: string
 *                 description: Nuevos apellidos del participante
 *               firstNames:
 *                 type: string
 *                 description: Nuevos nombres del participante
 *               age:
 *                 type: integer
 *                 description: Nueva edad del participante
 *               weight:
 *                 type: integer
 *                 description: Nuevo peso del participante
 *               grade:
 *                 type: string
 *                 description: Nueva categoría del participante
 *               gender:
 *                 type: string
 *                 description: Nuevo género del participante
 *     responses:
 *       '200':
 *         description: Participante modificado exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontró el participante
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:championshipId/:participantId", updateParticipant);

/**
 * @openapi
 * /api/participant/validate/{championshipId}/{participantId}:
 *   patch:
 *     tags:
 *       - participant
 *     summary: Actualizar estado de verificación del participante
 *     description: Actualiza el estado de verificación del participante para inscribirlo en un campeonato.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: participantId
 *         in: path
 *         required: true
 *         description: ID del participante
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Estado de verificación del participante
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

router.patch(
  "/validate/:championshipId/:participantId",
  updateParticipantVerification
);

/**
 * @openapi
 * /api/participant/{championshipId}/{participantId}:
 *   delete:
 *     tags:
 *       - participant
 *     summary: Eliminar participante del campeonato
 *     description: Elimina un participante de un campeonato mediante su ID de participante y el ID del campeonato.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: participantId
 *         in: path
 *         required: true
 *         description: ID del participante
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Participante eliminado exitosamente
 *       '404':
 *         description: Participante no encontrado
 *       '500':
 *         description: Error al procesar la solicitud
 */
router.delete("/:championshipId/:participantId", deleteParticipant);

export default router;
