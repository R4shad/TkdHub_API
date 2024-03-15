import { Request, Response } from "express";
import ChampionshipAgeInterval from "../models/championshipAgeInterval";
import ApiResponse from "../interfaces/apiResponse";
import DefaultAgeInterval from "../models/defaultAgeInterval";
import ChampionshipDivision from "../models/championshipDivision";
import { Op } from "sequelize";

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

export const getAgeIntervalByChampionshipAndAge = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, age } = req.params;
    const ageIntervalsList = await ChampionshipAgeInterval.findAll({
      where: {
        championshipId,
        minAge: { [Op.lte]: age },
        maxAge: { [Op.gte]: age },
      },
    });

    const response: ApiResponse<(typeof ageIntervalsList)[0]> = {
      status: 200,
      data: ageIntervalsList[0],
    };

    res.json(response);
  } catch (error) {
    console.error(
      "Error fetching age intervals by championship and age:",
      error
    );
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

export const updateChampionshipAgeInterval = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, ageIntervalId } = req.params;
    const { ageIntervalName, minAge, maxAge } = req.body;

    // Buscar el intervalo de edad en la tabla ChampionshipAgeInterval
    const ageInterval = await ChampionshipAgeInterval.findOne({
      where: {
        championshipId: championshipId,
        ageIntervalId: ageIntervalId,
      },
    });

    if (!ageInterval) {
      return res.status(404).json({
        status: 404,
        error: "Age interval not found for the championship",
      });
    }

    // Actualizar los datos del intervalo de edad
    console.log("entrada");
    console.log(ageIntervalName, minAge, maxAge);
    await ageInterval.update({
      ageIntervalName: ageIntervalName,
      minAge: minAge,
      maxAge: maxAge,
    });

    console.log("DESPUES");
    console.log(ageInterval);

    return res.status(200).json({
      status: 200,
      message: "Age interval updated successfully",
    });
  } catch (error) {
    console.error("Error updating age interval:", error);
    return res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const deleteChampionshipAgeInterval = async (
  req: Request,
  res: Response
) => {
  try {
    const ageIntervalId = req.params.ageIntervalId;

    // Buscar el intervalo de edad en la tabla ChampionshipAgeInterval
    const ageInterval = await ChampionshipAgeInterval.findByPk(ageIntervalId);

    if (!ageInterval) {
      return res.status(404).json({
        status: 404,
        error: "Intervalo de edad no encontrado",
      });
    }

    // Eliminar las divisiones asociadas al ageIntervalId en la tabla ChampionshipDivision
    await ChampionshipDivision.destroy({ where: { ageIntervalId } });

    // Eliminar el intervalo de edad
    await ageInterval.destroy();

    return res.status(200).json({
      status: 200,
      message: "Intervalo de edad eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el intervalo de edad:", error);
    return res.status(500).json({
      status: 500,
      error: "Hubo un error al procesar la solicitud.",
    });
  }
};

export const deleteAllChampionshipAgeIntervals = async (
  req: Request,
  res: Response
) => {
  try {
    const championshipId = req.params.championshipId;

    // Buscar todos los intervalos de edad asociados al campeonato
    const ageIntervals = await ChampionshipAgeInterval.findAll({
      where: { championshipId },
    });

    if (!ageIntervals || ageIntervals.length === 0) {
      return res.status(404).json({
        status: 404,
        error: "No se encontraron intervalos de edad asociados al campeonato",
      });
    }

    // Eliminar todas las divisiones asociadas a los intervalos de edad eliminados
    await ChampionshipDivision.destroy({ where: { championshipId } });

    // Eliminar todos los intervalos de edad asociados al campeonato
    await ChampionshipAgeInterval.destroy({ where: { championshipId } });

    return res.status(200).json({
      status: 200,
      message:
        "Todos los intervalos de edad asociados al campeonato han sido eliminados exitosamente, junto con sus divisiones",
    });
  } catch (error) {
    console.error(
      "Error al eliminar los intervalos de edad asociados al campeonato:",
      error
    );
    return res.status(500).json({
      status: 500,
      error: "Hubo un error al procesar la solicitud.",
    });
  }
};
