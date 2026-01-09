import { Router } from 'express';
import { 
  createStore, 
  getStores, 
  addItemProduct,
  deleteStore, 
  deleteItemFromStore,
  updateStore, 
  updateItem, 
  toggleItemStatus 
} from '../controllers/StoreController';

const router = Router();

router.get('/', getStores);
router.post('/', createStore);

// Ruta para añadir un item (Usamos el ID de la tienda)
router.patch('/:id/items', addItemProduct);

// Borrar tienda
router.delete('/:id', deleteStore);

// Borrar un producto específico de una tienda
router.delete('/:storeId/items/:itemId', deleteItemFromStore);

// Ruta para editar la tienda
router.put('/:id', updateStore);

// Ruta para editar un producto específico
router.put('/:storeId/items/:itemId', updateItem);

// Ruta para tachar/destachar un item (Usamos ID de tienda e ID de item)
router.patch('/:storeId/items/:itemId', toggleItemStatus);

export default router;