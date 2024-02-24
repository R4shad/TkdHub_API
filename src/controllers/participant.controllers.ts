import { Request, Response } from "express";
import Participant from "../models/participant";
import ChampionshipParticipant from "../models/championshipParticipant";

export const getParticipants = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;

    const championshipParticipants = await ChampionshipParticipant.findAll({
      where: { championshipId: championshipId },
    });

    if (championshipParticipants.length === 0) {
      res.status(200).json({ status: 200, data: [] });
    } else {
      const participantsPromises = championshipParticipants.map(
        async (participant) => {
          const completeParticipant = await Participant.findByPk(
            participant.participantId
          );

          if (completeParticipant) {
            return {
              ...completeParticipant.toJSON(),
              verified: participant.verified,
            };
          } else {
            console.error(
              "Participant not found for ID:",
              participant.participantId
            );
            return null;
          }
        }
      );

      const completeParticipants = await Promise.all(participantsPromises);
      res
        .status(200)
        .json({ status: 200, data: completeParticipants.filter(Boolean) });
    }
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const getParticipantsByClubCode = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, clubCode } = req.params;

    const clubParticipants = await Participant.findAll({
      where: { clubCode: clubCode },
    });

    const championshipParticipants = await ChampionshipParticipant.findAll({
      where: { championshipId: championshipId },
    });

    const participantsInChampionship = clubParticipants.filter((participant) =>
      championshipParticipants.some(
        (championshipParticipant) =>
          championshipParticipant.participantId === participant.id
      )
    );

    res.status(200).json({ status: 200, data: participantsInChampionship });
  } catch (error) {
    console.error("Error fetching participants by club code:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const getParticipantsToRegister = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, clubCode } = req.params;

    const clubParticipants = await Participant.findAll({
      where: { clubCode: clubCode },
    });

    const registeredParticipants = await ChampionshipParticipant.findAll({
      where: { championshipId: championshipId },
    });

    const participantsToRegister = clubParticipants.filter(
      (participant) =>
        !registeredParticipants.find(
          (regParticipant) => regParticipant.participantId === participant.id
        )
    );

    res.status(200).json({ status: 200, data: participantsToRegister });
  } catch (error) {
    console.error("Error fetching participants to register:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const createParticipant = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const participantData = req.body;
    participantData.verified = false;

    // Verificar si ya existe un participante con el mismo nombre, apellido y edad
    let existingParticipant = await Participant.findOne({
      where: {
        firstNames: participantData.firstNames,
        lastNames: participantData.lastNames,
        age: participantData.age,
      },
    });

    if (!existingParticipant) {
      // Si no existe, crear un nuevo participante
      existingParticipant = await Participant.create(participantData);
    } else {
      // Si existe, actualizar los datos del participante
      await existingParticipant.update(participantData);
    }

    // Verificar si ya existe una asociación entre el participante y el campeonato
    const existingChampionshipParticipant =
      await ChampionshipParticipant.findOne({
        where: {
          participantId: existingParticipant.id, // Utilizando el ID del participante existente
          championshipId: championshipId,
        },
      });

    if (!existingChampionshipParticipant) {
      // Si no existe, crear la asociación entre el participante y el campeonato
      await ChampionshipParticipant.create({
        participantId: existingParticipant.id, // Utilizando el ID del participante existente
        championshipId: championshipId,
      });
    }

    res.status(201).json({ status: 201, data: existingParticipant });
  } catch (error) {
    console.error("Error creating participant:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const updateParticipant = async (req: Request, res: Response) => {
  try {
    const { championshipId, participantId } = req.params;
    const participantData = {
      verified: true,
    };

    // Buscar al participante por su ID
    const participant = await ChampionshipParticipant.findOne({
      where: {
        championshipId: championshipId,
        participantId: participantId,
      },
    });
    console.log(participant);
    console.log(participantData);
    if (!participant) {
      return res.status(404).json({
        status: 404,
        error: "Participant not found",
      });
    }

    // Actualizar los campos del participante según los datos proporcionados en el cuerpo de la solicitud
    await participant.update(participantData);

    res.status(200).json({
      status: 200,
      message: "Participant updated successfully",
    });
  } catch (error) {
    console.error("Error updating participant:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const updateParticipantVerification = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, participantId } = req.params;

    // Buscar al participante en la tabla ChampionshipParticipant
    const championshipParticipant = await ChampionshipParticipant.findOne({
      where: {
        championshipId: championshipId,
        participantId: participantId,
      },
    });
    console.log(championshipParticipant);
    if (!championshipParticipant) {
      return res.status(404).json({
        status: 404,
        error: "Participant not found in the championship",
      });
    }

    // Actualizar el atributo verified a true
    await championshipParticipant.update({ verified: true });

    return res.status(200).json({
      status: 200,
      message: "Participant verification updated successfully",
    });
  } catch (error) {
    console.error("Error updating participant verification:", error);
    return res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const deleteParticipant = async (req: Request, res: Response) => {
  const championshipId = parseInt(req.params.championshipId);
  const participantId = req.params.participantId;
  console.log(participantId);
  try {
    const result = await ChampionshipParticipant.destroy({
      where: { championshipId, participantId },
    });
    console.log(result);
    if (result === 1) {
      res
        .status(200)
        .json({ status: 200, message: "Participante eliminado exitosamente" });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Participante no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Error al procesar la solicitud" });
    console.log(error);
  }
};
