import mongoose from 'mongoose';
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
export const addItemProduct = async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const store = await Store.findById(id);
    if(!store) return res.status(404).json({ message: 'Tienda no encontrada'});

    store.items.push({ name, quantity, price, purchased: false });
    await store.save();
    res.status(201).json(store);
  } catch(error){
    res.status(500).json({ error:'Error al añadir el producto'});
  }
};

export const toggleItemStatus = async (req: Request, res: Response) => {
  try {
    const { storeId, itemId } = req.params;

    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: 'Tienda no encontrada' });

    // Buscamos el item dentro del array de la tienda
    const item = store.items.find(item => (item as any)._id.toString() === itemId);
    if (!item) return res.status(404).json({ message: 'Producto no encontrado' });

    // Cambiamos el estado al opuesto
    item.purchased = !item.purchased;
    await store.save();

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado' });
  }
};

// Borrar una tienda completa
export const deleteStore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) return res.status(404).json({ message: 'Tienda no encontrada' });

    res.status(200).json({ message: 'Tienda eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tienda' });
  }
};

// Borrar un producto de una tienda
export const deleteItemFromStore = async (req: Request, res: Response) => {
  try {
    const { storeId, itemId } = req.params;

    // 1. Buscamos la tienda
    const store = await Store.findById(storeId);
    
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    // 2. Filtramos el array de items para quitar el que coincide con el ID
    // Usamos .filter para crear un nuevo array sin ese elemento
    const initialLength = store.items.length;
    
    // Mongoose crea los IDs de los items como objetos, por eso usamos .toString()
    store.items = store.items.filter(item => (item as any)._id.toString() !== itemId) as any;

    // 3. Verificamos si realmente se borró algo
    if (store.items.length === initialLength) {
      return res.status(404).json({ message: 'El producto no existe en esta tienda' });
    }

    // 4. Guardamos los cambios
    await store.save();

    res.status(200).json({ message: 'Producto eliminado', store });
  } catch (error) {
    console.error(error); // Esto te ayudará a ver el error real en la terminal
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

// Actualizar datos de la tienda (Nombre o Ubicación)
export const updateStore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // { new: true } hace que devuelva el objeto ya editado
    const updatedStore = await Store.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedStore) return res.status(404).json({ message: 'Tienda no encontrada' });
    
    res.status(200).json(updatedStore);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tienda' });
  }
};

// Actualizar un producto específico (Nombre o Cantidad)
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { storeId, itemId } = req.params;
    const { name, quantity, price } = req.body;

    const store = await Store.findOneAndUpdate(
      { _id: storeId, "items._id": itemId }, // Busca la tienda Y el item
      { 
        $set: { 
          "items.$.name": name, 
          "items.$.quantity": quantity,
          "items.$.price": price
        } 
      },
      { new: true }
    );

    if (!store) return res.status(404).json({ message: 'Tienda o producto no encontrado' });

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};