import { Router } from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
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
 * /api/category:
 *   post:
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               gradeMin:
 *                 type: string
 *               gradeMax:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error
 */
router.post("/", createCategory);

/**
 * @openapi
 * /api/category:
 *   delete:
 *     tags:
 *       - Category
 *     parameters:
 *       - name: categoryName
 *         in: query
 *         required: true
 *         description: Name of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error
 */
router.delete("/", deleteCategory);

export default router;
