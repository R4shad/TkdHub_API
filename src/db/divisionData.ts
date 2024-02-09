import Division from "../models/division";
import { sequelize } from "../config/db";

// Inserta los datos en la base de datos
(async () => {
  try {
    await sequelize.sync(); // Sincroniza el modelo con la base de datos, eliminando las tablas existentes si existen
    await Division.bulkCreate([
      // Datos para PreInfantil A
      {
        divisionName: "PreInfantil A Atomo",
        ageIntervalId: 4,
        minWeight: 0,
        maxWeight: 19,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Molécula",
        ageIntervalId: 4,
        minWeight: 19,
        maxWeight: 21,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Micra",
        ageIntervalId: 4,
        minWeight: 21,
        maxWeight: 23,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Escama",
        ageIntervalId: 4,
        minWeight: 23,
        maxWeight: 25,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Paja",
        ageIntervalId: 4,
        minWeight: 25,
        maxWeight: 27,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Pluma",
        ageIntervalId: 4,
        minWeight: 27,
        maxWeight: 30,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Mosco",
        ageIntervalId: 4,
        minWeight: 30,
        maxWeight: 33,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Mosca",
        ageIntervalId: 4,
        minWeight: 33,
        maxWeight: 36,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Libélula",
        ageIntervalId: 4,
        minWeight: 36,
        maxWeight: 39,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },
      {
        divisionName: "PreInfantil A Avispa",
        ageIntervalId: 4,
        minWeight: 39,
        maxWeight: 100,
        gender: "Ambos",
        grouping: "PreInfantil A",
      },

      // Datos para PreInfantil B
      {
        divisionName: "PreInfantil B Atomo",
        ageIntervalId: 5,
        minWeight: 0,
        maxWeight: 23,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Molécula",
        ageIntervalId: 5,
        minWeight: 23,
        maxWeight: 25,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Micra",
        ageIntervalId: 5,
        minWeight: 25,
        maxWeight: 27,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Escama",
        ageIntervalId: 5,
        minWeight: 27,
        maxWeight: 29,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Paja",
        ageIntervalId: 5,
        minWeight: 29,
        maxWeight: 31,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Pluma",
        ageIntervalId: 5,
        minWeight: 31,
        maxWeight: 34,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Mosco",
        ageIntervalId: 5,
        minWeight: 34,
        maxWeight: 37,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Mosca",
        ageIntervalId: 5,
        minWeight: 37,
        maxWeight: 40,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Libélula",
        ageIntervalId: 5,
        minWeight: 40,
        maxWeight: 43,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },
      {
        divisionName: "PreInfantil B Avispa",
        ageIntervalId: 5,
        minWeight: 43,
        maxWeight: 100,
        gender: "Ambos",
        grouping: "PreInfantil B",
      },

      // Datos para PreInfantil C
      {
        divisionName: "PreInfantil C Atomo",
        ageIntervalId: 6,
        minWeight: 0,
        maxWeight: 25,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Molécula",
        ageIntervalId: 6,
        minWeight: 25,
        maxWeight: 27,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Micra",
        ageIntervalId: 6,
        minWeight: 27,
        maxWeight: 29,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Escama",
        ageIntervalId: 6,
        minWeight: 29,
        maxWeight: 31,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Paja",
        ageIntervalId: 6,
        minWeight: 31,
        maxWeight: 33,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Pluma",
        ageIntervalId: 6,
        minWeight: 33,
        maxWeight: 36,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Mosco",
        ageIntervalId: 6,
        minWeight: 36,
        maxWeight: 39,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Mosca",
        ageIntervalId: 6,
        minWeight: 39,
        maxWeight: 42,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Libélula",
        ageIntervalId: 6,
        minWeight: 42,
        maxWeight: 45,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      {
        divisionName: "PreInfantil C Avispa",
        ageIntervalId: 6,
        minWeight: 45,
        maxWeight: 100,
        gender: "Ambos",
        grouping: "PreInfantil C",
      },
      // Datos para Infantil

      {
        divisionName: "Infantil Atomo",
        ageIntervalId: 7,
        minWeight: 0,
        maxWeight: 27,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Molécula",
        ageIntervalId: 7,
        minWeight: 27,
        maxWeight: 30,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Micra",
        ageIntervalId: 7,
        minWeight: 30,
        maxWeight: 33,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Escama",
        ageIntervalId: 7,
        minWeight: 33,
        maxWeight: 36,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Paja",
        ageIntervalId: 7,
        minWeight: 36,
        maxWeight: 39,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Pluma",
        ageIntervalId: 7,
        minWeight: 39,
        maxWeight: 42,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Mosco",
        ageIntervalId: 7,
        minWeight: 42,
        maxWeight: 45,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Mosca",
        ageIntervalId: 7,
        minWeight: 45,
        maxWeight: 48,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Libélula",
        ageIntervalId: 7,
        minWeight: 48,
        maxWeight: 51,
        gender: "Ambos",
        grouping: "Infantil",
      },
      {
        divisionName: "Infantil Avispa",
        ageIntervalId: 7,
        minWeight: 51,
        maxWeight: 100,
        gender: "Ambos",
        grouping: "Infantil",
      },
      //Cadetes

      {
        divisionName: "Cadetes M1",
        ageIntervalId: 8,
        minWeight: 0,
        maxWeight: 33,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M2",
        ageIntervalId: 8,
        minWeight: 33,
        maxWeight: 37,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M3",
        ageIntervalId: 8,
        minWeight: 37,
        maxWeight: 41,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M4",
        ageIntervalId: 8,
        minWeight: 41,
        maxWeight: 45,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M5",
        ageIntervalId: 8,
        minWeight: 45,
        maxWeight: 49,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M6",
        ageIntervalId: 8,
        minWeight: 49,
        maxWeight: 53,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M7",
        ageIntervalId: 8,
        minWeight: 53,
        maxWeight: 57,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M8",
        ageIntervalId: 8,
        minWeight: 57,
        maxWeight: 61,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M9",
        ageIntervalId: 8,
        minWeight: 61,
        maxWeight: 65,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes M10",
        ageIntervalId: 8,
        minWeight: 65,
        maxWeight: 100,
        gender: "Masculino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F1",
        ageIntervalId: 8,
        minWeight: 0,
        maxWeight: 29,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F2",
        ageIntervalId: 8,
        minWeight: 29,
        maxWeight: 33,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F3",
        ageIntervalId: 8,
        minWeight: 33,
        maxWeight: 37,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F4",
        ageIntervalId: 8,
        minWeight: 37,
        maxWeight: 41,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F5",
        ageIntervalId: 8,
        minWeight: 41,
        maxWeight: 44,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F6",
        ageIntervalId: 8,
        minWeight: 44,
        maxWeight: 47,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F7",
        ageIntervalId: 8,
        minWeight: 47,
        maxWeight: 51,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F8",
        ageIntervalId: 8,
        minWeight: 51,
        maxWeight: 55,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F9",
        ageIntervalId: 8,
        minWeight: 55,
        maxWeight: 59,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      {
        divisionName: "Cadetes F10",
        ageIntervalId: 8,
        minWeight: 49,
        maxWeight: 100,
        gender: "Femenino",
        grouping: "Cadetes",
      },
      //Juveniles

      {
        divisionName: "Juvenil M1",
        ageIntervalId: 9,
        minWeight: 0,
        maxWeight: 45,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M2",
        ageIntervalId: 9,
        minWeight: 45,
        maxWeight: 48,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M3",
        ageIntervalId: 9,
        minWeight: 48,
        maxWeight: 51,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M4",
        ageIntervalId: 9,
        minWeight: 51,
        maxWeight: 55,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M5",
        ageIntervalId: 9,
        minWeight: 55,
        maxWeight: 59,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M6",
        ageIntervalId: 9,
        minWeight: 59,
        maxWeight: 63,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M7",
        ageIntervalId: 9,
        minWeight: 63,
        maxWeight: 68,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M8",
        ageIntervalId: 9,
        minWeight: 68,
        maxWeight: 73,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M9",
        ageIntervalId: 9,
        minWeight: 73,
        maxWeight: 78,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil M10",
        ageIntervalId: 9,
        minWeight: 78,
        maxWeight: 100,
        gender: "Masculino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F1",
        ageIntervalId: 9,
        minWeight: 0,
        maxWeight: 42,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F2",
        ageIntervalId: 9,
        minWeight: 42,
        maxWeight: 44,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F3",
        ageIntervalId: 9,
        minWeight: 44,
        maxWeight: 46,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F4",
        ageIntervalId: 9,
        minWeight: 46,
        maxWeight: 49,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F5",
        ageIntervalId: 9,
        minWeight: 49,
        maxWeight: 52,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F6",
        ageIntervalId: 9,
        minWeight: 52,
        maxWeight: 55,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F7",
        ageIntervalId: 9,
        minWeight: 55,
        maxWeight: 59,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F8",
        ageIntervalId: 9,
        minWeight: 59,
        maxWeight: 63,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F9",
        ageIntervalId: 9,
        minWeight: 63,
        maxWeight: 68,
        gender: "Femenino",
        grouping: "Juveniles",
      },
      {
        divisionName: "Juvenil F10",
        ageIntervalId: 9,
        minWeight: 68,
        maxWeight: 100,
        gender: "Femenino",
        grouping: "Juveniles",
      },
    ]);
    console.log("Datos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await sequelize.close(); // Cierra la conexión a la base de datos al finalizar
  }
})();
