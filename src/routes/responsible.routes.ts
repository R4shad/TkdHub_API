import { Router } from "express";
import {
  getResponsibles,
  createResponsible,
  loginResponsible,
  deleteResponsible,
  uR,
  updateResponsiblePassword,
} from "../controllers/responsible.controllers";

const router = Router();

/**
 * @openapi
 * /api/responsible/{championshipId}:
 *   get:
 *     tags:
 *       - Responsible
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
router.get("/:championshipId", getResponsibles);

/**
 * @openapi
 * /api/responsible/{championshipId}:
 *   post:
 *     tags:
 *       - Responsible
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Responsible'
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createResponsible);

/**
 * @openapi
 * /api/responsible/login/{championshipId}:
 *   post:
 *     tags:
 *       - Responsible
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
 *               responsibleCi:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/login/:championshipId", loginResponsible);

/**
 * @openapi
 * /api/responsible/{championshipId}/{responsibleId}:
 *   patch:
 *     tags:
 *       - Responsible
 *     summary: Actualizar información del responsable
 *     description: Actualiza la información de un responsable específico por su código de responsable e ID de campeonato.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: responsibleId
 *         in: path
 *         required: true
 *         description: Id del responsable
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: Responsable actualizado correctamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: Responsable no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:championshipId/:responsibleId", uR);

/**
 * @openapi
 * /api/responsible/{championshipId}/{responsibleId}:
 *   delete:
 *     tags:
 *       - Responsible
 *     summary: Eliminar un Responsable
 *     description: Elimina un responsable asociado a un campeonato.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: responsibleId
 *         in: path
 *         required: true
 *         description: Código del responsable a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Responsable eliminado correctamente
 *       '404':
 *         description: Responsable no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/:championshipId/:responsibleId", deleteResponsible);

/**
 * @openapi
 * /api/responsible/password/update/{email}:
 *   patch:
 *     tags:
 *       - Responsible
 *     summary: Actualizar el password del Responsable
 *     description: Actualiza la password del Responsable
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: mail del responsable
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
 *         description: Responsable actualizado correctamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: Responsable no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/password/update/:email", updateResponsiblePassword);

export default router;
