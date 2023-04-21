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
  return await prisma.hotel.findMany({});
}

export default { getEnrollmentByUserId, getTicketByEnrollmentId, getHotels };
