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
