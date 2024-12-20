import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    nickname: string;
    email: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id: string;
    customId?: string;
    nickname: string;
    email: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
    provider: 'credentials' | 'kakao' | 'google';
  }

  interface JWT {
    id: string;
    nickname: string;
    email: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
