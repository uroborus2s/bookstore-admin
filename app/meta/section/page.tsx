'use client';

import { queryNames } from '@/data/constant';
import { useQuery } from '@tanstack/react-query';
import { fetchBookListData } from '@/data/book/fetch';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ALLSectionPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryNames.BookQuery],
    queryFn: (context) =>
      fetchBookListData({
        pageNo: 1,
        pageSize: 10,
      }),
  });

  const router = useRouter();

  useEffect(() => {
    // Ensure this code only runs on the client
    if (
      typeof window !== 'undefined' &&
      data &&
      Array.isArray(data.list) &&
      data.list.length >= 0
    ) {
      router.push(`/meta/section/${data.list[0].bookNo}`);
    }
  }, [router, data]);

  if (isLoading) return <div>请求中...</div>;
  if (error) return <div>数据错误</div>;

  if (data && Array.isArray(data.list) && data.list.length === 0) {
    return <div>数据为空</div>;
  }
  return <div>Redirecting...</div>;
}
