/**
 * @description Get all Lists for a User ID
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const id: string = event.context.params.id;

  const lists = prisma.list.findMany({
    where: {
      userId: id,
    },
    include: {
      owner: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      categories: {
        include: {
          items: true,
        },
      },
    },
  });

  return lists;
});
