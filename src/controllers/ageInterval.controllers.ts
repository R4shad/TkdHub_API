import { Request, Response } from "express";
import ChampionshipAgeInterval from "../models/championshipAgeInterval";
import ApiResponse from "../interfaces/apiResponse";
import DefaultAgeInterval from "../models/defaultAgeInterval";

export const getAgeIntervals = async (req: Request, res: Response) => {
  try {
    const ageIntervalsList = await DefaultAgeInterval.findAll();
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

    // Verificar si ya existen registros para este championshipId en ChampionshipAgeInterval
    const existingChampionshipAgeIntervals =
      await ChampionshipAgeInterval.findAll({
        where: { championshipId },
      });

    // Si ya existen registros para este championshipId, responder con un mensaje indicando que ya se han ingresado los intervalos por defecto
    if (existingChampionshipAgeIntervals.length > 0) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error:
          "Default age intervals have already been added to the championship.",
      };
      return res.status(response.status).json(response);
    }

    // Obtener todos los valores de la tabla defaultAgeIntervals
    const defaultAgeIntervals = await DefaultAgeInterval.findAll();

    // Crear las relaciones entre el campeonato y los intervalos de edad por defecto
    const createdChampionshipAgeIntervals = await Promise.all(
      defaultAgeIntervals.map(async (defaultAgeInterval) => {
        // Copiar ageIntervalName, minAge y maxAge de los valores de defaultAgeInterval
        const { ageIntervalName, minAge, maxAge } = defaultAgeInterval;

        // Crear una nueva relación entre el campeonato y el intervalo de edad
        return await ChampionshipAgeInterval.create({
          championshipId,
          ageIntervalName,
          minAge,
          maxAge,
        });
      })
    );

    const response: ApiResponse<typeof createdChampionshipAgeIntervals> = {
      status: 201,
      data: createdChampionshipAgeIntervals,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating championship age intervals:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteChampionshipAgeInterval = async (
  req: Request,
  res: Response
) => {
  const championshipId = parseInt(req.params.championshipId);
  const ageIntervalId = parseInt(req.params.ageIntervalId);

  try {
    const result = await ChampionshipAgeInterval.destroy({
      where: { championshipId, ageIntervalId },
    });

    if (result === 1) {
      res.status(200).json({
        status: 200,
        message: "Intervalo de edad eliminado exitosamente",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Intervalo de edad no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar intervalo de edad:", error);
    res
      .status(500)
      .json({ status: 500, message: "Error al procesar la solicitud" });
  }
};
