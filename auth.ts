import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';
import BASE_URL from '@/constant/url';
import { jwtDecode } from 'jwt-decode';
import { JWT } from '@auth/core/jwt';
import { getMyInfo } from './api/user';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
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
          let setCookie = res.headers.get('Set-Cookie');

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || '로그인 실패');
          }

          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        const decodedAccessToken: { exp: number } = jwtDecode(user.accessToken);
        token.accessTokenExpires = decodedAccessToken.exp * 1000;
      }

      if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id as string;
        session.email = token.email as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;

        const authResponse = await getMyInfo(session.accessToken);
        session.nickname = authResponse.nickname;
        session.image = authResponse.image;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error: () => {},
    warn: () => {},
    debug: () => {},
  },
});

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken,
    };
  } catch (error) {
    console.error('리프레시 토큰 Error ::', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
