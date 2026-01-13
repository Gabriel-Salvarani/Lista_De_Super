import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/mongodb';
// Importamos el router (fijate el .js)
import storeRoutes from './routes/StoreRoute'; 

dotenv.config();

const app = express();

// Middlewares necesarios para que Express entienda JSON
app.use(cors());
app.use(express.json());

// Conexión a la DB
connectDB();

app.use('/api/stores', storeRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});