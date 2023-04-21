import { notFoundError } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotels(userId: number) {
  const enrollment = await hotelsRepository.getEnrollmentByUserId(userId);

  const ticket = await hotelsRepository.getTicketByEnrollmentId(enrollment.userId);

  const hotels = await hotelsRepository.getHotels();

  if (!enrollment || !ticket || !hotels) {
    throw notFoundError();
  }
  return hotels;
}
const hotelsService = { getHotels };

export default hotelsService;
