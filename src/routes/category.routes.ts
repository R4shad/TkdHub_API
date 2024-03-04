import { Router } from "express";
import {
  getCategories,
  getCategoriesByChampionshipId,
  createChampionshipCategory,
  getChampionshipCategoriesWithCompetitors,
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
 * /api/category/increment/{championshipId}/{categoryName}:
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
 *       - name: categoryName
 *         in: path
 *         required: true
 *         description: Nombre de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error
 */
router.put("/increment/:championshipId/:categoryName", incrementCompetitors);

export default router;
