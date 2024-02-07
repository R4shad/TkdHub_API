// controllers/division.controllers.ts
import { Request, Response } from "express";
import Division from "../models/division";
import ApiResponse from "../interfaces/apiResponse";

export const getDivisions = async (req: Request, res: Response) => {
  try {
    const divisionsList = await Division.findAll();
    const response: ApiResponse<typeof divisionsList> = {
      status: 200,
      data: divisionsList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching divisions:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createDivision = async (req: Request, res: Response) => {
  try {
    const {
      divisionName,
      ageIntervalId, // Cambiado de ageIntervalName a ageIntervalId
      minWeight,
      maxWeight,
      gender,
      grouping,
    } = req.body;
    console.log(req.body);
    const newDivision = await Division.create({
      divisionName: divisionName,
      ageIntervalId: ageIntervalId, // Cambiado de ageIntervalName a ageIntervalId
      minWeight: minWeight,
      maxWeight: maxWeight,
      gender: gender,
      grouping: grouping,
    });

    const response: ApiResponse<typeof newDivision> = {
      status: 201,
      data: newDivision,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the division:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteDivision = async (req: Request, res: Response) => {
  try {
    const { divisionName } = req.query;

    const divisionToDelete = await Division.findOne({
      where: { divisionName: divisionName as string },
    });

    if (!divisionToDelete) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Division not found.",
      };
      return res.status(response.status).json(response);
    }

    await divisionToDelete.destroy();

    const response: ApiResponse<typeof divisionToDelete> = {
      status: 200,
      data: divisionToDelete,
    };

    res.json(response);
  } catch (error) {
    console.error("Error deleting the division:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
