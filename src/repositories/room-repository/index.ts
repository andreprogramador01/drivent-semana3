import { prisma } from '@/config';

async function getRoomsByHotelId(hotelId: number) {
  return await prisma.hotel.findMany({
    where: {
      id: hotelId,
    },
    include: { Rooms: true },
  });
}
export default { getRoomsByHotelId };
