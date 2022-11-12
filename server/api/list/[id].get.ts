/**
 * @description Get a List by Mongo ID
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const id: string = event.context.params.id;

  const list = prisma.list.findUnique({
    where: {
      id,
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

  return list;
});
