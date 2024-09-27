import { Request, Response } from "express";
import Club from "./../models/club";
import ApiResponse from "../interfaces/apiResponse";
import ChampionshipClub from "./../models/championshipClub";
import * as nodemailer from "nodemailer";
import Championship from "../models/championship";

export const getClubs = async (req: Request, res: Response) => {
  try {
    const championshipId = parseInt(req.params.championshipId, 10);

    const clubsList = await ChampionshipClub.findAll({
      where: { championshipId: championshipId },
    });

    const mappedClubsList = clubsList.map(async (championshipClub) => {
      const club = await Club.findOne({
        where: { clubCode: championshipClub.clubCode },
      });

      const clubData = {
        clubCode: championshipClub.clubCode,
        name: club ? club.name : null,
        coachName: club ? club.coachName : null,
        email: club ? club.email : null, // Agregado el campo email
      };

      return clubData;
    });

    const clubs = await Promise.all(mappedClubsList);

    const response: ApiResponse<typeof clubs> = {
      status: 200,
      data: clubs,
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
    const { clubCode, name, coachName, email } = req.body;
    // Verificar si el club ya existe en ChampionshipClub
    const existingClubInChampionship = await ChampionshipClub.findOne({
      where: {
        championshipId: parseInt(championshipId, 10),
        clubCode: clubCode,
      },
    });

    if (existingClubInChampionship) {
      const response: ApiResponse<undefined> = {
        status: 400,
        error: "A club with this clubCode already exists in the championship.",
      };
      return res.status(response.status).json(response);
    }

    // Verificar si el club ya existe en la base de datos
    const existingClub = await Club.findOne({
      where: { clubCode: clubCode },
    });

    if (existingClub) {
      // Actualizar los valores del club existente
      await existingClub.update({
        name: name,
        coachName: coachName,
        email: email,
      });

      // Agregar el club existente a ChampionshipClub si no está presente
      await ChampionshipClub.create({
        championshipId: parseInt(championshipId, 10),
        clubCode: clubCode,
      });

      const response = {
        status: 200,
        message: "Club updated successfully",
        data: existingClub.toJSON(),
      };
      return res.status(response.status).json(response);
    } else {
      // Crear un nuevo club y agregarlo a ChampionshipClub
      const newClub = await Club.create({
        clubCode: clubCode,
        name: name,
        coachName: coachName,
        email: email,
        password: "",
      });

      await ChampionshipClub.create({
        championshipId: parseInt(championshipId, 10),
        clubCode: clubCode,
      });

      const response = {
        status: 201,
        message: "Club created successfully",
        data: newClub.toJSON(),
      };
      return res.status(response.status).json(response);
    }
  } catch (error) {
    console.error("Error creating/updating the club:", error);
    const response: ApiResponse<undefined> = {
      status: 500,
      error: "There was an error processing the request.",
    };
    res.status(response.status).json(response);
  }
};

export const updateClub = async (req: Request, res: Response) => {
  try {
    const { championshipId, oldClubCode } = req.params;
    const { name, coachName, email, clubCode } = req.body;
    // Verificar si el club existe en ChampionshipClub
    const existingChampionshipClub = await ChampionshipClub.findOne({
      where: { championshipId: championshipId, clubCode: oldClubCode },
    });

    if (!existingChampionshipClub) {
      const response: ApiResponse<undefined> = {
        status: 404,
        error: "Club not found",
      };
      return res.status(response.status).json(response);
    }

    const existingClub = await Club.findOne({
      where: { clubCode: clubCode },
    });

    console.log("EXISTING CLUB:", existingClub);
    if (existingClub) {
      console.log("ENTREEEEE");
      await existingChampionshipClub.destroy();

      const newClub = await ChampionshipClub.findOne({
        where: { clubCode: oldClubCode },
      });
      await newClub?.destroy();

      await Club.update(
        {
          name: name,
          coachName: coachName,
          email: email,
        },
        { where: { clubCode: clubCode } }
      );

      await ChampionshipClub.create({
        clubCode: clubCode,
        championshipId: championshipId,
      });

      if (oldClubCode === "NEW") {
        const toDelete = await Club.findOne({
          where: { clubCode: oldClubCode },
        });
      }
    } else {
      // Actualizar los valores del club
      await Club.update(
        {
          clubCode: clubCode,
          name: name,
          coachName: coachName,
          email: email,
        },
        { where: { clubCode: oldClubCode } }
      );
    }

    //Envio Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tkdhub4@gmail.com",
        pass: "jbcaozbdlxbhqhvn",
      },
    });

    const getId = await ChampionshipClub.findOne({
      where: { clubCode: clubCode },
      order: [["championshipId", "DESC"]],
    });

    console.log(clubCode);
    const getName = await Championship.findOne({
      where: { championshipId: getId?.championshipId },
    });
    console.log(getId);
    console.log(getName);
    const text =
      "Registrate como Entrenador en TkdHub ingresando a este link: http://localhost:4200/Championship/" +
      getId?.championshipId +
      "/CreatePassword/Coach/" +
      email;
    if (getName && getName.championshipName && getId) {
      const mailOptions = {
        from: "tkdhub4@gmail.com",
        to: email,
        subject: getName.championshipName!,
        text: text,
      };

      transporter.sendMail(
        mailOptions,
        function (error: Error | null, info: nodemailer.SentMessageInfo) {
          if (error) {
            console.log(error);
          } else {
            console.log("Correo electrónico enviado: " + info.response);
          }
        }
      );
    }
    //Fin envio Email

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
    if (clubCode === "NEW") {
      const toDelete1 = await ChampionshipClub.findOne({
        where: {
          clubCode: clubCode,
          championshipId: championshipId,
        },
      });
      await toDelete1?.destroy();

      const toDelete2 = await Club.findOne({
        where: {
          clubCode: clubCode,
        },
      });
      await toDelete2?.destroy();

      const response = {
        status: 200,
        message: "Club deleted successfully",
      };
      res.status(response.status).json(response);
    }
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

    await club.destroy();

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

export const updateCoachPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { password } = req.body;

    console.log("ASDASDA", email);

    const existingClub = await Club.findOne({
      where: { email: email },
    });

    if (existingClub) {
      existingClub.password = password;
      await existingClub.save();

      const response = {
        status: 200,
        message: "Club updated successfully",
      };
      res.status(response.status).json(response);
    }

    const response = {
      status: 404,
      message: "Coach not found",
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
