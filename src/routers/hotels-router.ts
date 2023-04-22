import { Router } from 'express';
import { getHotels } from '@/controllers';
import { getRooms } from '@/controllers/rooms-controller';
import { authenticateToken } from '@/middlewares';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotels).get('/:hotelId', getRooms);

export { hotelsRouter };
