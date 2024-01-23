import { Request, Response } from "express";

export const getChampionships = (req: Request, res: Response) => {
  res.json({
    msg: "Get Championships",
  });
};
