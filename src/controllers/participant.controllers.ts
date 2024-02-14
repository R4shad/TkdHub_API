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
            participant.participantCi
          );

          if (completeParticipant) {
            return {
              ...completeParticipant.toJSON(),
              verified: participant.verified,
            };
          } else {
            console.error(
              "Participant not found for ID:",
              participant.participantCi
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
          championshipParticipant.participantCi === participant.participantCi
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
          (regParticipant) =>
            regParticipant.participantCi === participant.participantCi
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

    let existingParticipant = await Participant.findOne({
      where: { participantCi: participantData.participantCi },
    });

    if (!existingParticipant) {
      existingParticipant = await Participant.create(participantData);
    } else {
      await existingParticipant.update(participantData);
    }

    const existingChampionshipParticipant =
      await ChampionshipParticipant.findOne({
        where: {
          participantCi: participantData.participantCi,
          championshipId: championshipId,
        },
      });

    if (!existingChampionshipParticipant) {
      await ChampionshipParticipant.create({
        participantCi: participantData.participantCi,
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

export const updateParticipantVerification = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, participantCi } = req.params;

    // Buscar al participante en la tabla ChampionshipParticipant
    const championshipParticipant = await ChampionshipParticipant.findOne({
      where: {
        championshipId: championshipId,
        participantCi: participantCi,
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
