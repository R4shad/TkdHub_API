import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "../models/participant";
import ChampionshipParticipant from "../models/championshipParticipant";

(async () => {
  try {
    const championshipId: number = 1;
    await sequelize.sync(); // Sincroniza el modelo con la base de datos, eliminando las tablas existentes si existen
    const participants = [];
    const firstNames = [
      "Juan",
      "Pedro",
      "María",
      "Luis",
      "Ana",
      "Carlos",
      "Laura",
      "Diego",
      "Sofía",
      "Javier",
      "Manuel",
      "Carmen",
      "José",
      "Elena",
      "Antonio",
      "Isabel",
      "Miguel",
      "Natalia",
      "Francisco",
      "Lucía",
    ];
    const lastNames = [
      "García",
      "Martínez",
      "López",
      "González",
      "Rodríguez",
      "Fernández",
      "Pérez",
      "Sánchez",
      "Ramírez",
      "Torres",
      "Álvarez",
      "Romero",
      "Serrano",
      "Muñoz",
      "Blanco",
      "Gómez",
      "Herrera",
      "Díaz",
      "Ruiz",
      "Castro",
    ];
    for (let i = 0; i < 16; i++) {
      const clubCode = "LIN";
      const age = 18;
      const weight = 65;
      const grade = "franja amarillo";
      const gender = "Masculino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 15; i++) {
      const clubCode = "D-3";
      const age = 18;
      const weight = 65;
      const grade = "franja azul";
      const gender = "Masculino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 14; i++) {
      const clubCode = "LIN";
      const age = 18;
      const weight = 49;
      const grade = "franja amarillo";
      const gender = "Femenino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 13; i++) {
      const clubCode = "D-3";
      const age = 18;
      const weight = 49;
      const grade = "franja rojo";
      const gender = "Femenino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 12; i++) {
      const clubCode = "LIN";
      const age = 7;
      const weight = 34;
      const grade = "franja amarillo";
      const gender = "Femenino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 11; i++) {
      const clubCode = "D-3";
      const age = 7;
      const weight = 43;
      const grade = "franja amarillo";
      const gender = "Masculino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 10; i++) {
      const clubCode = "LIN";
      const age = 10;
      const weight = 58;
      const grade = "franja verde";
      const gender = "Masculino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 9; i++) {
      const clubCode = "D-3";
      const age = 10;
      const weight = 58;
      const grade = "franja verde";
      const gender = "Femenino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 8; i++) {
      const clubCode = "LIN";
      const age = 20;
      const weight = 48;
      const grade = "franja negro";
      const gender = "Femenino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 7; i++) {
      const clubCode = "D-3";
      const age = 20;
      const weight = 48;
      const grade = "franja negro";
      const gender = "Masculino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 6; i++) {
      const clubCode = "LIN";
      const age = 20;
      const weight = 90;
      const grade = "franja negro";
      const gender = "Masculino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 5; i++) {
      const clubCode = "D-3";
      const age = 20;
      const weight = 80;
      const grade = "franja negro";
      const gender = "Femenino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 4; i++) {
      const clubCode = "LIN";
      const age = 16;
      const weight = 67;
      const grade = "franja amarillo";
      const gender = "Femenino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 3; i++) {
      const clubCode = "D-3";
      const age = 16;
      const weight = 67;
      const grade = "franja amarillo";
      const gender = "Masculino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 2; i++) {
      const clubCode = "LIN";
      const age = 16;
      const weight = 67;
      const grade = "franja rojo";
      const gender = "Masculino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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

    for (let i = 0; i < 1; i++) {
      const clubCode = "D-3";
      const age = 16;
      const weight = 67;
      const grade = "franja rojo";
      const gender = "Femenino";
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
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
