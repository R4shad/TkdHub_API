import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import ChampionshipParticipant from "../models/championshipParticipant";
import Participant from "../models/participant";

(async () => {
  try {
    const championshipId = 4;
    await sequelize.sync(); // Sincroniza el modelo con la base de datos

    const participants = [];

    // D-3
    const participant1 = await Participant.create({
      firstNames: "Sergio",
      lastNames: "Olgin",
      age: 27,
      weight: 67,
      grade: "Negro",
      gender: "Masculino",
      clubCode: "D-3",
    });
    participants.push(participant1);

    const participant2 = await Participant.create({
      firstNames: "Luciana",
      lastNames: "Kraun",
      age: 13,
      weight: 42,
      grade: "Rojo",
      gender: "Femenino",
      clubCode: "D-3",
    });
    participants.push(participant2);

    const participant3 = await Participant.create({
      firstNames: "Justiniano",
      lastNames: "Castro",
      age: 16,
      weight: 52,
      grade: "Franja Amarilla",
      gender: "Masculino",
      clubCode: "D-3",
    });
    participants.push(participant3);

    // REL
    const participant4 = await Participant.create({
      firstNames: "Claudio",
      lastNames: "Rojas",
      age: 21,
      weight: 65,
      grade: "Negro",
      gender: "Masculino",
      clubCode: "REL",
    });
    participants.push(participant4);

    const participant5 = await Participant.create({
      firstNames: "Alejandra",
      lastNames: "Argote",
      age: 13,
      weight: 44,
      grade: "Rojo",
      gender: "Femenino",
      clubCode: "REL",
    });
    participants.push(participant5);

    const participant6 = await Participant.create({
      firstNames: "Marco",
      lastNames: "Rojas",
      age: 16,
      weight: 47,
      grade: "Franja Amarilla",
      gender: "Masculino",
      clubCode: "REL",
    });
    participants.push(participant6);

    const participant7 = await Participant.create({
      firstNames: "Ricardo",
      lastNames: "Morales",
      age: 16,
      weight: 53,
      grade: "Verde",
      gender: "Masculino",
      clubCode: "REL",
    });
    participants.push(participant7);

    // Mapeamos los participantes creados para insertarlos en la tabla ChampionshipParticipant
    const championshipParticipants = participants.map((participant) => ({
      participantId: participant.id,
      championshipId: championshipId,
      verified: false,
    }));

    // Insertar los registros de ChampionshipParticipant en la base de datos
    await ChampionshipParticipant.bulkCreate(championshipParticipants);

    console.log(
      `${participants.length} participantes creados e insertados en ChampionshipParticipant correctamente.`
    );
  } catch (error) {
    console.error("Error al crear o insertar participantes:", error);
  } finally {
    await sequelize.close(); // Cierra la conexión a la base de datos al finalizar
  }
})();
