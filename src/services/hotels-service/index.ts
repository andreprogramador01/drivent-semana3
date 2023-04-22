import { notFoundError, paymentRequired } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotels(userId: number) {
  const enrollment = await hotelsRepository.getEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await hotelsRepository.getTicketByEnrollmentId(enrollment.id as number);
  if (!ticket) throw notFoundError();
  const hotels = await hotelsRepository.getHotels();

  if (!hotels) {
    throw notFoundError();
  }
  const ticketType = await hotelsRepository.getTicketType(ticket.ticketTypeId);

  if (ticket.status !== 'PAID' || ticketType.includesHotel === false || ticketType.isRemote === true) {
    throw paymentRequired();
  }

  return hotels;
}
const hotelsService = { getHotels };

export default hotelsService;
