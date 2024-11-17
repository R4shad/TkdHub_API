import { Router } from "express";
import {
  getChampionships,
  getChampionshipStage,
  createChampionship,
  updateStage,
  login,
  getChampionshipById,
  updateOrganizerPassword,
  sendForgotEmail,
} from "../controllers/championship.controllers";

const router = Router();

/**
 * @openapi
 * /api/championship:
 *   get:
 *     tags:
 *       - Championship
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getChampionships);

/**
 * @openapi
 * /api/championship/{championshipId}:
 *   get:
 *     tags:
 *       - Championship
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
 *       500:
 *         description: Error
 */
router.get("/:championshipId", getChampionshipById);

/**
 * @openapi
 * /api/championship/stage/{championshipId}:
 *   get:
 *     tags:
 *       - Championship
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
 *               type: object
 *               properties:
 *                 stage:
 *                   type: string
 *                   description: Current stage of the championship
 *       500:
 *         description: Error
 */
router.get("/stage/:championshipId", getChampionshipStage);

/**
 * @openapi
 * /api/championship/updateStage/{championshipId}:
 *   put:
 *     tags:
 *       - Championship
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
 *       500:
 *         description: Error
 */
router.put("/updateStage/:championshipId", updateStage);

/**
 * @openapi
 * /api/championship:
 *   post:
 *     tags:
 *       - Championship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               championshipName:
 *                 type: string
 *               organizer:
 *                 type: string
 *               email:
 *                 type: string
 *               championshipDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/", createChampionship);

/**
 * @openapi
 * /api/championship/login/{championshipId}:
 *   post:
 *     tags:
 *       - Championship
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
 *               email:
 *                 type: number
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/login/:championshipId", login);

/**
 * @openapi
 * /api/championship/password/update/{email}:
 *   patch:
 *     tags:
 *       - Championship
 *     summary: Actualizar el password del Organizador
 *     description: Actualiza la password del Organizador
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: mail del organizador
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Organizador actualizado correctamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: Organizador no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/password/update/:email", updateOrganizerPassword);

/**
 * @openapi
 * /api/championship/{championshipId}/updatePassword/{email}:
 *   patch:
 *     tags:
 *       - Championship
 *     summary: Actualizar el password de un usuario
 *     description: Actualiza la password de un usuario
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: mail del organizador
 *         schema:
 *           type: string
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: mail del organizador
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Correo enviado correctamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: Correo  no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:championshipId/updatePassword/:email", sendForgotEmail);

export default router;
