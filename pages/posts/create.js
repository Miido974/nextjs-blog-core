import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return res.status(200).json(post);
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}