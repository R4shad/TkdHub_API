import { Request, Response } from "express";
import Bracket from "../models/bracket";
import ApiResponse from "../interfaces/apiResponse";
import Competitor from "../models/competitor";
import Participant from "../models/participant";
import Match from "../models/match";
import ChampionshipDivision from "../models/championshipDivision";
import ChampionshipCategory from "../models/championshipCategory";
import ChampionshipAgeInterval from "../models/championshipAgeInterval";

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
      const division = await ChampionshipDivision.findByPk(bracket.divisionId, {
        include: [ChampionshipAgeInterval],
      });

      const category = await ChampionshipCategory.findByPk(bracket.categoryId);

      const competitors = await Competitor.findAll({
        where: {
          championshipId,
          divisionId: bracket.divisionId,
          categoryId: bracket.categoryId,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
      });

      const competitorsWithDetails = await Promise.all(
        competitors.map(async (competitor) => {
          const participant = await Participant.findOne({
            where: { id: competitor.participantId },
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
          });
          return {
            ...competitor.toJSON(),
            participant: participant ? participant.toJSON() : null,
          };
        })
      );

      bracket.dataValues.competitors = competitorsWithDetails;
      bracket.dataValues.division = division?.toJSON();
      bracket.dataValues.category = category?.toJSON();
    }

    // Ordenar brackets según los criterios especificados
    brackets.sort((a, b) => {
      const aDivision = a.dataValues.division;
      const bDivision = b.dataValues.division;
      const aCategory = a.dataValues.category;
      const bCategory = b.dataValues.category;

      // Ordenar por gradeMin de la categoría
      const gradeMinComparison = (aCategory?.gradeMin || "").localeCompare(
        bCategory?.gradeMin || ""
      );
      if (gradeMinComparison !== 0) {
        return gradeMinComparison;
      }

      const aAgeInterval = aDivision ? aDivision.ChampionshipAgeInterval : null;
      const bAgeInterval = bDivision ? bDivision.ChampionshipAgeInterval : null;

      // Ordenar por minAge de ChampionshipAgeInterval
      if (aAgeInterval?.minAge !== bAgeInterval?.minAge) {
        return (aAgeInterval?.minAge || 0) - (bAgeInterval?.minAge || 0);
      }

      // Ordenar por minWeight de la división
      if (aDivision?.minWeight !== bDivision?.minWeight) {
        return (aDivision?.minWeight || 0) - (bDivision?.minWeight || 0);
      }

      // Ordenar por gender de la división
      if (aDivision?.gender && bDivision?.gender) {
        return aDivision.gender.localeCompare(bDivision.gender);
      }

      // Si todos los criterios son iguales, mantener el orden original
      return 0;
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

export const getBracketsWithOneCompetitorByChampionshipId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId } = req.params;

    const brackets = await Bracket.findAll({
      where: { championshipId },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
    });

    const bracketsWithOneCompetitor = await Promise.all(
      brackets.map(async (bracket) => {
        const competitors = await Competitor.findAll({
          where: {
            championshipId,
            divisionId: bracket.divisionId,
            categoryId: bracket.categoryId,
          },
          attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
        });

        if (competitors.length === 1) {
          const competitor = competitors[0];
          const participant = await Participant.findOne({
            where: { Id: competitor.participantId },
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
          });

          const competitorWithDetails = {
            ...competitor.get(),
            participant: participant ? participant.get() : null,
          }; // Comprobar si participant es null antes de llamar a get()

          return { ...bracket.get(), competitor: competitorWithDetails };
        } else {
          return null;
        }
      })
    );

    const filteredBrackets = bracketsWithOneCompetitor.filter(
      (bracket) => bracket !== null
    );

    res.status(200).json({ status: 200, data: filteredBrackets });
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
    const { divisionId, categoryId, championshipId } = req.body;
    const newBracket = await Bracket.create({
      divisionId: divisionId,
      categoryId: categoryId,
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
  const bracketId = req.params.bracketId;
  try {
    const result = await Bracket.destroy({
      where: { bracketId },
    });
    console.log(result);
    if (result === 1) {
      res
        .status(200)
        .json({ status: 200, message: "Bracket eliminado exitosamente" });
    } else {
      res.status(404).json({ status: 404, message: "Bracket no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Error al procesar la solicitud" });
    console.log(error);
  }
};
