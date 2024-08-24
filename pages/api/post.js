import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, theme, content, image } = req.body;

    // Verificar se todos os campos necessários foram fornecidos
    if (!title || !theme || !content) {
      return res.status(400).json({ error: 'Título, tema e conteúdo são obrigatórios.' });
    }

    // Gerando o slug a partir do título
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      const post = await prisma.posts.create({
        data: {
          title,
          theme,
          content,
          image, // Usando o nome da coluna correta
          slug,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      res.status(201).json(post);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      res.status(500).json({ error: 'Erro ao criar post' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
