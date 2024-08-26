import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../src/utils/prismaClient';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Buscar o usuário na base de dados
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        // Simulação simples de verificação de senha
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role, // Certifique-se de que o role seja retornado
          };
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
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role, // Adiciona o role à sessão
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; // Adiciona o role ao token JWT
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET, // Adicionando o segredo
});
