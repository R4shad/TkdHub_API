import { Request, Response } from "express";
import Championship from "./../models/championship";
import Organizer from "./../models/organizer";
import ApiResponse from "../interfaces/apiResponse";
import jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import Club from "../models/club";
import Responsible from "../models/responsible";

enum ChampionshipStage {
  Etapa1 = "InitialConfiguration",
  Etapa2 = "ClubRegistration",
  Etapa3 = "Registrations",
  Etapa4 = "Weigh-in",
  Etapa5 = "Groupings",
  Etapa6 = "BracketDraw",
  Etapa7 = "ResponsiblesRegistration",
  Etapa8 = "CombatRecord",
  Etapa9 = "End",
}

export const getChampionships = async (req: Request, res: Response) => {
  try {
    const championshipsList = await Championship.findAll();
    const response: ApiResponse<typeof championshipsList> = {
      status: 200,
      data: championshipsList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching championships:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const getChampionshipStage = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;

    // Obtener el campeonato por ID
    const championship = await Championship.findByPk(championshipId);

    if (!championship) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Championship not found.",
      };
      return res.status(response.status).json(response);
    }

    // Convertir el tipo ChampionshipStage | null a string
    const stage: string = championship.stage ?? "Unknown";

    const response: ApiResponse<{ stage: string }> = {
      status: 200,
      data: { stage },
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching championship stage by ID:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const updateStage = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    console.log("Championship ID:", championshipId);

    // Buscar el campeonato por su ID
    const championship = await Championship.findByPk(Number(championshipId));

    if (!championship) {
      return res.status(404).json({ error: "Championship not found." });
    }

    // Verificar si la propiedad stage es null
    if (championship.stage === null) {
      return res.status(400).json({ error: "Championship stage is null." });
    }

    // Obtener el índice actual del enum ChampionshipStage
    const currentStageIndex = Object.values<string>(ChampionshipStage).indexOf(
      championship.stage as string
    );

    console.log("Current Stage Index:", currentStageIndex);

    // Verificar si el campeonato ya está en la última etapa
    if (currentStageIndex === Object.values(ChampionshipStage).length - 1) {
      return res
        .status(400)
        .json({ error: "The championship is already in the last stage." });
    }

    // Obtener el índice de la siguiente etapa
    const nextStageIndex = currentStageIndex + 1;

    // Obtener la siguiente etapa
    const nextStage = Object.values(ChampionshipStage)[nextStageIndex];

    console.log("Next Stage (Value):", nextStage);

    // Actualizar la etapa del campeonato
    await championship.update({ stage: nextStage });

    console.log("Stage updated successfully to:", nextStage);

    return res
      .status(200)
      .json({ message: "Championship stage updated successfully." });
  } catch (error) {
    console.error("Error updating championship stage:", error);
    return res
      .status(500)
      .json({ error: "There was an error processing the request." });
  }
};

export const createChampionship = async (req: Request, res: Response) => {
  try {
    const { championshipName, organizer, email, championshipDate } = req.body;

    // Check if a championship with the same name already exists
    const existingChampionship = await Championship.findOne({
      where: { championshipName: championshipName },
    });

    if (existingChampionship) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A championship with this name already exists.",
      };
      return res.status(response.status).json(response);
    }

    // If it doesn't exist, create a new organizer
    const newOrganizer = await Organizer.create({
      email: email,
      password: "",
    });

    // Create a new championship with organizerId set to the newly created organizer's ID
    const newChampionship = await Championship.create({
      championshipName: championshipName,
      organizer: organizer,
      organizerId: newOrganizer.organizerId, // Set organizerId to the newly created organizer's ID
      active: 1,
      championshipDate: championshipDate,
      stage: "InitialConfiguration",
      goldPoints: 7,
      silverPoints: 4,
      bronzePoints: 1,
    });

    const getId = await Championship.findOne({
      where: { championshipName: championshipName },
    });

    //Envio Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tkdhub4@gmail.com",
        pass: "jbcaozbdlxbhqhvn",
      },
    });
    const text =
      "Registrate como Organizador en TkdHub ingresando a este link: http://localhost:4200/Championship/" +
      getId?.championshipId +
      "/CreatePassword/Organizer/" +
      email;
    const mailOptions = {
      from: "tkdhub4@gmail.com",
      to: email,
      subject: championshipName,
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

    const response: ApiResponse<typeof newChampionship> = {
      status: 201,
      data: newChampionship,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the championship:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const { email, password } = req.body;

    // Buscar al organizador en las tablas Organizer, Club, y Responsible
    const organizer = await Organizer.findOne({ where: { email: email } });
    const coach = await Club.findOne({ where: { email: email } });
    const responsible = await Responsible.findOne({ where: { email: email } });

    // Verificar si el email pertenece a alguna de las tablas
    if (!organizer && !coach && !responsible) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "User not found.",
      };
      return res.status(response.status).json(response);
    }

    let user = null;
    let userRole = "";
    let clubCode = "";
    // Verificar la contraseña según la tabla correspondiente
    if (organizer && password === organizer.password) {
      user = organizer;
      userRole = "Organizer";
    } else if (coach && password === coach.password) {
      user = coach;
      userRole = "Coach";
      clubCode = coach.clubCode;
    } else if (responsible && password === responsible.password) {
      user = responsible;
      userRole = "Scorer";
      clubCode = "BracketResults";
    } else {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "Incorrect Password.",
      };
      return res.status(response.status).json(response);
    }

    // Generar el token con el rol adecuado
    const token = jwt.sign(
      {
        role: userRole,
      },
      process.env.SECRET_KEY || "R4shad"
    );

    res.json({ token, role: userRole, clubCode: clubCode });
  } catch (error) {
    console.error("Error during login:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const getChampionshipById = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;

    // Obtener el campeonato por ID
    const championship = await Championship.findByPk(championshipId);

    if (!championship) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Championship not found.",
      };
      return res.status(response.status).json(response);
    }

    const response: ApiResponse<typeof championship> = {
      status: 200,
      data: championship,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching championship by ID:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const updateOrganizerPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { password } = req.body;

    const existingOrganizer = await Organizer.findOne({
      where: { email: email },
    });

    if (existingOrganizer) {
      existingOrganizer.password = password;
      await existingOrganizer.save();

      const response = {
        status: 200,
        message: "Organizer updated successfully",
      };
      res.status(response.status).json(response);
    }

    const response = {
      status: 404,
      message: "Organizer not found",
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
