import { Request, Response } from "express";
import Participant from "../models/participant";
import ChampionshipParticipant from "../models/championshipParticipant";

export const getParticipants = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    // Obtener todos los participantes para el campeonato especificado
    const participants = await ChampionshipParticipant.findAll({
      where: { championshipId: championshipId },
    });
    console.log(participants);
    // Verificar si hay participantes
    if (participants.length === 0) {
      // Si no hay participantes, devolver un arreglo vacío
      res.status(200).json([]);
    } else {
      // Si hay participantes, devolver los resultados
      res.status(200).json(participants);
    }
  } catch (error) {
    console.error("Error fetching participants:", error);
    res
      .status(500)
      .json({ error: "There was an error processing the request." });
  }
};

export const createParticipant = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const participantData = req.body;
    participantData.verified = false;
    // Verificar si el participante ya existe en la tabla Participant
    let existingParticipant = await Participant.findOne({
      where: { participantCi: participantData.participantCi },
    });

    if (!existingParticipant) {
      // Caso 1: El participante no existe en ninguna tabla
      // Crear un nuevo participante y agregarlo a la tabla Participant
      existingParticipant = await Participant.create(participantData);
    } else {
      // Caso 3: El participante existe en la tabla Participant
      // Actualizar los datos del participante si han cambiado
      await existingParticipant.update(participantData);
    }

    // Verificar si el participante ya está inscrito en el campeonato
    const existingChampionshipParticipant =
      await ChampionshipParticipant.findOne({
        where: {
          participantCi: participantData.participantCi,
          championshipId: championshipId,
        },
      });

    if (!existingChampionshipParticipant) {
      // Caso 1 y 2: Agregar al participante a la tabla ChampionshipParticipant
      await ChampionshipParticipant.create({
        participantCi: participantData.participantCi,
        championshipId: championshipId,
      });
    }

    res.status(201).json(existingParticipant);
  } catch (error) {
    console.error("Error creating participant:", error);
    res
      .status(500)
      .json({ error: "There was an error processing the request." });
  }
};
