import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  fetchBookCategory,
  fetchBookListData,
  fetchBookStatuses,
} from '@/data/book/fetch';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryNames } from '@/data/constant';

interface LeftPanelProps {
  data: any;
}

export const LeftPanel: FC<LeftPanelProps> = ({ data }) => {
  return (
    <div className="auto-rows-max gap-4 md:gap-8 lg:col-span-2 flex flex-col items-center">
      <Card
        className="overflow-hidden w-full"
        x-chunk="A card with a form to upload product images"
      >
        <Image
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          height="300"
          src="/book.png"
          width="300"
        />
        {data && (
          <>
            <CardHeader>
              <CardTitle className="flex-1 items-center flex space-x-6 justify-between">
                <span>{data.list[0].bookName}</span>
                <Button variant="link" className="text-blue-600">
                  切换书本
                </Button>
              </CardTitle>
              <CardDescription>
                {
                  fetchBookStatuses().find(
                    (status) => status.value === data.list[0].bookStatus,
                  )?.label
                }
              </CardDescription>
              <CardDescription>
                {
                  fetchBookCategory().find(
                    (category) => category.value === data.list[0].bookCategory,
                  )?.label
                }
              </CardDescription>
              {data.list[0].value}
            </CardHeader>
            <CardContent></CardContent>
          </>
        )}
      </Card>
    </div>
  );
};
