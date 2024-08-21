import { Request, Response } from "express";
import Responsible from "./../models/responsible";

import ApiResponse from "../interfaces/apiResponse";
import * as nodemailer from "nodemailer";
import ChampionshipResponsible from "./../models/championshipResponsible";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import Championship from "../models/championship";

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
        responsibleId: responsible.responsibleId,
        name: responsibleData?.name || null, // Acceder al nombre de Responsible
        email: responsibleData?.email,
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
/*
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
};*/

export const createResponsible = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const { name, email } = req.body;

    // Verificar si el responsible ya existe en la base de datos
    const existingResponsible = await Responsible.findOne({
      where: { email: email },
    });

    if (existingResponsible) {
      // Actualizar los valores del responsible existente
      await existingResponsible.update({
        name: name,
        email: email,
      });

      // Agregar el responsible existente a ChampionshipResponsible si no está presente
      await ChampionshipResponsible.create({
        championshipId: parseInt(championshipId, 10),
        responsibleId: existingResponsible.id,
      });

      const response = {
        status: 200,
        message: "Responsible updated successfully",
        data: existingResponsible.toJSON(),
      };
      return res.status(response.status).json(response);
    } else {
      // Crear un nuevo responsible y agregarlo a ChampionshipResponsible
      const newResponsible = await Responsible.create({
        name: name,
        email: email,
        password: "",
      });

      await ChampionshipResponsible.create({
        championshipId: parseInt(championshipId, 10),
        responsibleId: newResponsible.id,
      });

      const response = {
        status: 201,
        message: "Responsible created successfully",
        data: newResponsible.toJSON(),
      };
      return res.status(response.status).json(response);
    }
  } catch (error) {
    console.error("Error creating/updating the responsible:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
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

export const uR = async (req: Request, res: Response) => {
  try {
    const { championshipId, responsibleId } = req.params;
    const { name, email, passowrd } = req.body;

    // Verificar si el responsable existe en ChampionshipResponsible
    const existingResponsible = await ChampionshipResponsible.findOne({
      where: { championshipId: championshipId, responsibleId: responsibleId },
    });

    if (!existingResponsible) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Responsible not found",
      };
      return res.status(response.status).json(response);
    }

    // Actualizar los valores del responsible
    await Responsible.update(
      {
        name: name,
        email: email,
        passowrd: passowrd,
      },
      { where: { id: responsibleId } }
    );

    //Envio Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tkdhub4@gmail.com",
        pass: "jbcaozbdlxbhqhvn",
      },
    });

    const text =
      "Registrate como Anotador en TkdHub ingresando a este link: http://localhost:4200/Championship/" +
      championshipId +
      "/CreatePassword/Scorer/" +
      email;

    const getName = await Championship.findOne({
      where: { championshipId: championshipId },
    });

    if (getName && getName.championshipName) {
      const mailOptions = {
        from: "tkdhub4@gmail.com",
        to: email,
        subject: getName.championshipName!,
        text: text,
      };

      transporter.sendMail(
        mailOptions,
        function (error: Error | null, info: nodemailer.SentMessageInfo) {
          if (error) {
            console.log(error);
          } else {
            console.log("Correo electrónico enviado: " + info.response);
          }
        }
      );
    }
    //Fin envio Email

    const response = {
      status: 200,
      message: "Responsible updated successfully",
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error updating the Responsible:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteResponsible = async (req: Request, res: Response) => {
  const championshipId = parseInt(req.params.championshipId, 10);
  const responsibleId = req.params.responsibleId;

  try {
    const responsible = await ChampionshipResponsible.findOne({
      where: {
        championshipId: championshipId,
        responsibleId: responsibleId,
      },
    });

    if (!responsible) {
      return res.status(404).json({
        status: 404,
        error: "Responsible not found",
      });
    }

    await responsible.destroy();

    const response = {
      status: 200,
      message: "Responsible deleted successfully",
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error deleting the responsible:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const updateResponsiblePassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaa");
    console.log(email);
    const existingResponsable = await Responsible.findOne({
      where: { email: email },
    });

    if (existingResponsable) {
      existingResponsable.password = password;
      await existingResponsable.save();

      const response = {
        status: 200,
        message: "Responsable updated successfully",
      };
      res.status(response.status).json(response);
    }

    const response = {
      status: 404,
      message: "Responsable not found",
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error updating the responsable:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
