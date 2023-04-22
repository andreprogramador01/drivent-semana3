import { notFoundError, paymentRequired } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotels(userId: number) {
  const enrollment = await hotelsRepository.getEnrollmentByUserId(userId);
  if (!enrollment) {
    console.log('caiu aqui no enrol');
    throw notFoundError();
  }
  const ticket = await hotelsRepository.getTicketByEnrollmentId(enrollment.id as number);
  if (!ticket) {
    console.log('caiu aqui no ticket');
    throw notFoundError();
  }
  const hotels = await hotelsRepository.getHotels();

  if (hotels.length === 0) {
    console.log('caiu aqui no hotel');
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
