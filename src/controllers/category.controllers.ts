import { Request, Response } from "express";
import Category from "../models/defaultCategory";
import ChampionshipCategory from "../models/championshipCategory";
import ApiResponse from "../interfaces/apiResponse";
import { Op } from "sequelize";
import DefaultCategory from "../models/defaultCategory";

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
  const championshipId = parseInt(req.params.championshipId, 10);

  try {
    const categories = await ChampionshipCategory.findAll({
      where: { championshipId },
    });

    const response: ApiResponse<typeof categories> = {
      status: 200,
      data: categories,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching championship categories:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "Error fetching championship categories",
    };
    res.status(response.status).json(response);
  }
};

export const createChampionshipCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);

    // Verificar si ya existen registros para este championshipId en ChampionshipCategory
    const existingChampionshipCategories = await ChampionshipCategory.findAll({
      where: { championshipId },
    });

    // Si ya existen registros para este championshipId, responder con un mensaje indicando que ya se han agregado las categorías por defecto
    if (existingChampionshipCategories.length > 0) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error:
          "Default categories have already been added to the championship.",
      };
      return res.status(response.status).json(response);
    }
    const defaultCategories = await DefaultCategory.findAll();
    // Crear las relaciones entre el campeonato y las categorías por defecto
    const createdChampionshipCategories = await Promise.all(
      defaultCategories.map(async (defaultCategory) => {
        // Copiar categoryName de los valores de defaultCategory
        const { categoryName, gradeMax, gradeMin } = defaultCategory;

        // Crear una nueva relación entre el campeonato y la categoría
        return await ChampionshipCategory.create({
          championshipId,
          categoryName,
          gradeMax,
          gradeMin,
          numberOfCompetitors: 0,
        });
      })
    );

    const response: ApiResponse<typeof createdChampionshipCategories> = {
      status: 201,
      data: createdChampionshipCategories,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating championship categories:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const getChampionshipCategoriesWithCompetitors = async (
  req: Request,
  res: Response
) => {
  const championshipId = parseInt(req.params.championshipId, 10);

  try {
    const categoriesWithCompetitors = await ChampionshipCategory.findAll({
      where: {
        championshipId: championshipId,
        numberOfCompetitors: {
          [Op.gte]: 1, // Utilizamos Op.gte para mayor o igual que 2
        },
      },
    });

    const response: ApiResponse<typeof categoriesWithCompetitors> = {
      status: 200,
      data: categoriesWithCompetitors,
    };

    res.json(response);
  } catch (error) {
    console.error(
      "Error fetching championship categories with competitors:",
      error
    );
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "Error fetching championship categories with competitors",
    };
    res.status(response.status).json(response);
  }
};

export const incrementCompetitors = async (req: Request, res: Response) => {
  const championshipId = parseInt(req.params.championshipId, 10);
  const categoryId = parseInt(req.params.categoryId, 10);

  try {
    const category = await ChampionshipCategory.findOne({
      where: { championshipId, categoryId },
    });

    if (!category) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Championship category not found",
      };
      return res.status(response.status).json(response);
    }

    // Incrementar el valor de numberOfCompetitors
    await category.increment("numberOfCompetitors");
    const response: ApiResponse<typeof category> = {
      status: 200,
      data: category,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error(
      "Error incrementing championship category competitors:",
      error
    );
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "Error incrementing championship category competitors",
    };
    res.status(response.status).json(response);
  }
};

export const decrementCompetitors = async (req: Request, res: Response) => {
  const championshipId = parseInt(req.params.championshipId, 10);
  const categoryId = parseInt(req.params.categoryId, 10);
  try {
    const category = await ChampionshipCategory.findOne({
      where: { championshipId: championshipId, categoryId: categoryId },
    });
    if (!category) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Championship category not found",
      };
      return res.status(response.status).json(response);
    }

    // Incrementar el valor de numberOfCompetitors
    await category.decrement("numberOfCompetitors");
    const response: ApiResponse<typeof category> = {
      status: 200,
      data: category,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error(
      "Error incrementing championship category competitors:",
      error
    );
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "Error incrementing championship category competitors",
    };
    res.status(response.status).json(response);
  }
};

export const updateChampionshipCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, categoryId } = req.params;
    const { categoryName, gradeMin, gradeMax, numberOfCompetitors } = req.body;

    // Buscar la categoría en la tabla ChampionshipCategory
    const category = await ChampionshipCategory.findOne({
      where: {
        championshipId: championshipId,
        categoryId: categoryId,
      },
    });

    if (!category) {
      return res.status(404).json({
        status: 404,
        error: "Category not found for the championship",
      });
    }

    // Actualizar los detalles de la categoría
    await category.update({
      categoryName: categoryName,
      gradeMin: gradeMin,
      gradeMax: gradeMax,
      numberOfCompetitors: numberOfCompetitors,
    });

    return res.status(200).json({
      status: 200,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const deleteChampionshipCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { categoryId } = req.params;

    // Buscar la categoría de campeonato en la tabla ChampionshipCategory
    const category = await ChampionshipCategory.findOne({
      where: {
        categoryId: categoryId,
      },
    });
    if (!category) {
      return res.status(404).json({
        status: 404,
        error: "Categoría de campeonato no encontrada",
      });
    }

    // Eliminar la categoría de campeonato
    await category.destroy();

    return res.status(200).json({
      status: 200,
      message: "Categoría de campeonato eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar la categoría de campeonato:", error);
    return res.status(500).json({
      status: 500,
      error: "Hubo un error al procesar la solicitud.",
    });
  }
};

export const deleteAllChampionshipCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const championshipId = req.params.championshipId;
    // Buscar todas las categorías de campeonato asociadas al campeonato
    const categories = await ChampionshipCategory.findAll({
      where: { championshipId },
    });

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        status: 404,
        error:
          "No se encontraron categorías de campeonato asociadas al campeonato",
      });
    }

    // Eliminar todas las categorías de campeonato asociadas al campeonato
    await ChampionshipCategory.destroy({ where: { championshipId } });

    return res.status(200).json({
      status: 200,
      message:
        "Todas las categorías de campeonato asociadas han sido eliminadas exitosamente",
    });
  } catch (error) {
    console.error(
      "Error al eliminar las categorías de campeonato asociadas al campeonato:",
      error
    );
    return res.status(500).json({
      status: 500,
      error: "Hubo un error al procesar la solicitud.",
    });
  }
};
