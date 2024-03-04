import { sequelize } from "../config/db";
import Championship from "../models/championship";
import defaultAgeInterval from "../models/defaultAgeInterval";
import DefaultCategory from "../models/defaultCategory";

//Campeonato
(async () => {
  try {
    await sequelize.sync();
    await Championship.bulkCreate([
      {
        championshipName: "Campeonato 01",
        organizer: "R4shad",
        organizerCi: 7920880,
        organizerPassword: "R4shad",
        championshipDate: "04/04/2024",
      },
    ]);

    console.log("Datos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await sequelize.close(); // Cierra la conexión a la base de datos al finalizar
  }
})();
//Age interval
(async () => {
  try {
    await sequelize.sync(); // Sincroniza el modelo con la base de datos, eliminando las tablas existentes si existen
    await defaultAgeInterval.bulkCreate([
      {
        id: 1,
        ageIntervalName: "Pre infantil A",
        minAge: 4,
        maxAge: 5,
      },
      {
        id: 2,
        ageIntervalName: "Pre infantil B",
        minAge: 6,
        maxAge: 7,
      },
      {
        id: 3,
        ageIntervalName: "Pre infantil C",
        minAge: 8,
        maxAge: 9,
      },
      {
        id: 4,
        ageIntervalName: "Infanil",
        minAge: 10,
        maxAge: 11,
      },
      {
        id: 5,
        ageIntervalName: "Cadetes",
        minAge: 12,
        maxAge: 14,
      },
      {
        id: 6,
        ageIntervalName: "Juvenil",
        minAge: 15,
        maxAge: 17,
      },
      {
        id: 7,
        ageIntervalName: "Mayores",
        minAge: 18,
        maxAge: 100,
      },
    ]);
    console.log("Datos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await sequelize.close(); // Cierra la conexión a la base de datos al finalizar
  }
})();
//Categorias
(async () => {
  try {
    await sequelize.sync(); // Sincroniza el modelo con la base de datos, eliminando las tablas existentes si existen
    await DefaultCategory.bulkCreate([
      {
        categoryName: "Avanzado",
        gradeMin: "rojo",
        gradeMax: "negro",
      },
      {
        categoryName: "Inicial",
        gradeMin: "franja amarillo",
        gradeMax: "franja verde",
      },
      {
        categoryName: "Intermedio",
        gradeMin: "verde",
        gradeMax: "franja rojo",
      },
    ]); // Omitir timestamps

    console.log("Datos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await sequelize.close(); // Cierra la conexión a la base de datos al finalizar
  }
})();
