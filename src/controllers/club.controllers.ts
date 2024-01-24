// controllers/club.controllers.ts
import { Request, Response } from "express";
import Club from "./../models/club";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipClub from "./../models/championshipClub";
import ChampionshipCoach from "./../models/championshipCoach";
import Coach from "./../models/coach";

export const getClubs = async (req: Request, res: Response) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);

    // Obtener los clubes asociados al campeonato
    const clubsList = await ChampionshipClub.findAll({
      where: { championshipId: championshipId },
      include: [Club], // Incluir información de la tabla Club
    });

    const response: ApiResponse<typeof clubsList> = {
      status: 200,
      data: clubsList,
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
    const { clubCode, name, coachCi } = req.body;

    // Verificar si el club ya existe en ChampionshipClub
    const existingClub = await ChampionshipClub.findOne({
      where: {
        clubCode: clubCode,
        championshipId: parseInt(championshipId, 10),
      },
    });

    if (existingClub) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A club with this clubCode already exists.",
      };
      return res.status(response.status).json(response);
    }

    // Verificar si el entrenador ya existe en ChampionshipCoach
    const existingCoach = await ChampionshipCoach.findOne({
      where: {
        coachCi: coachCi,
        championshipId: parseInt(championshipId, 10),
      },
    });

    if (existingCoach) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A coach with this coachCi already exists.",
      };
      return res.status(response.status).json(response);
    }

    // Crear un nuevo club
    const newClub = await Club.create({
      clubCode: clubCode,
      name: name,
    });

    // Asociar el club al campeonato en ChampionshipClub
    await ChampionshipClub.create({
      championshipId: parseInt(championshipId, 10),
      clubCode: clubCode,
    });

    // Crear un nuevo coach
    const newCoach = await Coach.create({
      coachCi: coachCi,
      name: name, // Puedes ajustar según tus necesidades
      clubCode: clubCode,
    });

    // Asociar al coach al campeonato en ChampionshipCoach
    await ChampionshipCoach.create({
      championshipId: parseInt(championshipId, 10),
      coachCi: coachCi,
      password: generatePassword(name, coachCi),
    });

    const response: ApiResponse<typeof newClub> = {
      status: 201,
      data: newClub,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the club:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }

  function generatePassword(name: string, ci: number): string {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    const passwordBase = `${initials}${ci}`;
    const randomComponent = Math.random().toString(36).substring(7);
    const password = `${passwordBase}_${randomComponent}`;
    return password;
  }
};
