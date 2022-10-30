/**
 * @description Get a user by Mongo ID
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const id: string = event.context.params.id;

  const user = prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return user;
});
