import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;

  try {
    const hotels = await hotelsService.getHotels(userId);

    res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send({});
    }
    res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
