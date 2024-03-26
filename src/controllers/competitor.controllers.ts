import { Request, Response } from "express";
import Competitor from "../models/competitor";
import ChampionshipCategory from "../models/championshipCategory";
import ChampionshipDivision from "../models/championshipDivision";
import participant from "../models/participant";

export const getCompetitors = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;

    const competitors = await Competitor.findAll({
      where: { championshipId },
      include: [
        {
          model: participant,
          attributes: [
            "clubCode",
            "firstNames",
            "lastNames",
            "age",
            "weight",
            "grade",
            "gender",
          ],
        },
      ],
      attributes: ["participantId", "divisionId", "categoryId"],
    });

    res.status(200).json({ status: 200, data: competitors });
  } catch (error) {
    console.error("Error fetching competitors:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const getCompetitorsByClubCode = async (req: Request, res: Response) => {
  try {
    const { championshipId, clubCode } = req.params;

    // Buscar todos los competidores asociados con el campeonato y el código de club
    const competitors = await Competitor.findAll({
      where: { championshipId: championshipId },
      include: [
        {
          model: participant,
          where: { clubCode: clubCode },
        },
      ],
    });

    // Verificar si no se encontraron competidores
    if (competitors.length === 0) {
      return res.status(200).json({ status: 200, data: [] });
    }

    // Aquí puedes agregar lógica adicional según tus necesidades

    res.status(200).json({ status: 200, data: competitors });
  } catch (error) {
    console.error("Error fetching competitors by club code:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const updateCompetitor = async (req: Request, res: Response) => {
  try {
    const { competitorId } = req.params;
    const { divisionId, categoryId } = req.body;

    // Buscar el competidor en la tabla Competitor
    const competitor = await Competitor.findByPk(competitorId);

    if (!competitor) {
      return res.status(404).json({
        status: 404,
        error: "Competitor not found",
      });
    }

    // Actualizar los detalles del competidor
    await competitor.update({
      divisionId: divisionId,
      categoryId: categoryId,
    });

    return res.status(200).json({
      status: 200,
      message: "Competitor updated successfully",
    });
  } catch (error) {
    console.error("Error updating competitor:", error);
    return res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const createCompetitor = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const competitorData = req.body;

    const newCompetitor = await Competitor.create({
      ...competitorData,
      championshipId: championshipId,
    });

    res.status(201).json({ status: 201, data: newCompetitor });
  } catch (error) {
    console.error("Error creating competitor:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};
export const deleteCompetitor = async (req: Request, res: Response) => {
  const competitorId = req.params.competitorId;
  try {
    const result = await Competitor.destroy({
      where: { competitorId },
    });
    console.log(result);
    if (result === 1) {
      res
        .status(200)
        .json({ status: 200, message: "Competidor eliminado exitosamente" });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Competidor no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Error al procesar la solicitud" });
    console.log(error);
  }
};
