import { Request, Response } from "express";
import Participant from "../models/participant";
import ChampionshipParticipant from "../models/championshipParticipant";

export const getParticipants = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;

    // Obtener todos los participantes para el campeonato especificado
    const championshipParticipants = await ChampionshipParticipant.findAll({
      where: { championshipId: championshipId },
    });

    // Verificar si hay participantes
    if (championshipParticipants.length === 0) {
      // Si no hay participantes, devolver un arreglo vacío
      res.status(200).json([]);
    } else {
      // Si hay participantes, obtener los datos completos de cada participante
      const participantsPromises = championshipParticipants.map(
        async (participant) => {
          const completeParticipant = await Participant.findByPk(
            participant.participantCi
          );
          return completeParticipant;
        }
      );

      // Esperar a que todas las promesas se resuelvan y devolver los participantes completos
      const completeParticipants = await Promise.all(participantsPromises);
      res.status(200).json(completeParticipants);
    }
  } catch (error) {
    console.error("Error fetching participants:", error);
    res
      .status(500)
      .json({ error: "There was an error processing the request." });
  }
};

export const getParticipantsByClubCode = async (
  req: Request,
  res: Response
) => {
  try {
    const { clubCode } = req.params;
    console.log(clubCode);
    // Obtener todos los participantes para el código de club especificado
    const clubParticipants = await Participant.findAll({
      where: { clubCode: clubCode },
    });
    console.log(clubParticipants);
    // Verificar si hay participantes
    if (clubParticipants.length === 0) {
      // Si no hay participantes, devolver un arreglo vacío
      res.status(200).json([]);
    } else {
      // Si hay participantes, devolver los resultados
      res.status(200).json(clubParticipants);
    }
  } catch (error) {
    console.error("Error fetching participants by club code:", error);
    res
      .status(500)
      .json({ error: "There was an error processing the request." });
  }
};

export const getParticipantsToRegister = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, clubCode } = req.params;

    // Obtener todos los participantes para el clubCode especificado
    const clubParticipants = await Participant.findAll({
      where: { clubCode: clubCode },
    });

    // Obtener los participantes ya registrados para el championshipId dado
    const registeredParticipants = await ChampionshipParticipant.findAll({
      where: { championshipId: championshipId },
    });

    // Filtrar los participantes del clubCode que aún no están registrados para el championshipId
    const participantsToRegister = clubParticipants.filter(
      (participant) =>
        !registeredParticipants.find(
          (regParticipant) =>
            regParticipant.participantCi === participant.participantCi
        )
    );

    // Devolver los participantes que aún no están registrados
    res.status(200).json(participantsToRegister);
  } catch (error) {
    console.error("Error fetching participants to register:", error);
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
