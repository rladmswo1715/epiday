import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';
import BASE_URL from '@/constant/url';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${BASE_URL}/auth/signIn`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const user = await res.json();
          if (!res.ok) {
            throw new Error(user.message || '로그인 실패');
          }

          return user;
        } catch (e) {
          throw new Error(e.message || '인증 실패');
        }
      },
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      // clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error: () => {},
    warn: () => {},
    debug: () => {},
  },
});
