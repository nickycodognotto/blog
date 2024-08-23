import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../src/utils/conect'; // Ajuste o caminho conforme necessário

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        // Simulação simples de verificação de senha
        if (user && user.password === credentials.password) {
          return { id: user.id, email: user.email, name: user.name };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', // Ajuste a página de login conforme necessário
  },
  session: {
    strategy: 'jwt', // Use sessões baseadas em banco de dados
  },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
});
