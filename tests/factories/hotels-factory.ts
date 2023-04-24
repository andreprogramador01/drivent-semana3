import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.firstName(),
      image: faker.image.avatar(),
    },
  });
}
export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.firstName(),
      capacity: 123,
      hotelId,
    },
  });
}
