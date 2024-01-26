// controllers/championshipAgeInterval.controllers.ts
import { Request, Response } from "express";
import ChampionshipAgeInterval from "../models/championshipAgeInterval";
import ApiResponse from "../interfaces/apiResponse";

export const getChampionshipAgeIntervals = async (
  req: Request,
  res: Response
) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);
    const championshipAgeIntervalsList = await ChampionshipAgeInterval.findAll({
      where: { championshipId: championshipId },
    });

    const response: ApiResponse<typeof championshipAgeIntervalsList> = {
      status: 200,
      data: championshipAgeIntervalsList,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching championship age intervals:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createChampionshipAgeInterval = async (
  req: Request,
  res: Response
) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);
    const { ageIntervalId } = req.body;

    // Verificar si el campeonato y el intervalo de edad existen
    const championshipAgeIntervalExists = await ChampionshipAgeInterval.findOne(
      {
        where: { championshipId: championshipId, ageIntervalId: ageIntervalId },
      }
    );

    if (championshipAgeIntervalExists) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "Championship age interval already exists.",
      };
      return res.status(response.status).json(response);
    }

    // Crear una nueva relación entre el campeonato y el intervalo de edad
    const newChampionshipAgeInterval = await ChampionshipAgeInterval.create({
      championshipId: championshipId,
      ageIntervalId: ageIntervalId,
    });

    const response: ApiResponse<typeof newChampionshipAgeInterval> = {
      status: 201,
      data: newChampionshipAgeInterval,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating championship age interval:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
