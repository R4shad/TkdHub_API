// controllers/division.controllers.ts
import { Request, Response } from "express";
import defaultDivision from "../models/defaultDivision";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipDivision from "../models/championshipDivision";
import ChampionshipCategory from "../models/championshipCategory";
import DefaultDivision from "../models/defaultDivision";
import { Op } from "sequelize";
export const getDivisions = async (req: Request, res: Response) => {
  try {
    const divisionsList = await defaultDivision.findAll();
    const response: ApiResponse<typeof divisionsList> = {
      status: 200,
      data: divisionsList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching divisions:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

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

export const getDivisionsByAgeIntervalId = async (
  req: Request,
  res: Response
) => {
  try {
    const { ageIntervalId } = req.params;
    const divisionsList = await ChampionshipDivision.findAll({
      where: { ageIntervalId },
    });

    const response: ApiResponse<typeof divisionsList> = {
      status: 200,
      data: divisionsList,
    };

    // Envía la respuesta
    res.json(response);
  } catch (error) {
    // Manejo de errores
    console.error("Error fetching divisions by grouping:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const getDivisionsByDivisionName = async (
  req: Request,
  res: Response
) => {
  try {
    const { divisionName } = req.params;
    const division = await ChampionshipDivision.findOne({
      where: { divisionName },
    });

    const response: ApiResponse<typeof division> = {
      status: 200,
      data: division,
    };

    // Envía la respuesta
    res.json(response);
  } catch (error) {
    // Manejo de errores
    console.error("Error fetching divisions by grouping:", error);
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

    // Verificar si ya existen registros para este championshipId en ChampionshipCategory
    const existingChampionshipCategories = await ChampionshipDivision.findAll({
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

    // Obtener las divisiones de la tabla defaultDivision
    const defaultDivisions = await DefaultDivision.findAll();

    // Crear las relaciones entre el campeonato y las divisiones por defecto
    const createdChampionshipCategories = await Promise.all(
      defaultDivisions.map(async (defaultDivision) => {
        const {
          divisionName,
          ageIntervalId,
          minWeight,
          maxWeight,
          gender,
          grouping,
        } = defaultDivision;

        // Crear una nueva relación entre el campeonato y la división
        return await ChampionshipDivision.create({
          championshipId,
          divisionName: divisionName,
          ageIntervalId: ageIntervalId,
          maxWeight: maxWeight,
          minWeight: minWeight,
          gender: gender,
          grouping: grouping,
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
