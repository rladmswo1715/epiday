import { auth } from './auth';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();

  const loginSignupPaths = ['/login', '/signup'];
  const homePath = process.env.NEXT_PUBLIC_HOME_PATH;
  const loginPath = process.env.NEXT_PUBLIC_LOGIN_PATH;

  if (session && loginSignupPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    // 무한루프 돌아서 주소 같으면 리다이렉트 x
    if (request.nextUrl.pathname === homePath) {
      return NextResponse.next();
    }
    return NextResponse.redirect(homePath);
  }

  if (!session) {
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginPath);
  }
}

export const config = {
  matcher: ['/epidays/:path*', '/addepiday', '/feed', '/search', '/mypage', '/login', '/signup'],
};
