import faker from '@faker-js/faker';
import { Game, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createGame = async (): Promise<Game> => {
  const game: Game = {
      title: faker.lorem.words(3),
      consoleId: 1,
      id: 0
  };

  return prisma.game.create({ data: game });
};
