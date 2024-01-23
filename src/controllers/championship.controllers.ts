import { Request, Response } from "express";

export const getChampionships = (req: Request, res: Response) => {
  res.json({
    msg: "Get Championships",
  });
};

export const createChampionship = (req: Request, res: Response) => {
  console.log(req.body);

  const { body } = req;

  res.json({
    msg: "New Championship",
    body,
  });
};
