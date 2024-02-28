// match.controllers.ts

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
          attributes: ["competitorId"], // Solo incluir competitorId de redCompetitor
          include: [
            {
              model: Participant,
              attributes: ["lastNames", "firstNames", "clubCode"],
            },
          ],
        },
        {
          model: Competitor,
          as: "blueCompetitor",
          attributes: ["competitorId"], // Solo incluir competitorId de blueCompetitor
          include: [
            {
              model: Participant,
              attributes: ["lastNames", "firstNames", "clubCode"],
            },
          ],
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
    const { bracketId, redParticipantId, blueParticipantId, round } = req.body;

    // Crear un nuevo partido con championshipId
    const newMatch = await Match.create({
      championshipId, // Agregar championshipId al crear el partido
      bracketId,
      redParticipantId,
      blueParticipantId,
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
