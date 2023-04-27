import { PrismaClient, Game, Console } from '@prisma/client';
import { createConsole, createGame } from '../factories';

const prisma = new PrismaClient();

describe('Game', () => {
  let consoleId: number;

  beforeAll(async () => {
    await prisma.$connect();

    const consoleInfo: Console = {
      name: 'Nintendo Switch',
      id: 0
    };

    const createdConsole = await createConsole();
    consoleId = createdConsole.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.game.deleteMany({});
  });

  describe('create', () => {
    it('should create a new game', async () => {
      const gameData: Game = {
        title: 'Super Mario Odyssey',
        consoleId,
        id: 0
      };

      const createdGame = await createGame();

      expect(createdGame.title).toBeDefined();
      expect(createdGame.consoleId).toBeDefined();
      expect(createdGame.id).toBeDefined();
    });

    it('should not allow creating a game with duplicate title', async () => {
      const gameData1: Game = {
        title: 'The Legend of Zelda: Breath of the Wild',
        consoleId,
        id: 0
      };

      const gameData2: Game = {
        title: 'The Legend of Zelda: Breath of the Wild',
        consoleId,
        id: 0
      };

      await createGame();

      await expect(createGame()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return the game with the specified id', async () => {
      const gameData: Game = {
        title: 'Animal Crossing: New Horizons',
        consoleId,
        id: 0
      };

      const createdGame = await createGame();

      const foundGame = await prisma.game.findFirst({ where: { id: createdGame.id } });

      expect(foundGame).toMatchObject(createdGame);
    });

    it('should return null if no game with the specified id exists', async () => {
      const foundGame = await prisma.game.findFirst({ where: { id: -1 } });

      expect(foundGame).toBeNull();
    });
  });

});
