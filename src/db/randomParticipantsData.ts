import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import ChampionshipParticipant from "../models/championshipParticipant";
import Participant from "../models/participant";

(async () => {
  try {
    const championshipId: number = 1;
    await sequelize.sync(); // Sincroniza el modelo con la base de datos

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
      "Ricardo",
      "Teresa",
      "Pablo",
      "Andrea",
      "Alberto",
      "Daniel",
      "Patricia",
      "Fernando",
      "Raúl",
      "Gabriela",
      "Mario",
      "Sandra",
      "Jorge",
      "Paola",
      "David",
      "Esteban",
      "Monica",
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
      "Ortega",
      "Vargas",
      "Suárez",
      "Morales",
      "Reyes",
      "Aguilar",
      "Cruz",
      "Navarro",
      "Delgado",
    ];

    const grades = [
      "amarillo",
      "franja amarillo",
      "verde",
      "franja verde",
      "azul",
      "franja azul",
      "rojo",
      "franja rojo",
      "franja negro",
    ];

    const clubs = ["LIN", "D-3", "REL", "AST"];

    const getRandomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < 100; i++) {
      const clubCode = clubs[getRandomInt(0, clubs.length - 1)];
      const age = getRandomInt(6, 25);
      const weight = getRandomInt(age * 2, age * 3); // Peso basado en la edad
      const grade = grades[getRandomInt(0, grades.length - 1)];
      const gender = i < 50 ? "Masculino" : "Femenino";
      const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
      const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];

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

    // Mapeamos los participantes creados para insertarlos en la tabla ChampionshipParticipant
    const championshipParticipants = participants.map((participant) => ({
      participantId: participant.id,
      championshipId: championshipId, // ID de campeonato que estableciste
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
