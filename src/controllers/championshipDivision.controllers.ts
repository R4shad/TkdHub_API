import { Request, Response } from "express";
import ChampionshipDivision from "../models/championshipDivision";
import ApiResponse from "../interfaces/apiResponse";
import { Op } from "sequelize";

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

export const getChampionshipDivisionsWithCompetitors = async (
  req: Request,
  res: Response
) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);

    const divisionsWithCompetitors = await ChampionshipDivision.findAll({
      where: {
        championshipId: championshipId,
        numberOfCompetitors: {
          [Op.gte]: 2, // Utilizamos Op.gte para mayor o igual que 2
        },
      },
    });

    const mappedDivisionsWithCompetitors = divisionsWithCompetitors.map(
      (division) => ({
        championshipId: division.championshipId,
        divisionName: division.divisionName,
        numberOfCompetitors: division.numberOfCompetitors,
      })
    );

    const response: ApiResponse<typeof mappedDivisionsWithCompetitors> = {
      status: 200,
      data: mappedDivisionsWithCompetitors,
    };

    res.json(response);
  } catch (error) {
    console.error(
      "Error fetching championship divisions with competitors:",
      error
    );
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const incrementDivisionCompetitors = async (
  req: Request,
  res: Response
) => {
  const championshipId = parseInt(req.params.championshipId, 10);
  const divisionName = req.params.divisionName;

  try {
    const division = await ChampionshipDivision.findOne({
      where: { championshipId, divisionName },
    });

    if (!division) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Championship division not found",
      };
      return res.status(response.status).json(response);
    }

    // Incrementar el valor de numberOfCompetitors
    await division.increment("numberOfCompetitors");
    const response: ApiResponse<typeof division> = {
      status: 200,
      data: division,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error(
      "Error incrementing championship division competitors:",
      error
    );
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "Error incrementing championship division competitors",
    };
    res.status(response.status).json(response);
  }
};
