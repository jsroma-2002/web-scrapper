const authMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res
      .status(401)
      .json({ error: "No autorizado. Proporcione una API key válida." });
  }
  next();
};

export default authMiddleware;
