import { Request, Response } from "express";
import Responsible from "./../models/responsible";

import ApiResponse from "../interfaces/apiResponse";

import ChampionshipResponsible from "./../models/championshipResponsible";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const getResponsibles = async (req: Request, res: Response) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10); // Convertir a entero

    // Obtener los responsables filtrados por championshipId
    const responsiblesList = await ChampionshipResponsible.findAll({
      where: { championshipId: championshipId },
      include: [Responsible],
    });

    const responsibleResponse = []; // Lista para almacenar los objetos JSON formateados

    for (const responsible of responsiblesList) {
      const responsibleData = await Responsible.findByPk(
        responsible.responsibleId
      ); // Consultar los datos de Responsible usando el responsableCi de ChampionshipResponsible
      const formattedData = {
        responsibleCi: responsible.responsibleId,
        name: responsibleData?.name || null, // Acceder al nombre de Responsible
        password: responsible.password,
      };
      responsibleResponse.push(formattedData);
    }

    const response: ApiResponse<typeof responsibleResponse> = {
      status: 200,
      data: responsibleResponse,
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

    const password = generatePassword(name, responsibleCi);
    const hashPassword = password;

    //QUITANDO EL HASH
    //const hashPassword = await bcrypt.hash(password, 10);

    await ChampionshipResponsible.create({
      championshipId: parseInt(championshipId, 10),
      responsibleCi: responsibleCi,
      password: hashPassword,
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

export const loginResponsible = async (req: Request, res: Response) => {
  const { championshipId } = req.params;
  const { responsibleCi, password } = req.body;
  //validamos si existe en la bd
  const championshipResponsible = await ChampionshipResponsible.findOne({
    where: { responsibleCi: responsibleCi, championshipId: championshipId },
  });
  if (!championshipResponsible) {
    const response: ApiResponse<undefined> = {
      status: 404,
      error: "Responsible not found.",
    };
    return res.status(response.status).json(response);
  }
  //verificamos la contrasenia

  //QUITAMOS EL HASH
  /*const passwordValid = await bcrypt.compare(
    password,
    championshipResponsible.password
  );*/

  if (password !== championshipResponsible.password) {
    const response: ApiResponse<undefined> = {
      status: 400,
      error: "Incorrect Password.",
    };
    return res.status(response.status).json(response);
  }

  //GENERAMOS TOKEN
  //obtenemos nombre de Responsable:
  const responsibleName = await Responsible.findOne({
    where: { responsibleCi: responsibleCi } || "User",
  });

  const token = jwt.sign(
    {
      name: responsibleName!.name,
    },
    process.env.SECRET_KEY || "R4shad"
  );
  res.json({ token });
};
