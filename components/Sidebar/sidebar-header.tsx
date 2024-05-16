import { type FC, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const SidebarHeader: FC<PropsWithChildren<SidebarHeaderProps>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(`h-16 min-h-16 flex items-center px-5`, className)}
      {...rest}
    >
      <div className={`flex items-center`}>
        <div
          className={`size-9 min-h-9 min-w-9 flex items-center justify-center rounded-lg font-bold text-2xl bg-blue-200 text-white bg-gradient-to-br mr-2.5 ml-1`}
        >
          书
        </div>
        <Image width={132} height={48} src={'/xin.png'} alt="Logo"></Image>
      </div>
    </div>
  );
};
