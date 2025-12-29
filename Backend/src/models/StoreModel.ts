import { Schema, model, Document } from 'mongoose';
import { IStore } from '../interfaces/StoreInterface.js';

// Extendemos Document para que Mongoose reconozca los métodos de documento
export interface IStoreDocument extends IStore, Document {}

const storeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number },
      purchased: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true }); // Esto añade createdAt y updatedAt automáticamente

export default model<IStoreDocument>('Store', storeSchema);