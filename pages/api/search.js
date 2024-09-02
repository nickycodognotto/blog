// ./pages/api/search.js
import prisma from '../../src/utils/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { option, category } = req.query;

      console.log('Received query parameters:', { option, category }); // Adiciona log dos parâmetros recebidos

      let posts;
      if (!option || !category) {
        posts = await prisma.posts.findMany();
      } else if (option === 'tituloDoPost') {
        posts = await prisma.posts.findMany({
          where: {
            title: {
              contains: category,
            },
          },
        });
      } else if (option === 'categoriaDoPost') {
        posts = await prisma.posts.findMany({
          where: {
            theme: category,
          },
        });
      } else {
        return res.status(400).json({ error: 'Invalid option' });
      }

      console.log('Fetched posts:', posts); // Adiciona log dos posts encontrados

      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
