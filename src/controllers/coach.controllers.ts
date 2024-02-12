import { Request, Response } from "express";
import Coach from "./../models/coach";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipCoach from "./../models/championshipCoach";
import jwt from "jsonwebtoken";
export const getCoaches = async (req: Request, res: Response) => {
  try {
    // Obtener todos los entrenadores
    const coaches = await Coach.findAll({
      attributes: ["coachCi", "name", "clubCode"],
    });

    // Obtener las contraseñas correspondientes de ChampionshipCoach
    const coachCis = coaches.map((coach) => coach.coachCi);
    const passwords = await ChampionshipCoach.findAll({
      where: {
        coachCi: coachCis,
      },
      attributes: ["coachCi", "password"],
    });
    interface CoachPasswordsMap {
      [coachCi: number]: string;
    }
    // Mapear las contraseñas con los entrenadores
    const coachPasswordsMap: CoachPasswordsMap = passwords.reduce(
      (map: CoachPasswordsMap, item) => {
        map[item.coachCi] = item.password;
        return map;
      },
      {}
    );

    // Agregar las contraseñas a los datos de los entrenadores
    const coachesWithPasswords = coaches.map((coach) => ({
      ...coach.toJSON(),
      password: coachPasswordsMap[coach.coachCi],
    }));

    const response = {
      status: 200,
      data: coachesWithPasswords,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching coaches:", error);
    const response = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const getClubCode = async (req: Request, res: Response) => {
  try {
    const { coachCi } = req.params;

    // Buscar el coach por coachCi
    const coach = await Coach.findOne({
      where: { coachCi },
      attributes: ["coachCi", "clubCode"],
    });

    if (!coach) {
      const response = {
        status: 404,
        error: "Coach not found",
      };
      res.status(response.status).json(response);
      return;
    }

    const response = {
      status: 200,
      data: {
        coachCi: coach.coachCi,
        clubCode: coach.clubCode,
      },
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching coach clubCode:", error);
    const response = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createCoach = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const { coachCi, name, clubCode } = req.body;

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

    // Crear un nuevo entrenador
    const newCoach = await Coach.create({
      coachCi: coachCi,
      name: name,
      clubCode: clubCode,
    });

    // Asociar el entrenador al campeonato en ChampionshipCoach
    await ChampionshipCoach.create({
      championshipId: parseInt(championshipId, 10),
      coachCi: coachCi,
      password: generatePassword(name, coachCi),
    });

    // Obtener los valores del modelo Coach como un objeto simple
    const coachData = newCoach.toJSON();

    const response: ApiResponse<typeof coachData> = {
      status: 201,
      data: coachData,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the coach:", error);
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

export const loginTrainer = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const { coachCi, password } = req.body;

    // Validamos si existe en la base de datos
    const championship = await ChampionshipCoach.findOne({
      where: {
        championshipId: championshipId,
        coachCi: coachCi,
        password: password,
      },
    });

    if (!championship) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Organizer not found.",
      };
      return res.status(response.status).json(response);
    }

    // Verificamos la contraseña
    if (password !== championship.password) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "Incorrect Password.",
      };
      return res.status(response.status).json(response);
    }

    // Generamos el token
    const token = jwt.sign(
      {
        coachCi: championship.coachCi,
      },
      process.env.SECRET_KEY || "R4shad"
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during organizer login:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
