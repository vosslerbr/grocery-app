/**
 * @description POST route for Category. Creates a new Category.
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { listId, title } = body;

  const category = await prisma.category.create({
    data: {
      title,
      created_date: new Date(),
      modified_date: new Date(),
      listId,
    },
  });

  return category;
});
