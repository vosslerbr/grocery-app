/**
 * @description Get a List by Mongo ID
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const id: string = event.context.params.id;

  const category = prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      list: {
        select: {
          id: true,
          title: true,
          owner: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
      items: true,
    },
  });

  return category;
});
