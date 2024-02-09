import { Request, Response } from "express";
import ChampionshipCategory from "../models/championshipCategory";

export async function getChampionshipCategories(req: Request, res: Response) {
  const championshipId = parseInt(req.params.championshipId, 10);

  try {
    const categories = await ChampionshipCategory.findAll({
      where: { championshipId },
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching championship categories:", error);
    res.status(500).send("Error fetching championship categories");
  }
}

export async function createChampionshipCategory(req: Request, res: Response) {
  const championshipId = parseInt(req.params.championshipId, 10);
  const { categoryName } = req.body; // Quitamos numberOfCompetitors del req.body

  try {
    // Creamos la categoría con numberOfCompetitors por defecto en 0
    const newCategory = await ChampionshipCategory.create({
      championshipId,
      categoryName,
      numberOfCompetitors: 0, // Asignamos 0 como valor por defecto
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating championship category:", error);
    res.status(500).send("Error creating championship category");
  }
}
