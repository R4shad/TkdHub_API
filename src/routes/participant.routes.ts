import { Router } from "express";
import {
  getParticipants,
  createParticipant,
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
 *                 $ref: '#/components/schemas/Participant'
 */
router.get("/:championshipId", getParticipants);

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
 *               $ref: '#/components/schemas/Participant'
 *       500:
 *         description: Error
 */

router.post("/:championshipId", createParticipant);

export default router;
