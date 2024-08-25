import prisma from '../../src/utils/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const latestPost = await prisma.posts.findFirst({
        orderBy: {
          created_at: 'desc', // Ordenar pelo campo de data mais recente
        },
      });

      if (latestPost) {
        res.status(200).json(latestPost);
      } else {
        res.status(404).json({ error: 'Nenhum post encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar o post mais recente:', error);
      res.status(500).json({ error: 'Erro ao buscar o post mais recente' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
