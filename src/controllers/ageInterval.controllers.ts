import { Request, Response } from "express";
import AgeInterval from "../models/defaultAgeInterval";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipAgeInterval from "../models/championshipAgeInterval";
import { Sequelize, Op } from "sequelize";

export const getAgeIntervals = async (req: Request, res: Response) => {
  try {
    const ageIntervalsList = await AgeInterval.findAll();
    const response: ApiResponse<typeof ageIntervalsList> = {
      status: 200,
      data: ageIntervalsList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching age intervals:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "Hubo un error al procesar la solicitud.",
    };
    res.status(response.status).json(response);
  }
};
