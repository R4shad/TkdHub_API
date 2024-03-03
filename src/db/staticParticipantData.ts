import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "../models/participant";
import ChampionshipParticipant from "../models/championshipParticipant";

(async () => {
  try {
    const championshipId: number = 2;

    await sequelize.sync(); // Sincroniza el modelo con la base de datos, eliminando las tablas existentes si existen

    const clubs = ["LIN", "ANT", "D-3", "REL"];
    const grades = [
      "amarillo",
      "franja amarillo",
      "verde",
      "franja verde",
      "rojo",
      "franja rojo",
    ];
    const genders = ["Masculino", "Femenino"];

    const participants = [];

    // Crear 50 participantes y guardarlos en la base de datos
    for (let i = 0; i < 10; i++) {
      const clubCode = "LIN2";
      const age = 40;
      const weight = 45;
      const grade = "franja negro";
      const gender = "Femenino";
      const firstName = "Nombre" + i;
      const lastName = "Apellido" + i;

      const participant = await Participant.create({
        clubCode,
        age,
        weight,
        grade,
        gender,
        firstNames: firstName,
        lastNames: lastName,
      });

      participants.push(participant);
    }

    // Crear los registros de ChampionshipParticipant
    const championshipParticipants = participants.map((participant) => ({
      participantId: participant.id,
      championshipId: championshipId, // ID de campeonato aleatorio entre 1 y 10
      verified: false,
    }));

    // Insertar los registros de ChampionshipParticipant en la base de datos
    await ChampionshipParticipant.bulkCreate(championshipParticipants);

    console.log("Datos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await sequelize.close(); // Cierra la conexión a la base de datos al finalizar
  }
})();
