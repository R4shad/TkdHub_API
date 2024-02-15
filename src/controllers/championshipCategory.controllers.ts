import { Request, Response } from "express";
import ChampionshipCategory from "../models/championshipCategory";
import ApiResponse from "../interfaces/apiResponse";
import { Op } from "sequelize";

export async function getChampionshipCategories(req: Request, res: Response) {
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
}

export async function createChampionshipCategory(req: Request, res: Response) {
  const championshipId = parseInt(req.params.championshipId, 10);
  const { categoryName } = req.body;

  try {
    const newCategory = await ChampionshipCategory.create({
      championshipId,
      categoryName,
      numberOfCompetitors: 0,
    });

    const response: ApiResponse<typeof newCategory> = {
      status: 201,
      data: newCategory,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating championship category:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "Error creating championship category",
    };
    res.status(response.status).json(response);
  }
}

export async function getChampionshipCategoriesWithCompetitors(
  req: Request,
  res: Response
) {
  const championshipId = parseInt(req.params.championshipId, 10);

  try {
    const categoriesWithCompetitors = await ChampionshipCategory.findAll({
      where: {
        championshipId: championshipId,
        numberOfCompetitors: {
          [Op.gte]: 2, // Utilizamos Op.gte para mayor o igual que 2
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
}

export async function incrementCompetitors(req: Request, res: Response) {
  const championshipId = parseInt(req.params.championshipId, 10);
  const categoryName = req.params.categoryName;

  try {
    const category = await ChampionshipCategory.findOne({
      where: { championshipId, categoryName },
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
}
