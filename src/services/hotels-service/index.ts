import { notFoundError, paymentRequired } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotels(userId: number) {
  const enrollment = await hotelsRepository.getEnrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await hotelsRepository.getTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  //const ticketType = await hotelsRepository.getTicketType(ticket.ticketTypeId);

  if (ticket.status !== 'PAID' || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
    throw paymentRequired();
  }
  const hotels = await hotelsRepository.getHotels();
  if (hotels.length === 0) {
    throw notFoundError();
  }

  return hotels;
}
const hotelsService = { getHotels };

export default hotelsService;
