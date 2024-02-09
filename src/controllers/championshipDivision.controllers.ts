import { Request, Response } from "express";
import ChampionshipDivision from "../models/championshipDivision";
import ApiResponse from "../interfaces/apiResponse";

export const getChampionshipDivisions = async (req: Request, res: Response) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);
    const championshipDivisionsList = await ChampionshipDivision.findAll({
      where: { championshipId: championshipId },
    });

    const response: ApiResponse<typeof championshipDivisionsList> = {
      status: 200,
      data: championshipDivisionsList,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching championship divisions:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createChampionshipDivision = async (
  req: Request,
  res: Response
) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);
    const { divisionName } = req.body;

    // Crear una nueva relación entre el campeonato y la división
    const newChampionshipDivision = await ChampionshipDivision.create({
      championshipId: championshipId,
      divisionName: divisionName,
      numberOfCompetitors: 0, // Seteamos el número de competidores como 0 por defecto
    });

    const response: ApiResponse<typeof newChampionshipDivision> = {
      status: 201,
      data: newChampionshipDivision,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating championship division:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
