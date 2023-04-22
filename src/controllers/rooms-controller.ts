import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import roomRepository from '@/repositories/room-repository';
import roomsService from '@/services/rooms-service';

export async function getRooms(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId as number;
  const hotelId = +req.params.hotelId;

  try {
    const rooms = await roomsService.getRooms(userId, hotelId);
    res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    next(error);
  }
}
