import { PrismaClient, Console } from '@prisma/client';
import { createConsole } from '../factories';

const prisma = new PrismaClient();

describe('Console', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.console.deleteMany({});
  });

  describe('create', () => {
    it('should create a new console', async () => {
      const consoleInfo: Console = {
        name: 'Nintendo Switch',
        id: 0
      };

      const createdConsole = await prisma.console.create({ data: consoleInfo });

      expect(createdConsole).toMatchObject(consoleInfo);
    });

    it('should not allow creating a console with duplicate name', async () => {
      const consoleInfo1: Console = {
        name: 'PlayStation 5',
        id: 0
      };

      const consoleInfo2: Console = {
        name: 'PlayStation 5',
        id: 0
      };

      await prisma.console.create({ data: consoleInfo1 });

      await expect(prisma.console.create({ data: consoleInfo2 })).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return the console with the specified id', async () => {
      const consoleInfo: Console = {
        name: 'Xbox Series X',
        id: 0
      };

      const createdConsole = await createConsole();

      const foundConsole = await prisma.console.findFirst({ where: { id: createdConsole.id } });

      expect(foundConsole).toMatchObject(createdConsole);
    });

    it('should return null if no console with the specified id exists', async () => {
      const foundConsole = await prisma.console.findFirst({ where: { id: -1 } });

      expect(foundConsole).toBeNull();
    });
  });

});
