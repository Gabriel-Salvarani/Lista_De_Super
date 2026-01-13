import { Schema, model, Document } from 'mongoose';
import { IStore } from '../interfaces/StoreInterface.js';

// Extendemos Document para que Mongoose reconozca los métodos de documento
export interface IStoreDocument extends IStore, Document {}

// 1. Definimos el esquema del Item por separado para que sea más limpio
const itemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 }, // <-- Ahora sí está aquí
  purchased: { type: Boolean, default: false }
}, { _id: true }); // Mantenemos el _id para poder borrar/editar items específicos

// 2. Definimos el esquema de la Tienda usando el itemSchema de arriba
const storeSchema = new Schema<IStoreDocument>({
  name: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  items: [itemSchema] // <-- Usamos la definición de arriba
}, {
  versionKey: false,
  timestamps: true // Esto añade createdAt y updatedAt automáticamente
});

export default model<IStoreDocument>('Store', storeSchema);