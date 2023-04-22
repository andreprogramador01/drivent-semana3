import { Router } from 'express';
import { getRooms } from '@/controllers/rooms-controller';
import { authenticateToken } from '@/middlewares';

const roomsRouter = Router();

roomsRouter.all('/*', authenticateToken).get('/:hotelId', getRooms);

export { roomsRouter };
