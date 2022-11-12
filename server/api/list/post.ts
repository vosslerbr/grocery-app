/**
 * @description POST route for Lists. Creates a new List.
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { title, userId } = body;

  const list = await prisma.list.create({
    data: {
      title,
      created_date: new Date(),
      modified_date: new Date(),
      userId,
    },
  });

  return list;
});
