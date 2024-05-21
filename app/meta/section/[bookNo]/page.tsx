'use client';
import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LeftPanel } from '@/app/meta/section/[bookNo]/left-panel';
import { RightPanel } from '@/app/meta/section/[bookNo]/right-section';
import { queryNames } from '@/data/constant';
import { fetchBookListData, fetchSectionListData } from '@/data/book/fetch';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface SectionPageProps {
  params: { bookNo: string };
}

export default function SectionPage({ params }: SectionPageProps) {
  const path = usePathname();

  const { data, isLoading, error } = useQuery({
    queryKey: [queryNames.SectionInBookQuery],
    queryFn: () =>
      fetchSectionListData({
        bookNo: params.bookNo,
      }),
  });

  const { data: bookData } = useQuery({
    queryKey: [queryNames.BookQuery],
    queryFn: (context) =>
      fetchBookListData({
        pageNo: 1,
        pageSize: 1,
        bookNo: params.bookNo,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <Breadcrumbs path={path} />
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-5 xl:grid-cols-5 mt-6">
        {bookData && <LeftPanel data={bookData} />}
        <Card
          className="overflow-hidden w-full col-span-3"
          x-chunk="A card with a form to upload product images"
        >
          <CardHeader>
            <CardTitle className="flex-col flex">
              <div>章节信息</div>
              <Separator className="my-4" />
              <div className="relative md:gap-8 lg:col-span-6 flex flex-col items-center">
                <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索章节名称"
                  className="pl-8"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <div>loading...</div>}
            {data && bookData && <RightPanel data={data} bookData={bookData} />}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
