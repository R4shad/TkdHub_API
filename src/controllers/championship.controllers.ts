// controllers/championship.controllers.ts
import { Request, Response } from "express";
import Championship from "./../models/championship";
import ApiResponse from "../interfaces/apiResponse";

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
    const { name, organizer, championshipDate } = req.body;

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
