import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // MONGO_URI debe estar definido en tu archivo .env
    const url = process.env.URIDB!;
    
    if (!url) {
      throw new Error("La variable MONGO_URI no está definida en el .env");
    }

    await mongoose.connect(url);
    console.log('Base de datos conectada correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};