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
    const { clubCode, name } = req.body;

    // Verificar si el club ya existe en Club
    const newClub = {
      clubCode: clubCode,
      name: name,
    };

    const existingClub = await Club.findOne({
      where: {
        clubCode: clubCode,
      },
    });
    if (!existingClub) {
      await Club.create({
        clubCode: clubCode,
        name: name,
      });
    }
    // Verificar si el club ya existe en ChampionshipClub
    const existingChampionshipClub = await ChampionshipClub.findOne({
      where: {
        clubCode: clubCode,
        championshipId: parseInt(championshipId, 10),
      },
    });
    if (existingChampionshipClub) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A club with this clubCode already exists.",
      };
      return res.status(response.status).json(response);
    }

    // Asociar el club al campeonato en ChampionshipClub
    await ChampionshipClub.create({
      championshipId: parseInt(championshipId, 10),
      clubCode: clubCode,
    });

    // Obtener los valores del modelo Club como un objeto simple

    const response = {
      status: 201,
      data: newClub,
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

export const updateClub = async (req: Request, res: Response) => {
  try {
    const { championshipId, clubCode } = req.params;
    const { name } = req.body;

    const existingClub = await ChampionshipClub.findOne({
      where: {
        clubCode: clubCode,
        championshipId: parseInt(championshipId, 10),
      },
    });

    if (!existingClub) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Club not found",
      };
      return res.status(response.status).json(response);
    }

    // Actualizar el nombre del club en la tabla Club
    await Club.update({ name: name }, { where: { clubCode: clubCode } });

    const response = {
      status: 200,
      message: "Club updated successfully",
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error updating the club:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const deleteClub = async (req: Request, res: Response) => {
  const championshipId = parseInt(req.params.championshipId, 10);
  const clubCode = req.params.clubCode;

  try {
    // Buscar el club en ChampionshipClub
    const club = await ChampionshipClub.findOne({
      where: {
        championshipId: championshipId,
        clubCode: clubCode,
      },
    });

    if (!club) {
      return res.status(404).json({
        status: 404,
        error: "Club not found",
      });
    }

    // Eliminar el club de ChampionshipClub
    await club.destroy();

    // Eliminar el club de la tabla Club si no está asociado a otro campeonato
    const remainingClub = await ChampionshipClub.findOne({
      where: {
        clubCode: clubCode,
      },
    });

    if (!remainingClub) {
      await Club.destroy({
        where: {
          clubCode: clubCode,
        },
      });
    }

    const response = {
      status: 200,
      message: "Club deleted successfully",
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error deleting the club:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};
