import { Request, Response } from "express";
import Championship from "./../models/championship";
import Organizer from "./../models/organizer";
import ApiResponse from "../interfaces/apiResponse";
import jwt from "jsonwebtoken";

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

    const championship = await Championship.findByPk(Number(championshipId));

    if (!championship) {
      const response = {
        status: 404,
        error: "Championship not found.",
      };
      return res.status(response.status).json(response);
    }

    // Verificar si la propiedad stage no es null
    if (championship.stage === null) {
      const response = {
        status: 400,
        error: "Championship stage is null.",
      };
      return res.status(response.status).json(response);
    }

    // Obtener el índice actual del enum ChampionshipStage
    const currentStageIndex = Object.values(ChampionshipStage).indexOf(
      championship.stage
    );
    console.log("BBBBBBBBBBBBB", currentStageIndex);
    // Verificar si el campeonato está en la última etapa
    if (currentStageIndex === Object.values(ChampionshipStage).length - 1) {
      const response = {
        status: 400,
        error: "The championship is already in the last stage.",
      };
      return res.status(response.status).json(response);
    }
    console.log("CCCCCCCCCCCCc");
    // Actualizar la etapa del campeonato al siguiente
    const nextStage = Object.values(ChampionshipStage)[currentStageIndex + 1];
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", nextStage);
    await championship.update({ stage: nextStage });

    const response = {
      status: 200,
      message: "Championship stage updated successfully.",
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error updating championship stage:", error);
    const response = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
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
    const { organizerCi, organizerPassword } = req.body;

    // Buscar al organizador en la tabla Organizer
    const organizer = await Organizer.findOne({
      where: { organizerCi: organizerCi },
    });

    if (!organizer) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Organizer not found.",
      };
      return res.status(response.status).json(response);
    }

    // Verificar la contraseña del organizador
    if (organizerPassword !== organizer.password) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "Incorrect Password.",
      };
      return res.status(response.status).json(response);
    }

    // Generar el token
    const token = jwt.sign(
      {
        name: organizer.email, // Aquí deberías tener el nombre del organizador
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
