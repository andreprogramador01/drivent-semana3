import { prisma } from '@/config';

async function getEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}
async function getTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}
async function getHotels() {
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
