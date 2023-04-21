import { Router } from 'express';
import { getHotels } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const hotelsRouter = Router();

hotelsRouter.get('/hotels', authenticateToken, getHotels);

export { hotelsRouter };
