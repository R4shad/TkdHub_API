// controllers/division.controllers.ts
import { Request, Response } from "express";
import defaultDivision from "../models/defaultDivision";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipDivision from "../models/championshipDivision";

import DefaultDivision from "../models/defaultDivision";
import { Op } from "sequelize";

import DefaultAgeInterval from "../models/defaultAgeInterval";
import ChampionshipAgeInterval from "../models/championshipAgeInterval";
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

export const getDivisionsByDivisionId = async (req: Request, res: Response) => {
  try {
    const { divisionId } = req.params;
    const division = await ChampionshipDivision.findOne({
      where: { divisionId },
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

export const getDivisionsByGenderAgeAndWeight = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, gender, ageIntervalId, weight } = req.params;
    const divisionsList = await ChampionshipDivision.findAll({
      where: {
        championshipId,
        gender,
        ageIntervalId,
        minWeight: { [Op.lte]: weight },
        maxWeight: { [Op.gte]: weight },
      },
    });

    const response: ApiResponse<(typeof divisionsList)[0]> = {
      status: 200,
      data: divisionsList[0],
    };

    // Envía la respuesta
    res.json(response);
  } catch (error) {
    // Manejo de errores
    console.error(
      "Error fetching divisions by championship, gender, age, and weight:",
      error
    );
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createChampionshipDivisionsAndAgeIntervals = async (
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

    // Obtener las divisiones de la tabla defaultDivision
    const defaultDivisions = await DefaultDivision.findAll();

    let ageIntervalIndex = 0; // Índice para seguir el orden de los ageIntervalId

    // Asignar los ageIntervalId a las divisiones basándonos en el orden en que se crearon los ChampionshipAgeInterval
    const createdChampionshipDivisions = await Promise.all(
      defaultDivisions.map(async (defaultDivision) => {
        const { divisionName, minWeight, maxWeight, gender, grouping } =
          defaultDivision;
        console.log("ASDASDASDS", grouping);
        // Obtener el ageIntervalId correspondiente del array de ChampionshipAgeInterval creados
        let ageIntervalId =
          createdChampionshipAgeIntervals.find((interval) => {
            if (grouping && typeof grouping === "string") {
              // Si grouping no es null, undefined y es una cadena
              return (
                interval.ageIntervalName === grouping ||
                interval.ageIntervalName === grouping.split(" ")[0]
              ); // Comparar con el primer elemento después de dividir el string
            }
            return false; // Si grouping es null, undefined o de otro tipo, retornar false
          })?.ageIntervalId ?? null;

        // Crear una nueva relación entre el campeonato y la división
        if (ageIntervalId != null) {
          const championshipDivision = await ChampionshipDivision.create({
            championshipId,
            divisionName,
            ageIntervalId,
            maxWeight,
            minWeight,
            gender,
            grouping,
            numberOfCompetitors: 0,
          });
          return championshipDivision;
        }
      })
    );

    const response: ApiResponse<typeof createdChampionshipDivisions> = {
      status: 201,
      data: createdChampionshipDivisions,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error(
      "Error creating championship divisions and age intervals:",
      error
    );
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const updateChampionshipDivision = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, divisionId } = req.params;
    const {
      divisionName,
      ageIntervalId,
      minWeight,
      maxWeight,
      gender,
      grouping,
      numberOfCompetitors,
    } = req.body;

    // Buscar la división en la tabla ChampionshipDivision
    const division = await ChampionshipDivision.findOne({
      where: {
        championshipId: championshipId,
        divisionId: divisionId,
      },
    });

    if (!division) {
      return res.status(404).json({
        status: 404,
        error: "Division not found for the championship",
      });
    }

    // Actualizar los detalles de la división
    await division.update({
      divisionName: divisionName,
      ageIntervalId: ageIntervalId,
      minWeight: minWeight,
      maxWeight: maxWeight,
      gender: gender,
      grouping: grouping,
      numberOfCompetitors: numberOfCompetitors,
    });

    return res.status(200).json({
      status: 200,
      message: "Division updated successfully",
    });
  } catch (error) {
    console.error("Error updating division:", error);
    return res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const incrementDivisionCompetitors = async (
  req: Request,
  res: Response
) => {
  const championshipId = parseInt(req.params.championshipId, 10);
  const divisionId = parseInt(req.params.divisionId, 10);

  try {
    const division = await ChampionshipDivision.findOne({
      where: { championshipId, divisionId },
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

export const decrementDivisionCompetitors = async (
  req: Request,
  res: Response
) => {
  const championshipId = parseInt(req.params.championshipId, 10);
  const divisionId = parseInt(req.params.divisionId, 10);

  try {
    const division = await ChampionshipDivision.findOne({
      where: { championshipId, divisionId },
    });

    if (!division) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Championship division not found",
      };
      return res.status(response.status).json(response);
    }

    // Incrementar el valor de numberOfCompetitors
    await division.decrement("numberOfCompetitors");
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
          [Op.gte]: 1, // Utilizamos Op.gte para mayor o igual que 2
        },
      },
    });

    const mappedDivisionsWithCompetitors = divisionsWithCompetitors.map(
      (division) => ({
        divisionId: division.divisionId,
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
export const deleteChampionshipDivision = async (
  req: Request,
  res: Response
) => {
  try {
    const divisionId = req.params.divisionId;

    // Buscar la división de campeonato en la tabla ChampionshipDivision
    const division = await ChampionshipDivision.findByPk(divisionId);

    if (!division) {
      return res.status(404).json({
        status: 404,
        error: "División de campeonato no encontrada",
      });
    }

    // Eliminar la división de campeonato
    await division.destroy();

    return res.status(200).json({
      status: 200,
      message: "División de campeonato eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar la división de campeonato:", error);
    return res.status(500).json({
      status: 500,
      error: "Hubo un error al procesar la solicitud.",
    });
  }
};
export const deleteChampionshipDivisions = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, grouping } = req.params;

    // Eliminar todas las divisiones de campeonato asociadas al championshipId y grouping especificados
    await ChampionshipDivision.destroy({
      where: {
        championshipId: championshipId,
        grouping: grouping,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Divisiones de campeonato eliminadas exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar las divisiones de campeonato:", error);
    return res.status(500).json({
      status: 500,
      error: "Hubo un error al procesar la solicitud.",
    });
  }
};
