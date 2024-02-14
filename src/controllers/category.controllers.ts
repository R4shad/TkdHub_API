import { Request, Response } from "express";
import Category from "../models/category";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipCategory from "../models/championshipCategory";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categoriesList = await Category.findAll();
    const response: ApiResponse<typeof categoriesList> = {
      status: 200,
      data: categoriesList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const getCategoriesByChampionshipId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId } = req.params;

    // Buscar las categorías asociadas al campeonato en ChampionshipCategory
    const championshipCategories = await ChampionshipCategory.findAll({
      where: { championshipId: championshipId },
    });
    console.log(championshipCategories);
    // Verificar si no se encontraron categorías asociadas al campeonato
    if (championshipCategories.length === 0) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "No categories found for the championship.",
      };
      return res.status(response.status).json(response);
    }

    // Obtener la información completa de las categorías desde la tabla Category
    const categoryIds = championshipCategories.map(
      (championshipCategory) => championshipCategory.categoryName
    );

    const categories = await Category.findAll({
      where: { categoryName: categoryIds },
    });

    // Construir la respuesta con la información completa de las categorías
    const response: ApiResponse<typeof categories> = {
      status: 200,
      data: categories,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching categories by championship:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, gradeMin, gradeMax } = req.body;
    const newCategory = await Category.create({
      categoryName: categoryName,
      gradeMin: gradeMin,
      gradeMax: gradeMax,
    });

    const response: ApiResponse<typeof newCategory> = {
      status: 201,
      data: newCategory,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the category:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.query;

    const categoryToDelete = await Category.findOne({
      where: { categoryName: categoryName as string },
    });

    if (!categoryToDelete) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Category not found.",
      };
      return res.status(response.status).json(response);
    }

    await categoryToDelete.destroy();

    const response: ApiResponse<typeof categoryToDelete> = {
      status: 200,
      data: categoryToDelete,
    };

    res.json(response);
  } catch (error) {
    console.error("Error deleting the category:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
