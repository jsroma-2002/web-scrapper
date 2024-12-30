import { searchOffshoreLeaks } from "../services/offshore-leaks-service.js";
// Similarmente se importan servicios para World Bank y OFAC cuando estén listos

export const searchEntities = async (req, res) => {
  const { entity } = req.query;

  if (!entity) {
    return res
      .status(400)
      .json({ error: 'El parámetro "entity" es obligatorio.' });
  }

  try {
    const offshoreLeaks = await searchOffshoreLeaks(entity);

    res.json({
      query: entity,
      sources: {
        offshoreLeaks,
        // Agregar worldBank y ofac cuando estén implementados
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al realizar la búsqueda.",
      details: error.message,
    });
  }
};
