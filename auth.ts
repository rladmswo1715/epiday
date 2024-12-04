import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import BASE_URL from '@/constant/url';
import { jwtDecode } from 'jwt-decode';
import { JWT } from '@auth/core/jwt';
import { getMyInfo } from './apis/user';

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
        code: {},
      },
      authorize: async (credentials) => {
        if (credentials?.code) {
          const res = await fetch(`${BASE_URL}/auth/signIn/KAKAO`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
              token: credentials.code,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || '카카오 로그인 실패');
          }

          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            provider: 'kakao',
          };
        }

        try {
          const res = await fetch(`${BASE_URL}/auth/signIn`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || '로그인 실패');
          }

          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            provider: 'credentials',
          };
        } catch (e) {
          throw new Error(e.message || '인증 실패');
        }
      },
    }),
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile, account) {
        try {
          const res = await fetch(`${BASE_URL}/auth/signIn/GOOGLE`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: account.id_token,
            }),
          });
          const data = await res.json();
          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            provider: 'google',
            customId: data.user.id,
          };
        } catch (error) {
          console.error('구글로그인 error:', error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.customId || user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.provider = user.provider;

        if (user.provider === 'credentials') {
          try {
            const decodedToken = jwtDecode(user.accessToken);
            token.accessTokenExpires = decodedToken.exp * 1000;
          } catch (error) {
            console.error('Access Token 디코딩 실패:', error);
            token.accessTokenExpires = Date.now() + 60 * 60 * 1000;
          }
        }
      }

      if (token.provider === 'credentials' && token.accessTokenExpires) {
        if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
          return token;
        }
        return refreshAccessToken(token);
      }

      return token;
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
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
    };
  } catch (error) {
    console.error('리프레시 토큰 Error ::', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
