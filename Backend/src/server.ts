import express from 'express';
import dotenv from 'dotenv'; // 1. Importas
import { connectDB } from './config/mongodb.js'; // Asegúrate de usar .js

dotenv.config(); // 2. Ejecutas la configuración

const app = express();

// Ahora puedes usar process.env sin problemas
const PORT = process.env.PORT!;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});