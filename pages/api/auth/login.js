import prisma from '../../../src/utils/prismaClient';

// Crie uma instância do PrismaClient
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Verificar se o usuário existe na tabela `users`
      const user = await prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado.' });
      }

      // Verificar a senha
      if (user.password !== password) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }

      // Enviar uma resposta de sucesso
      res.status(200).json({ message: 'Login bem-sucedido!' });
    } catch (error) {
      console.error('Erro no servidor:', error);
      res.status(500).json({ message: 'Erro no servidor.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido.`);
  }
}
