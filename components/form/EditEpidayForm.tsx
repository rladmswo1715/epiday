'use client';

import { useEffect, useState } from 'react';
import EpidayForm from './EpidayForm';
import { getEpidayData } from '@/api/getEpiday';
import { useSession } from 'next-auth/react';
import Spinner from '../Spinner';
import { AddEpidaySchema } from '@/schema/addEpidaySchema';

const EditEpidayForm = ({ epidayId }: { epidayId: number }) => {
  const [initialData, setInitialData] = useState<AddEpidaySchema | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.accessToken) return;
    handleGetData();
  }, [session?.accessToken, epidayId]);

  const handleGetData = async () => {
    try {
      const result = await getEpidayData(epidayId, session?.accessToken);

      if (result) {
        const tagNames = result.tags.map((tag: { id: number; name: string }) => tag.name);

        let author = result.author;
        if (result.author === '알 수 없음') {
          author = 'unknown';
        } else if (result.author.startsWith('본인:')) {
          author = 'self';
        }

        setInitialData({
          ...result,
          tags: tagNames,
          author: author,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return <EpidayForm epidayId={epidayId} initialData={initialData} isEdit />;
};

export default EditEpidayForm;
