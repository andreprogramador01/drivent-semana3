import { prisma } from '@/config';

async function getEnrollmentByUserId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}
async function getTicketByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}
async function getHotels() {
  console.log(prisma.hotel.findMany({}));
  return await prisma.hotel.findMany({});
}

async function getTicketType(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}

export default { getEnrollmentByUserId, getTicketByEnrollmentId, getHotels, getTicketType };
