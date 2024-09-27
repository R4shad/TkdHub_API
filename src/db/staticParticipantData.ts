import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import ChampionshipParticipant from "../models/championshipParticipant";
import Participant from "../models/participant";

(async () => {
  try {
    const championshipId: number = 3;
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
      const weight = 50;
      const grade = "amarillo";
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
      const weight = 60;
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

    for (let i = 0; i < 14; i++) {
      const clubCode = "LIN";
      const age = 18;
      const weight = 70;
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

    for (let i = 0; i < 13; i++) {
      const clubCode = "D-3";
      const age = 20;
      const weight = 85;
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

    for (let i = 0; i < 12; i++) {
      const clubCode = "LIN";
      const age = 19;
      const weight = 50;
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
      const age = 20;
      const weight = 55;
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

    for (let i = 0; i < 10; i++) {
      const clubCode = "LIN";
      const age = 22;
      const weight = 60;
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

    for (let i = 0; i < 9; i++) {
      const clubCode = "D-3";
      const age = 20;
      const weight = 65;
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

    for (let i = 0; i < 8; i++) {
      const clubCode = "LIN";
      const age = 25;
      const weight = 75;
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

    for (let i = 0; i < 7; i++) {
      const clubCode = "D-3";
      const age = 20;
      const weight = 44;
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

    for (let i = 0; i < 6; i++) {
      const clubCode = "LIN";
      const age = 20;
      const weight = 52;
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

    for (let i = 0; i < 5; i++) {
      const clubCode = "D-3";
      const age = 20;
      const weight = 60;
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
      const weight = 70;
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

    for (let i = 0; i < 3; i++) {
      const clubCode = "D-3";
      const age = 27;
      const weight = 57;
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

    for (let i = 0; i < 2; i++) {
      const clubCode = "LIN";
      const age = 30;
      const weight = 67;
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

    for (let i = 0; i < 1; i++) {
      const clubCode = "D-3";
      const age = 16;
      const weight = 85;
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
