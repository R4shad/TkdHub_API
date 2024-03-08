import { Router } from "express";
import {
  getCategories,
  getCategoriesByChampionshipId,
  createChampionshipCategory,
  getChampionshipCategoriesWithCompetitors,
  updateChampionshipCategory,
  incrementCompetitors,
} from "../controllers/category.controllers";

const router = Router();

/**
 * @openapi
 * /api/category:
 *   get:
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getCategories);

/**
 * @openapi
 * /api/category/{championshipId}:
 *   get:
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: championshipId
 *         required: true
 *         schema:
 *           type: integer
 *         description: championshipId value to filter categories
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.get("/:championshipId", getCategoriesByChampionshipId);

/**
 * @swagger
 * /api/category/{championshipId}/withCompetitors:
 *   get:
 *     tags:
 *       - Category
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
 *       500:
 *         description: Error
 */
router.get(
  "/:championshipId/withCompetitors",
  getChampionshipCategoriesWithCompetitors
);

/**
 * @swagger
 * /api/category/{championshipId}:
 *   post:
 *     tags:
 *       - Category
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content: {}
 *     responses:
 *       201:
 *         description: Creado
 *       500:
 *         description: Error
 */
router.post("/:championshipId", createChampionshipCategory);

/**
 * @swagger
 * /api/category/increment/{championshipId}/{categoryId}:
 *   put:
 *     tags:
 *       - Category
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Nombre de la categoría
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.put("/increment/:championshipId/:categoryId", incrementCompetitors);

/**
 * @openapi
 * /api/category/{championshipId}/{categoryId}:
 *   patch:
 *     tags:
 *       - Category
 *     summary: Actualizar categoría de un campeonato
 *     description: Actualiza los detalles de una categoría de un campeonato específico.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: Nombre de la categoría
 *               gradeMin:
 *                 type: string
 *                 description: Grado mínimo
 *               gradeMax:
 *                 type: string
 *                 description: Grado máximo
 *               numberOfCompetitors:
 *                 type: integer
 *                 description: Número de competidores en la categoría
 *     responses:
 *       '200':
 *         description: Categoría actualizada exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '404':
 *         description: No se encontró la categoría o el campeonato
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/:championshipId/:categoryId", updateChampionshipCategory);

export default router;
