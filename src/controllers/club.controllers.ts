import { Request, Response } from "express";
import Club from "./../models/club";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipClub from "./../models/championshipClub";

export const getClubs = async (req: Request, res: Response) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);

    const clubsList = await ChampionshipClub.findAll({
      where: { championshipId: championshipId },
    });

    const mappedClubsList = clubsList.map(async (championshipClub) => {
      const club = await Club.findOne({
        where: { clubCode: championshipClub.clubCode },
      });

      const clubData = {
        clubCode: championshipClub.clubCode,
        name: club ? club.name : null,
        coachCi: club ? club.coachCi : null,
        coachName: club ? club.coachName : null,
      };

      return clubData;
    });

    const clubs = await Promise.all(mappedClubsList);

    const response: ApiResponse<typeof clubs> = {
      status: 200,
      data: clubs,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const getClubsOrganizer = async (req: Request, res: Response) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);

    const clubsList = await ChampionshipClub.findAll({
      where: { championshipId: championshipId },
    });

    const mappedClubsList = clubsList.map(async (championshipClub) => {
      const club = await Club.findOne({
        where: { clubCode: championshipClub.clubCode },
      });

      return club;
    });

    const clubs = await Promise.all(mappedClubsList);

    const response: ApiResponse<typeof clubs> = {
      status: 200,
      data: clubs,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createClub = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const { clubCode, name, coachCi, coachName } = req.body;

    const existingClub = await Club.findOne({
      where: { clubCode: clubCode },
    });

    if (!existingClub) {
      const newPassword = generatePassword(name, clubCode); // Generar el password

      const newClub = await Club.create({
        clubCode: clubCode,
        name: name,
        coachCi: coachCi,
        coachName: coachName,
        password: newPassword,
      });

      await ChampionshipClub.create({
        championshipId: parseInt(championshipId, 10),
        clubCode: clubCode,
      });

      const response = {
        status: 201,
        data: newClub.toJSON(),
      };
      res.status(response.status).json(response);
    } else {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A club with this clubCode already exists.",
      };
      return res.status(response.status).json(response);
    }
  } catch (error) {
    console.error("Error creating the club:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }

  function generatePassword(name: string, code: string): string {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();

    const passwordBase = `${initials}${code}`; // Combinar partes del nombre y código del club
    const randomComponent = Math.random().toString(36).substring(7);
    const password = `${passwordBase}_${randomComponent}`;
    return password;
  }
};

export const updateClub = async (req: Request, res: Response) => {
  try {
    const { championshipId, clubCode } = req.params;
    const { name, coachCi, coachName } = req.body;

    const existingClub = await ChampionshipClub.findOne({
      where: { championshipId: championshipId, clubCode: clubCode },
    });

    if (!existingClub) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Club not found",
      };
      return res.status(response.status).json(response);
    }

    await Club.update(
      {
        name: name,
        coachCi: coachCi,
        coachName: coachName,
        clubCode: req.body.clubCode,
      },
      { where: { clubCode: clubCode } }
    );

    const response = {
      status: 200,
      message: "Club updated successfully",
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error updating the club:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteClub = async (req: Request, res: Response) => {
  const championshipId = parseInt(req.params.championshipId, 10);
  const clubCode = req.params.clubCode;

  try {
    const club = await ChampionshipClub.findOne({
      where: {
        championshipId: championshipId,
        clubCode: clubCode,
      },
    });

    if (!club) {
      return res.status(404).json({
        status: 404,
        error: "Club not found",
      });
    }

    await club.destroy();

    const remainingClub = await ChampionshipClub.findOne({
      where: {
        clubCode: clubCode,
      },
    });

    if (!remainingClub) {
      await Club.destroy({
        where: {
          clubCode: clubCode,
        },
      });
    }

    const response = {
      status: 200,
      message: "Club deleted successfully",
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error deleting the club:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
