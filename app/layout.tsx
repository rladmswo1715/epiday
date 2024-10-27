import AuthSession from '@/components/provider/SessionProvider';
import '@/styles/globals.css';

export const metadata = {
  title: 'epiday',
  description: '명언 공유사이트',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
