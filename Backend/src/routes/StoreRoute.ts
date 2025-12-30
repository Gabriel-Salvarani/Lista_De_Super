import { Router } from 'express';
import { createStore, getStores } from '../controllers/StoreController';

const router = Router();

router.post('/', createStore);
router.get('/', getStores);

export default router;