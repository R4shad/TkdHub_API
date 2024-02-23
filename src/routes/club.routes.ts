import { Router } from "express";
import {
  getClubs,
  getClubsOrganizer,
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
 *                 $ref: '#/components/schemas/Club'
 */
router.get("/Organizer/:championshipId", getClubs);

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
 *                 $ref: '#/components/schemas/Club'
 */
router.get("/:championshipId", getClubsOrganizer);

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
 *                 maxLength: 5
 *               name:
 *                 type: string
 *                 maxLength: 50
 *               coachCi:
 *                 type: integer
 *                 minimum: 0
 *               coachName:
 *                 type: string
 *                 maxLength: 50
 *             required:
 *               - clubCode
 *               - coachCi
 *               - coachName
 *     responses:
 *       201:
 *         description: Created
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
 *     summary: Update club information
 *     description: Update information of a specific club by its club code and championship ID.
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
 *         description: Club code
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
 *                 description: New name of the club
 *               coachCi:
 *                 type: integer
 *                 description: New coach CI
 *               coachName:
 *                 type: string
 *                 description: New coach name
 *           required:
 *             - clubCode
 *             - name
 *             - coachCi
 *             - coachName
 *     responses:
 *       '200':
 *         description: Club updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Club not found
 *       '500':
 *         description: Internal server error
 */
router.patch("/:championshipId/:clubCode", updateClub);

/**
 * @openapi
 * /api/club/{championshipId}/{clubCode}:
 *   delete:
 *     tags:
 *       - Club
 *     summary: Delete a club
 *     description: Deletes a club associated with a championship.
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
 *         description: Club code to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Club deleted successfully
 *       '404':
 *         description: Club not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:championshipId/:clubCode", deleteClub);

export default router;
