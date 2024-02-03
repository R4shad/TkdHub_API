import { Request, Response } from "express";
import Club from "./../models/club";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipClub from "./../models/championshipClub";

export const getClubs = async (req: Request, res: Response) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);

    // Obtener los clubes asociados al campeonato a través de la tabla intermedia
    const clubsList = await ChampionshipClub.findAll({
      where: { championshipId: championshipId },
      include: [
        {
          model: Club,
          attributes: ["clubCode"],
        },
      ],
    });

    // Mapear la respuesta para obtener solo los campos deseados
    const mappedClubsList = await Promise.all(
      clubsList.map(async (championshipClub) => {
        const clubCode = championshipClub.getDataValue("clubCode");
        const clubName = await Club.findOne({
          where: { clubCode: clubCode },
          attributes: ["name"],
        });
        return {
          clubCode,
          name: clubName ? clubName.getDataValue("name") : null,
        };
      })
    );

    const response: ApiResponse<typeof mappedClubsList> = {
      status: 200,
      data: mappedClubsList,
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const createClub = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;
    const { clubCode, name, coachCi } = req.body;

    // Verificar si el club ya existe en ChampionshipClub
    const existingClub = await ChampionshipClub.findOne({
      where: {
        clubCode: clubCode,
        championshipId: parseInt(championshipId, 10),
      },
    });

    if (existingClub) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A club with this clubCode already exists.",
      };
      return res.status(response.status).json(response);
    }

    // Crear un nuevo club
    const newClub = await Club.create({
      clubCode: clubCode,
      name: name,
    });

    // Asociar el club al campeonato en ChampionshipClub
    await ChampionshipClub.create({
      championshipId: parseInt(championshipId, 10),
      clubCode: clubCode,
    });

    // Obtener los valores del modelo Club como un objeto simple
    const clubData = newClub.toJSON();

    const response: ApiResponse<typeof clubData> = {
      status: 201,
      data: clubData,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error creating the club:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
