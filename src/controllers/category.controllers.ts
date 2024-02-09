import { Request, Response } from "express";
import Category from "../models/category";
import ApiResponse from "../interfaces/apiResponse";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categoriesList = await Category.findAll();
    const response: ApiResponse<typeof categoriesList> = {
      status: 200,
      data: categoriesList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, gradeMin, gradeMax } = req.body;
    const newCategory = await Category.create({
      categoryName: categoryName,
      gradeMin: gradeMin,
      gradeMax: gradeMax,
    });

    const response: ApiResponse<typeof newCategory> = {
      status: 201,
      data: newCategory,
    };

    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the category:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.query;

    const categoryToDelete = await Category.findOne({
      where: { categoryName: categoryName as string },
    });

    if (!categoryToDelete) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Category not found.",
      };
      return res.status(response.status).json(response);
    }

    await categoryToDelete.destroy();

    const response: ApiResponse<typeof categoryToDelete> = {
      status: 200,
      data: categoryToDelete,
    };

    res.json(response);
  } catch (error) {
    console.error("Error deleting the category:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
