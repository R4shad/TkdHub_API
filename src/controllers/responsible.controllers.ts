import { Request, Response } from "express";
import Responsible from "./../models/responsible";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipResponsible from "./../models/championshipResponsible";

export const getResponsibles = async (req: Request, res: Response) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10); // Convertir a entero

    // Obtener los responsables filtrados por championshipId
    const responsiblesList = await ChampionshipResponsible.findAll({
      where: { championshipId: championshipId },
      include: [Responsible], // Incluir información de la tabla Responsible
    });

    const response: ApiResponse<typeof responsiblesList> = {
      status: 200,
      data: responsiblesList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching responsibles:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createResponsible = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const { responsibleCi, name } = req.body;

    // Verificar si el responsable ya existe en ChampionshipResponsible
    const existingResponsible = await ChampionshipResponsible.findOne({
      where: {
        responsibleCi: responsibleCi,
        championshipId: parseInt(championshipId, 10),
      },
    });

    if (existingResponsible) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A responsible with this responsibleCi already exists.",
      };
      return res.status(response.status).json(response);
    }

    // Crear un nuevo responsable
    const newResponsible = await Responsible.create({
      responsibleCi: responsibleCi,
      name: name,
    });

    // Asociar el responsable al campeonato en ChampionshipResponsible
    await ChampionshipResponsible.create({
      championshipId: parseInt(championshipId, 10),
      responsibleCi: responsibleCi,
      password: generatePassword(name, responsibleCi),
    });

    const response: ApiResponse<typeof newResponsible> = {
      status: 201,
      data: newResponsible,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the responsible:", error);
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
