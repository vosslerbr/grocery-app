/**
 * @description POST route for Item. Creates a new Item.
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, categoryId, quantity } = body;

  const item = await prisma.item.create({
    data: {
      name,
      categoryId,
      quantity,
      created_date: new Date(),
      modified_date: new Date(),
    },
  });

  return item;
});
