'use client';
import Spinner from '@/components/Spinner';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const KakaoLogin = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);

      if (!code) return;
      try {
        const response = await signIn('credentials', {
          redirect: false,
          code: code,
        });

        if (response?.error) {
          throw new Error(response.error);
        } else {
          router.replace('/epidays');
        }
      } catch (err) {
        console.error('카카오 로그인 처리 중 오류 발생:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return <>{loading && <Spinner />}</>;
};

export default KakaoLogin;
