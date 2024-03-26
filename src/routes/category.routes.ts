import { Router } from "express";
import {
  getCategories,
  getCategoriesByChampionshipId,
  createChampionshipCategory,
  getChampionshipCategoriesWithCompetitors,
  updateChampionshipCategory,
  incrementCompetitors,
  deleteChampionshipCategory,
  deleteAllChampionshipCategories,
  decrementCompetitors,
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
 * @swagger
 * /api/category/decrement/{championshipId}/{categoryId}:
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
router.put("/decrement/:championshipId/:categoryId", decrementCompetitors);

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

/**
 * @openapi
 * /api/category/{categoryId}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Eliminar categoría de campeonato
 *     description: Elimina una categoría de campeonato específica por su ID.
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID de la categoría de campeonato
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Categoría de campeonato eliminada exitosamente
 *       '404':
 *         description: No se encontró la categoría de campeonato
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/:categoryId", deleteChampionshipCategory);

/**
 * @openapi
 * /api/category/deleteAll/{championshipId}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Eliminar todas las categorías de campeonato asociadas
 *     description: Elimina todas las categorías de campeonato asociadas a un campeonato específico por su ID.
 *     parameters:
 *       - name: championshipId
 *         in: path
 *         required: true
 *         description: ID del campeonato
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Todas las categorías de campeonato asociadas han sido eliminadas exitosamente
 *       '404':
 *         description: No se encontraron categorías de campeonato asociadas al campeonato
 *       '500':
 *         description: Error interno del servidor
 */
router.delete("/deleteAll/:championshipId", deleteAllChampionshipCategories);

export default router;
