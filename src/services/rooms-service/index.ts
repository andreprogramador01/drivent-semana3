import { notFoundError, paymentRequired } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';
import roomRepository from '@/repositories/room-repository';

async function getRooms(userId: number, hotelId: number) {
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
  const rooms = await roomRepository.getRoomsByHotelId(hotelId);
  if (rooms.length === 0) {
    throw notFoundError();
  }

  return rooms[0];
}
const roomsService = { getRooms };

export default roomsService;
