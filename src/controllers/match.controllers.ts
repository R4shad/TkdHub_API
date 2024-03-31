import { Request, Response } from "express";
import Match from "../models/match";
import Competitor from "../models/competitor";
import participant from "../models/participant";
import ChampionshipDivision from "../models/championshipDivision";
import Bracket from "../models/bracket";
import ChampionshipCategory from "../models/championshipCategory";
import ChampionshipAgeInterval from "../models/championshipAgeInterval";

// Controlador para obtener partidos por ID de campeonato
export const getMatchesByChampionshipId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId } = req.params;

    // Buscar partidos por el ID del campeonato
    const matches = await Match.findAll({
      where: { championshipId },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir createdAt y updatedAt
      include: [
        {
          model: Competitor,
          as: "redCompetitor",
          include: [participant], // Incluir detalles del participante
        },
        {
          model: Competitor,
          as: "blueCompetitor",
          include: [participant], // Incluir detalles del participante
        },
      ],
    });

    // Enviar respuesta con los partidos encontrados
    res.status(200).json({ status: 200, data: matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const getMatchesByChampionshipIdAndBracketId = async (
  req: Request,
  res: Response
) => {
  try {
    const { championshipId, bracketId } = req.params;

    // Buscar partidos por el ID del campeonato y el ID del bracket
    const matches = await Match.findAll({
      where: { championshipId, bracketId },
      include: [
        {
          model: Competitor,
          as: "redCompetitor",
          include: [participant], // Incluir detalles del participante
        },
        {
          model: Competitor,
          as: "blueCompetitor",
          include: [participant], // Incluir detalles del participante
        },
      ],
    });

    // Enviar respuesta con los partidos encontrados
    res.status(200).json({ status: 200, data: matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const getMatchIdByBracketIdAndRound = async (
  req: Request,
  res: Response
) => {
  try {
    const { bracketId, round } = req.params;

    // Buscar el partido por el ID del bracket y la ronda
    const match = await Match.findOne({
      where: { bracketId, round },
      attributes: ["matchId"], // Solo obtener el matchId
    });

    // Si no se encuentra el partido, enviar una respuesta 404
    if (!match) {
      return res.status(404).json({
        status: 404,
        error:
          "No se encontraron partidos para el bracket y la ronda especificados.",
      });
    }

    // Enviar respuesta con el matchId encontrado
    res.status(200).json({ status: 200, data: match.matchId });
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

// Controlador para crear un nuevo partido
export const createMatch = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params; // Obtener championshipId de los parámetros de ruta
    const { bracketId, redCompetitorId, blueCompetitorId, round } = req.body;

    // Crear un nuevo partido con championshipId
    const newMatch = await Match.create({
      championshipId, // Agregar championshipId al crear el partido
      bracketId,
      redCompetitorId,
      blueCompetitorId,
      round,
      redRounds: 0, // Valor predeterminado para redRounds
      blueRounds: 0, // Valor predeterminado para blueRounds
    });

    // Enviar respuesta con el partido creado
    res.status(201).json({ status: 201, data: newMatch });
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params; // Obtener matchId de los parámetros de ruta
    const {
      bracketId,
      redCompetitorId,
      blueCompetitorId,
      round,
      redRounds,
      blueRounds,
      championshipId,
    } = req.body;

    // Buscar el partido por matchId
    const match = await Match.findByPk(matchId);

    if (!match) {
      return res.status(404).json({
        status: 404,
        error: "Match not found",
      });
    }

    // Actualizar los valores del partido si se proporcionan en el cuerpo de la solicitud
    if (bracketId !== undefined) {
      match.bracketId = bracketId;
    }
    if (round !== undefined) {
      match.round = round;
    }
    if (redRounds !== undefined) {
      match.redRounds = redRounds;
    }
    if (blueRounds !== undefined) {
      match.blueRounds = blueRounds;
    }
    if (championshipId !== undefined) {
      match.championshipId = championshipId;
    }

    // Intercambiar los IDs de los competidores rojo y azul
    if (redCompetitorId !== undefined && blueCompetitorId !== undefined) {
      match.redCompetitorId = redCompetitorId;
      match.blueCompetitorId = blueCompetitorId;
    } else {
      if (redCompetitorId !== undefined) {
        match.redCompetitorId = redCompetitorId;
      } else {
        if (blueCompetitorId !== undefined) {
          match.blueCompetitorId = blueCompetitorId;
        }
      }
    }

    // Guardar los cambios
    await match.save();

    // Enviar respuesta con el partido actualizado
    res.status(200).json({ status: 200, data: match });
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const updateMatchRounds = async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params; // Obtener matchId de los parámetros de ruta
    const { redRounds, blueRounds } = req.body;

    // Buscar el partido por matchId
    const match = await Match.findByPk(matchId);

    if (!match) {
      return res.status(404).json({
        status: 404,
        error: "Match not found",
      });
    }

    // Actualizar los valores de las rondas si se proporcionan en el cuerpo de la solicitud
    if (redRounds !== undefined) {
      match.redRounds = redRounds;
    }
    if (blueRounds !== undefined) {
      match.blueRounds = blueRounds;
    }

    // Guardar los cambios
    await match.save();

    // Enviar respuesta con el partido actualizado
    res.status(200).json({ status: 200, data: match });
  } catch (error) {
    console.error("Error updating match rounds:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

export const enumarateMatches = async (req: Request, res: Response) => {
  try {
    const { championshipId } = req.params;

    const brackets = await Bracket.findAll({
      where: { championshipId },
    });

    for (const bracket of brackets) {
      const division = await ChampionshipDivision.findByPk(bracket.divisionId, {
        include: [ChampionshipAgeInterval],
      });

      const category = await ChampionshipCategory.findByPk(bracket.categoryId);
      bracket.dataValues.division = division?.toJSON();
      bracket.dataValues.category = category?.toJSON();
    }

    // Ordenar brackets según los criterios especificados
    brackets.sort((a, b) => {
      const aDivision = a.dataValues.division;
      const bDivision = b.dataValues.division;
      const aCategory = a.dataValues.category;
      const bCategory = b.dataValues.category;

      // Ordenar por gradeMin de la categoría
      const aNumericValue = obtenerValorNumerico(aCategory?.gradeMin);
      const bNumericValue = obtenerValorNumerico(bCategory?.gradeMin);

      if (aNumericValue !== bNumericValue) {
        return (aNumericValue || 0) - (bNumericValue || 0);
      }

      const aAgeInterval = aDivision ? aDivision.ChampionshipAgeInterval : null;
      const bAgeInterval = bDivision ? bDivision.ChampionshipAgeInterval : null;

      // Ordenar por minAge de ChampionshipAgeInterval
      if (aAgeInterval?.minAge !== bAgeInterval?.minAge) {
        return (aAgeInterval?.minAge || 0) - (bAgeInterval?.minAge || 0);
      }

      // Ordenar por minWeight de la división
      if (aDivision?.minWeight !== bDivision?.minWeight) {
        return (aDivision?.minWeight || 0) - (bDivision?.minWeight || 0);
      }

      // Ordenar por gender de la división
      if (
        aDivision?.gender === "Masculino" &&
        bDivision?.gender !== "Masculino"
      ) {
        return 1;
      } else if (
        aDivision?.gender != "Masculino" &&
        bDivision?.gender === "Masculino"
      ) {
        return -1;
      }

      // Si todos los criterios son iguales, mantener el orden original
      return 0;
    });
    console.log(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
    console.log(brackets);
    var eightsMatches = [];
    var quartersMatches = [];
    var semifinalsMatches = [];
    var finalsMatches = [];

    for (const bracket of brackets) {
      const matches = await Match.findAll({
        where: { bracketId: bracket.bracketId },
      });

      if (matches.length > 0) {
        const finalMatch = matches.find((m) => m.round === "final");
        finalsMatches.push(finalMatch);
      }
      //Semifinales
      if (matches.length > 2) {
        const semi1Match = matches.find((m) => m.round === "semifinal1");
        if (semi1Match) {
          semifinalsMatches.push(semi1Match);
        }

        const semi2Match = matches.find((m) => m.round === "semifinal2");
        if (semi2Match) {
          semifinalsMatches.push(semi2Match);
        }
      }
      //Cuartos
      if (matches.length > 4) {
        const q1Match = matches.find((m) => m.round === "quarters1");
        if (q1Match) {
          quartersMatches.push(q1Match);
        }
        const q2Match = matches.find((m) => m.round === "quarters2");
        if (q2Match) {
          quartersMatches.push(q2Match);
        }
        const q3Match = matches.find((m) => m.round === "quarters3");
        if (q3Match) {
          quartersMatches.push(q3Match);
        }
        const q4Match = matches.find((m) => m.round === "quarters4");
        if (q4Match) {
          quartersMatches.push(q4Match);
        }
      }
      //Octavos
      if (matches.length > 8) {
        const eights1Match = matches.find((m) => m.round === "eights1");
        if (eights1Match) {
          eightsMatches.push(eights1Match);
        }
        const eights2Match = matches.find((m) => m.round === "eights2");
        if (eights2Match) {
          eightsMatches.push(eights2Match);
        }
        const eights3Match = matches.find((m) => m.round === "eights3");
        if (eights3Match) {
          eightsMatches.push(eights3Match);
        }
        const eights4Match = matches.find((m) => m.round === "eights4");
        if (eights4Match) {
          eightsMatches.push(eights4Match);
        }
        const eights5Match = matches.find((m) => m.round === "eights5");
        if (eights5Match) {
          eightsMatches.push(eights5Match);
        }
        const eights6Match = matches.find((m) => m.round === "eights6");
        if (eights6Match) {
          eightsMatches.push(eights6Match);
        }
        const eights7atch = matches.find((m) => m.round === "eights7");
        if (eights7atch) {
          eightsMatches.push(eights7atch);
        }
        const eights8Match = matches.find((m) => m.round === "eights8");
        if (eights8Match) {
          eightsMatches.push(eights8Match);
        }
      }
    }

    eightsMatches = eightsMatches.filter(
      (m) =>
        m.blueCompetitorId != m.redCompetitorId ||
        (m.redCompetitorId === null && m.blueCompetitorId === null)
    );
    quartersMatches = quartersMatches.filter(
      (m) =>
        m.blueCompetitorId != m.redCompetitorId ||
        (m.redCompetitorId === null && m.blueCompetitorId === null)
    );
    semifinalsMatches = semifinalsMatches.filter(
      (m) =>
        m.blueCompetitorId != m.redCompetitorId ||
        (m.redCompetitorId === null && m.blueCompetitorId === null)
    );
    finalsMatches = finalsMatches.filter(
      (m) =>
        m?.blueCompetitorId != m?.redCompetitorId ||
        (m?.redCompetitorId === null && m?.blueCompetitorId === null)
    );

    const totalMatches =
      quartersMatches.length +
      eightsMatches.length +
      semifinalsMatches.length +
      finalsMatches.length;

    var conteo = 1;

    for (const match of eightsMatches) {
      match.matchNumber = conteo;
      conteo = conteo + 1;
      await match.save();
    }

    for (const match of quartersMatches) {
      match.matchNumber = conteo;
      conteo = conteo + 1;
      await match.save();
    }

    for (const match of semifinalsMatches) {
      match.matchNumber = conteo;
      conteo = conteo + 1;
      await match.save();
    }

    for (const match of finalsMatches) {
      if (match) {
        match.matchNumber = conteo;
        conteo = conteo + 1;
        await match.save();
      }
    }
    /*
    if (!match) {
      return res.status(404).json({
        status: 404,
        error: "Match not found",
      });
    }

    // Actualizar los valores de las rondas si se proporcionan en el cuerpo de la solicitud
    if (redRounds !== undefined) {
      match.redRounds = redRounds;
    }
    if (blueRounds !== undefined) {
      match.blueRounds = blueRounds;
    }

    // Guardar los cambios
    await match.save();
*/
    // Enviar respuesta con el partido actualizado
    res.status(200).json({ status: 200, data: 0 });
  } catch (error) {
    console.error("Error updating match rounds:", error);
    res.status(500).json({
      status: 500,
      error: "There was an error processing the request.",
    });
  }
};

function obtenerValorNumerico(grado: string): number {
  if (grado) {
    switch (grado.toLowerCase()) {
      case "franja amarillo":
        return 1;
      case "amarillo":
        return 2;
      case "franja verde":
        return 3;
      case "verde":
        return 4;
      case "franja azul":
        return 5;
      case "azul":
        return 6;
      case "franja rojo":
        return 7;
      case "rojo":
        return 8;
      case "franja negro":
        return 9;
      case "negro":
        return 10;
      default:
        return 0;
    }
  }
  return 0;
}
