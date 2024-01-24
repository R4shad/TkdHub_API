// controllers/championship.controllers.ts
import { Request, Response } from "express";
import Championship from "./../models/championship";
import ApiResponse from "../interfaces/apiResponse";
import jwt from "jsonwebtoken";

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

export const createChampionship = async (req: Request, res: Response) => {
  try {
    const { name, organizer, password, championshipDate } = req.body;

    // Check if a championship with the same name already exists
    const existingChampionship = await Championship.findOne({
      where: { name: name },
    });

    if (existingChampionship) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A championship with this name already exists.",
      };
      return res.status(response.status).json(response);
    }

    // If it doesn't exist, create a new championship
    const newChampionship = await Championship.create({
      name: name,
      organizer: organizer,
      password: password, // Aquí se guarda la contraseña
      active: 1,
      championshipDate: championshipDate,
    });

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

export const loginOrganizer = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const { organizer, password } = req.body;

    // Validamos si existe en la base de datos
    const championship = await Championship.findOne({
      where: { organizer: organizer, championshipId: championshipId },
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
        name: championship.organizer,
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
