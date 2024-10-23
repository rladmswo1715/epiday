import { auth } from './auth';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();

  const loginSignupPaths = ['/login', '/signup'];
  const homePath = 'http://localhost:3000/epidays';

  if (session && loginSignupPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    // 무한루프 돌아서 주소 같으면 리다이렉트 x
    if (request.nextUrl.pathname === homePath) {
      return NextResponse.next();
    }
    return NextResponse.redirect(homePath);
  }

  if (!session) {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
    return NextResponse.redirect('http://localhost:3000/login');
  }
}

export const config = {
  matcher: ['/epidays/:path*', '/addepiday', '/feed', '/search', '/mypage', '/login', '/signup'],
};
