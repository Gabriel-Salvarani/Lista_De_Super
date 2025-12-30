import { Request, Response } from 'express';
import Store from '../models/StoreModel';

export const createStore = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body;
    const newStore = new Store({ name, location, items: [] });
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tienda', error });
  }
};

export const getStores = async (_req: Request, res: Response) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tiendas', error });
  }
};