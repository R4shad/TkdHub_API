import { Request, Response } from "express";
import ChampionshipCategory from "../models/championshipCategory";
import ApiResponse from "../interfaces/apiResponse";

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
