import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "../models/participant";
import ChampionshipParticipant from "../models/championshipParticipant";

(async () => {
  try {
    const championshipId: number = 1;

    await sequelize.sync(); // Sincroniza el modelo con la base de datos, eliminando las tablas existentes si existen

    const clubs = ["LIN", "ANT", "D-3", "REL"];
    const grades = ["Franja Verde", "Franja Rojo", "Amarillo"];
    const genders = ["Masculino", "Femenino"];

    const participants = [];

    // Crear 50 participantes y guardarlos en la base de datos
    for (let i = 0; i < 50; i++) {
      const clubCode = clubs[Math.floor(Math.random() * clubs.length)];
      const age = Math.floor(Math.random() * (50 - 6 + 1)) + 6;
      const weight = Math.floor(Math.random() * 100) + 1; // Peso aleatorio entre 1 y 100
      const grade = grades[i % grades.length]; // Intercalar entre Franja Verde, Franja Rojo y Amarillo
      const gender = genders[i % 2]; // Mitad Masculino, Mitad Femenino
      const firstName = getRandomName();
      const lastName = getRandomName();

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

// Función para generar nombres aleatorios
function getRandomName() {
  const names = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "William",
    "Olivia",
    "James",
    "Sophia",
    "Benjamin",
    "Isabella",
  ];
  return names[Math.floor(Math.random() * names.length)];
}
