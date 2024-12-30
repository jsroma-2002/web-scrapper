import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import searchRoutes from "./routes/search-routes.js";

dotenv.config();

const ORIGIN = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();
app.use(helmet());
app.use(express.json());

// Configure Cors
app.use(
  cors({
    origin: ORIGIN,
    methods: "GET",
    allowedHeaders: "Content-Type, Authorization, X-API-Key",
  })
);

app.use("/api", searchRoutes);

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada." }));

export default app;
