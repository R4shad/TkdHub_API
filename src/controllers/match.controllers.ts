import { Request, Response } from "express";
import Match from "../models/match";
import Competitor from "../models/competitor";
import Participant from "../models/participant";

// Controlador para obtener partidos por ID de campeonato
export const getMatchesByChampionshipId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId } = req.params;

    // Buscar partidos por el ID del campeonato
    const matches = await Match.findAll({
      where: { championshipId },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
      include: [
        {
          model: Competitor,
          as: "redCompetitor",
          include: [Participant], // Incluir detalles del participante
        },
        {
          model: Competitor,
          as: "blueCompetitor",
          include: [Participant], // Incluir detalles del participante
        },
      ],
    });

    // Enviar respuesta con los partidos encontrados
    res.status(200).json({ status: 200, data: matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

// Controlador para obtener partidos por ID de campeonato y ID de bracket
export const getMatchesByChampionshipIdAndBracketId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, bracketId } = req.params;

    // Buscar partidos por el ID del campeonato y el ID del bracket
    const matches = await Match.findAll({
      where: { championshipId, bracketId },
      attributes: {
        exclude: ["createdAt", "updatedAt"], // Excluir createdAt y updatedAt de Match
      },
      include: [
        {
          model: Competitor,
          as: "redCompetitor",
          include: [Participant], // Incluir detalles del participante
        },
        {
          model: Competitor,
          as: "blueCompetitor",
          include: [Participant], // Incluir detalles del participante
        },
      ],
    });

    // Enviar respuesta con los partidos encontrados
    res.status(200).json({ status: 200, data: matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

// Controlador para crear un nuevo partido
export const createMatch = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params; // Obtener championshipId de los parámetros de ruta
    const { bracketId, redCompetitorId, blueCompetitorId, round } = req.body;

    // Crear un nuevo partido con championshipId
    const newMatch = await Match.create({
      championshipId, // Agregar championshipId al crear el partido
      bracketId,
      redCompetitorId,
      blueCompetitorId,
      round,
      redRounds: 0, // Valor predeterminado para redRounds
      blueRounds: 0, // Valor predeterminado para blueRounds
    });

    // Enviar respuesta con el partido creado
    res.status(201).json({ status: 201, data: newMatch });
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params; // Obtener matchId de los parámetros de ruta
    const {
      bracketId,
      redCompetitorId,
      blueCompetitorId,
      round,
      redRounds,
      blueRounds,
      championshipId,
    } = req.body;

    // Buscar el partido por matchId
    const match = await Match.findByPk(matchId);

    if (!match) {
      return res.status(404).json({
        status: 404,
        error: "Match not found",
      });
    }

    // Actualizar los valores del partido si se proporcionan en el cuerpo de la solicitud
    if (bracketId !== undefined) {
      match.bracketId = bracketId;
    }
    if (round !== undefined) {
      match.round = round;
    }
    if (redRounds !== undefined) {
      match.redRounds = redRounds;
    }
    if (blueRounds !== undefined) {
      match.blueRounds = blueRounds;
    }
    if (championshipId !== undefined) {
      match.championshipId = championshipId;
    }

    // Intercambiar los IDs de los competidores rojo y azul
    if (redCompetitorId !== undefined && blueCompetitorId !== undefined) {
      match.redCompetitorId = redCompetitorId;
      match.blueCompetitorId = blueCompetitorId;
    } else {
      if (redCompetitorId !== undefined) {
        match.redCompetitorId = redCompetitorId;
      } else {
        if (blueCompetitorId !== undefined) {
          match.blueCompetitorId = blueCompetitorId;
        }
      }
    }

    // Guardar los cambios
    await match.save();

    // Enviar respuesta con el partido actualizado
    res.status(200).json({ status: 200, data: match });
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};
