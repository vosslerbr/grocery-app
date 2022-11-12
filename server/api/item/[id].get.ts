/**
 * @description Get an Item by Mongo ID
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const id: string = event.context.params.id;

  const item = prisma.item.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          title: true,
          list: true,
          items: true,
        },
      },
    },
  });

  return item;
});
