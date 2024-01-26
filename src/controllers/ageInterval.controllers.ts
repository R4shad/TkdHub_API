import { Request, Response } from "express";
import AgeInterval from "../models/ageInterval";
import ApiResponse from "../interfaces/apiResponse";

export const getAgeIntervals = async (req: Request, res: Response) => {
  try {
    const ageIntervalsList = await AgeInterval.findAll();
    const response: ApiResponse<typeof ageIntervalsList> = {
      status: 200,
      data: ageIntervalsList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching age intervals:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createAgeInterval = async (req: Request, res: Response) => {
  try {
    const { ageIntervalName, minAge, maxAge } = req.body;

    // Crear un nuevo intervalo de edad
    const newAgeInterval = await AgeInterval.create({
      ageIntervalName: ageIntervalName,
      minAge: minAge,
      maxAge: maxAge,
    });

    const response: ApiResponse<typeof newAgeInterval> = {
      status: 201,
      data: newAgeInterval,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the age interval:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteAgeInterval = async (req: Request, res: Response) => {
  try {
    const { ageIntervalId } = req.query;

    // Verificar si el intervalo de edad existe
    const ageIntervalToDelete = await AgeInterval.findByPk(
      ageIntervalId as string
    );

    if (!ageIntervalToDelete) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Age interval not found.",
      };
      return res.status(response.status).json(response);
    }

    // Eliminar el intervalo de edad
    await ageIntervalToDelete.destroy();

    const response: ApiResponse<typeof ageIntervalToDelete> = {
      status: 200,
      data: ageIntervalToDelete,
    };
    res.json(response);
  } catch (error) {
    console.error("Error deleting the age interval:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
