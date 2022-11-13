/**
 * @description Get all Categories for a List ID
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const id: string = event.context.params.id;

  const categories = prisma.category.findMany({
    where: {
      listId: id,
    },
    include: {
      items: true,
    },
  });

  return categories;
});
