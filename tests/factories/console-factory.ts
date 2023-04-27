import faker from '@faker-js/faker';
import { PrismaClient, Console } from '@prisma/client';

const prisma = new PrismaClient();

export const createConsole = async (): Promise<Console> => {
  const console: Console = {
      name: faker.lorem.word(),
      id: 0
  };

  return prisma.console.create({ data: console });
};
