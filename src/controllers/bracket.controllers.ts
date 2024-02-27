import { Request, Response } from "express";
import Bracket from "../models/bracket";
import ApiResponse from "../interfaces/apiResponse";
import Competitor from "../models/competitor";
import Participant from "../models/participant";
import Match from "../models/match";

export const getBrackets = async (req: Request, res: Response) => {
  try {
    const bracketsList = await Bracket.findAll();
    const response: ApiResponse<typeof bracketsList> = {
      status: 200,
      data: bracketsList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching brackets:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const getBracketsByChampionshipId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId } = req.params;

    const brackets = await Bracket.findAll({
      where: { championshipId },
    });

    res.status(200).json({ status: 200, data: brackets });
  } catch (error) {
    console.error("Error fetching brackets:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};
export const getBracketsWithCompetitorsByChampionshipId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId } = req.params;

    const brackets = await Bracket.findAll({
      where: { championshipId },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
    });

    for (const bracket of brackets) {
      const competitors = await Competitor.findAll({
        where: {
          championshipId,
          divisionName: bracket.divisionName,
          categoryName: bracket.categoryName,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
      });

      const competitorsWithDetails = await Promise.all(
        competitors.map(async (competitor) => {
          const participant = await Participant.findOne({
            where: { Id: competitor.participantId },
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
          });
          return {
            ...competitor.get(),
            Participant: participant ? participant.get() : null,
          }; // Comprobar si participant es null antes de llamar a get()
        })
      );

      bracket.dataValues.competitors = competitorsWithDetails.map(
        (competitor) => {
          return { ...competitor, Participant: competitor.Participant };
        }
      );
    }

    res.status(200).json({ status: 200, data: brackets });
  } catch (error) {
    console.error("Error fetching brackets:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const getBracketsWithMatchesByChampionshipId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId } = req.params;

    // Buscar todos los brackets para el campeonato dado
    const brackets = await Bracket.findAll({
      where: { championshipId },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
    });

    // Iterar sobre cada bracket encontrado
    for (const bracket of brackets) {
      // Buscar todos los partidos asociados al bracket actual
      const matches = await Match.findAll({
        where: { bracketId: bracket.bracketId }, // Filtrar por el bracketId actual
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
        include: [
          // Incluir detalles de los competidores (participantes) en los partidos
          {
            model: Competitor,
            as: "redCompetitor",
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
          },
          {
            model: Competitor,
            as: "blueCompetitor",
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
          },
        ],
      });

      // Agregar los partidos al bracket actual
      bracket.dataValues.matches = matches;
    }

    // Enviar respuesta con los brackets y sus partidos asociados
    res.status(200).json({ status: 200, data: brackets });
  } catch (error) {
    console.error("Error fetching brackets:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const createBracket = async (req: Request, res: Response) => {
  try {
    const { divisionName, categoryName, championshipId } = req.body;
    const newBracket = await Bracket.create({
      divisionName: divisionName,
      categoryName: categoryName,
      championshipId: championshipId,
    });

    const response: ApiResponse<typeof newBracket> = {
      status: 201,
      data: newBracket,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the bracket:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteBracket = async (req: Request, res: Response) => {
  try {
    const { bracketId } = req.query;

    const bracketToDelete = await Bracket.findByPk(bracketId as string);

    if (!bracketToDelete) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Bracket not found.",
      };
      return res.status(response.status).json(response);
    }

    await bracketToDelete.destroy();

    const response: ApiResponse<typeof bracketToDelete> = {
      status: 200,
      data: bracketToDelete,
    };

    res.json(response);
  } catch (error) {
    console.error("Error deleting the bracket:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
