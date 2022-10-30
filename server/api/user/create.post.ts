/**
 * @description POST route for Users. Creates a new User.
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, email, password } = body;

  const user = await prisma.user.create({
    data: {
      email,
      password,
      created_date: new Date(),
      modified_date: new Date(),
      name,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return user;
});
