import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import indexRouter from "./src/interfaces/router/index.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api", indexRouter);

app.use("/", (req, res) => {
  res.send("API Geo Asistencia Docentes FISI UNAP");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
