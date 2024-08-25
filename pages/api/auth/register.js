import prisma from '../../../src/utils/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      // Verifica se o email já está em uso
      const existingUser = await prisma.users.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }

      // Cria um novo usuário
      const newUser = await prisma.users.create({
        data: {
          name,
          email,
          password, // Senha armazenada como texto simples
          // `role`, `created_at`, e `updated_at` são gerenciados automaticamente
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error); // Adiciona logs de erro detalhados
      res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
